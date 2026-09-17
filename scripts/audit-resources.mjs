// Discovery only: writes candidates and source evidence, never the approved link registry.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, ".resource-audit");
fs.mkdirSync(dir, { recursive: true });
const catalog = JSON.parse(fs.readFileSync(path.join(root, "data/papers.json"), "utf8"));
const papers = [...new Map(catalog.papers.map((p) => [p.key, p])).values()];
const decode = (s) => s.replace(/&amp;/g,"&").replace(/&#39;/g,"'").replace(/&quot;/g,'"');
const text = (s) => decode(s.replace(/<[^>]*>/g," ")).replace(/\s+/g," ").trim();
const excluded = /github\.com\/(?:nerfies|eliahuhorwitz\/Academic-project-page-template)|creativecommons|arxiv\.org|thecvf\.com|doi\.org|w3\.org|schema\.org|fonts\.google|twitter\.com|youtube\.com|purl\.org|doi\.org|dblp\.org|openreview\.net|semanticscholar\.org/i;
function links(html,base,trusted=false) {
 const found = new Map();
 for (const match of html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
  let url; try { url=new URL(decode(match[1]),base).href; } catch {continue;}
  if (!/^https?:/.test(url) || excluded.test(url)) continue;
  const label=text(match[2]);
  const host=new URL(url).hostname;
  if (trusted || /github\.com|gitlab\.com|github\.io|gitlab\.io/.test(host) || /code|project|website|available|implementation/i.test(label)) {
   found.set(url,{url,label,context:text(html.slice(Math.max(0,match.index-160),match.index+match[0].length+160))});
  }
 }
 if(trusted) for(const match of text(html).matchAll(/https?:\/\/[^\s<>"']+/g)) {
  const url=match[0].replace(/[.,;)}]+$/g,'');
  if(!excluded.test(url)&&!found.has(url)) found.set(url,{url,label:'Plain-text URL',context:text(html).slice(Math.max(0,match.index-100),match.index+url.length+100)});
 }
 return [...found.values()];
}
async function get(url) {
 const r=await fetch(url,{headers:{'User-Agent':'VGGT-survey-resource-audit'},signal:AbortSignal.timeout(18000)});
 const html=await r.text();
 if(!r.ok) throw Error(`${r.status} ${url}`);
 return {url:r.url,html};
}
async function pool(items,fn,concurrency=4) {
 let i=0; const output=[];
 await Promise.all(Array.from({length:concurrency},async()=>{while(i<items.length){const index=i++;try{output[index]=await fn(items[index]);}catch(e){output[index]={key:items[index].key,error:e.message};}if((index+1)%10===0)console.log(`Processed ${index+1}/${items.length}`);}}));
 return output;
}
const mode=process.argv[2] || 'papers';
if(mode==='papers') {
 const candidates=await pool(papers.filter(p=>!p.code||!p.project),async(p)=>{
  const cached=path.join(dir,p.key+'.html');
  const page=fs.existsSync(cached)?{url:p.paper,html:fs.readFileSync(cached,'utf8')}:await get(p.paper);
  fs.writeFileSync(path.join(dir,p.key+'.html'),page.html);
  const title=page.html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]||'';
  const block=page.html.match(/<blockquote[^>]*class=["'][^"']*abstract[^"']*["'][^>]*>([\s\S]*?)<\/blockquote>/i)?.[1]||page.html.match(/<div[^>]*id=["']abstract["'][^>]*>([\s\S]*?)<\/div>/i)?.[1]||'';
  const comments=page.html.match(/<td[^>]*class=["']tablecell comments[^"']*["'][^>]*>([\s\S]*?)<\/td>/i)?.[1]||'';
  return {key:p.key,title:p.title,source:page.url,pageTitle:text(title),abstract:text(block),links:links(block+' '+comments,page.url,true),pageLinks:links(page.html,page.url)};
 });
 fs.writeFileSync(path.join(dir,'papers.json'),JSON.stringify(candidates,null,2));
 console.log(`Paper audit: ${candidates.length} records, ${candidates.filter(x=>x.error).length} errors; ${candidates.reduce((s,p)=>s+(p.links?.length||0),0)} abstract/comment links.`);
}
if(mode==='projects') {
 const discoveries=JSON.parse(fs.readFileSync(path.join(dir,'papers.json'),'utf8'));
 const queue=papers.flatMap(p=>{
  const found=discoveries.find(x=>x.key===p.key);
  return [...new Set([p.project,...(found?.links||[]).map(l=>l.url)].filter(u=>u&&!/github\.com|gitlab\.com|\.pdf(?:$|\?)/.test(u)))].map(url=>({key:p.key,url}));
 });
 const result=await pool(queue,async(item)=>{const page=await get(item.url);fs.writeFileSync(path.join(dir,item.key+'-project.html'),page.html);return{...item,title:text(page.html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]||''),links:links(page.html,page.url)};});
 fs.writeFileSync(path.join(dir,'projects.json'),JSON.stringify(result,null,2));
 console.log(`Project audit: ${result.length} pages, ${result.filter(x=>x.error).length} errors.`);
}
if(mode==='github') {
 const oldPath=path.join(dir,'github.json');
 const old=fs.existsSync(oldPath)?JSON.parse(fs.readFileSync(oldPath)):[];
 const found=JSON.parse(fs.readFileSync(path.join(dir,'repos.json'))).filter(p=>!p.error).map(p=>p.key);
 const queue=papers.filter(p=>!p.code&&!found.includes(p.key)&&!old.some(x=>x.key===p.key&&!x.error));
 console.log(`Searching ${queue.length} remaining methods, with spacing between GitHub requests.`);
 const result=await pool(queue,async(p)=>{
  await new Promise(resolve=>setTimeout(resolve,6500));
  const prefix=p.title.split(':')[0];
  let query=(prefix.length<42?prefix:p.title).replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g,c=>'⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(c));
  if(/^(HTTM|HeSS|VGD|Co-Me|GLaD|EAGLE|OCRA|CALM)$/i.test(query)) query+=' VGGT';
  const url='https://api.github.com/search/repositories?q='+encodeURIComponent(query)+'&per_page=4';
  const page=await get(url);const response=JSON.parse(page.html);
  const repos=response.items.map(r=>({url:r.html_url,description:r.description,homepage:r.homepage,branch:r.default_branch,owner:r.owner.login}));
  const entry={key:p.key,title:p.title,query,repos};
  const prior=old.findIndex(x=>x.key===p.key);if(prior>=0)old[prior]=entry;else old.push(entry);
  fs.writeFileSync(oldPath,JSON.stringify(old,null,2));
  console.log(`${p.key}: ${repos.length} candidate repositories`);
  return entry;
 },1);
 for(const entry of result.filter(x=>x.error)){const index=old.findIndex(x=>x.key===entry.key);if(index<0)old.push(entry);else old[index]=entry;}
 fs.writeFileSync(oldPath,JSON.stringify(old,null,2));
 console.log(`GitHub search: ${result.length} queries, ${result.filter(x=>x.error).length} errors.`);
}
if(mode==='collections') {
 const repos=['Sprinter1999/Awesome-Efficient-VGGT','ZunhaiSu/Awesome-VGGT'];
 for(const repo of repos){const page=await get(`https://cdn.jsdelivr.net/gh/${repo}@main/README.md`);fs.writeFileSync(path.join(dir,repo.replace('/','_')+'.md'),page.html);console.log(repo,page.html.length);}
}
if(mode==='repos') {
 const queue=new Map();
 const add=(key,url)=>{const match=url?.match(/^https:\/\/github\.com\/([^/]+\/[^/#?]+)/);if(match){const repo=match[1];if(!queue.has(repo))queue.set(repo,{key,repo});}};
 for(const p of papers) add(p.key,p.code);
 for(const p of JSON.parse(fs.readFileSync(path.join(dir,'papers.json')))) for(const l of p.links||[]) add(p.key,l.url);
 for(const p of JSON.parse(fs.readFileSync(path.join(dir,'projects.json')))) for(const l of p.links||[]) if(/^code|^github|^💻/i.test(l.label)) add(p.key,l.url);
 if(fs.existsSync(path.join(dir,'extra-repos.json'))) for(const p of JSON.parse(fs.readFileSync(path.join(dir,'extra-repos.json')))) add(p.key,p.url);
 const result=await pool([...queue.values()],async(item)=>{
  const cache=path.join(dir,item.repo.replace('/','_')+'.md');
  let markdown;
  if(fs.existsSync(cache)) markdown=fs.readFileSync(cache,'utf8');
  else {try{markdown=(await get(`https://raw.githubusercontent.com/${item.repo}/HEAD/README.md`)).html;}catch{markdown=(await get(`https://cdn.jsdelivr.net/gh/${item.repo}/README.md`)).html;}fs.writeFileSync(cache,markdown);}
  const urls=[...new Set([...markdown.matchAll(/https?:\/\/[^\s<>"'\])]+/g)].map(m=>decode(m[0]).replace(/[.,;]+$/,'')))];
  return {...item,heading:markdown.split('\n').filter(l=>/^#|<h1|<h2/.test(l)).slice(0,12),links:urls.filter(u=>!excluded.test(u)),paperLinks:urls.filter(u=>/arxiv\.org|thecvf\.com/.test(u)),releaseLines:markdown.split('\n').filter(l=>/coming soon|will be|released|release|pip install|python .*\.py|official/i.test(l)).slice(0,12)};
 });
 fs.writeFileSync(path.join(dir,'repos.json'),JSON.stringify(result,null,2));
 console.log(`Repository audit: ${result.length} readmes; ${result.filter(x=>x.error).length} errors.`);
}
