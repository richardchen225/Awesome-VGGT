"""Inspect paper front matter for resource URLs absent from abstract pages."""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
from threading import Lock
import json
import re
import requests
import fitz

root = Path(__file__).resolve().parents[1]
cache = root / '.resource-audit'
papers = json.loads((root / 'data/papers.json').read_text(encoding='utf-8'))['papers']
approved = json.loads((cache / 'approved-links.json').read_text(encoding='utf-8'))
output = cache / 'pdf-links.json'
prior = json.loads(output.read_text(encoding='utf-8')) if output.exists() else []
done = {item['key'] for item in prior if not item.get('error')}
tasks = []
for paper in papers:
    state = dict(paper, **approved.get(paper['key'], {}))
    if state.get('code') and state.get('project') or paper['key'] in done:
        continue
    url = paper['paper']
    if 'arxiv.org/abs/' in url:
        url = url.replace('/abs/', '/pdf/')
    elif 'thecvf.com/content/' in url:
        url = url.replace('/html/', '/papers/').replace('.html', '.pdf')
    else:
        source = cache / (paper['key'] + '.html')
        html = source.read_text(encoding='utf-8') if source.exists() else ''
        match = re.search(r'name="citation_pdf_url" content="([^"]+)"', html)
        if not match:
            continue
        url = match.group(1)
    tasks.append((paper['key'], url))

pdf_lock = Lock()

def inspect(task):
    key, url = task
    try:
        with requests.get(url, timeout=(10, 25), stream=True) as response:
            response.raise_for_status()
            chunks = []
            size = 0
            for chunk in response.iter_content(262144):
                size += len(chunk)
                if size > 32 * 1024 * 1024:
                    raise ValueError('PDF exceeds 32 MB audit limit')
                chunks.append(chunk)
        content = b''.join(chunks)
        if not content.startswith(b'%PDF'):
            raise ValueError('Response is not a PDF')
        snippets = []
        links = set()
        # MuPDF is not thread-safe; only downloads run concurrently.
        with pdf_lock, fitz.open(stream=content, filetype='pdf') as doc:
            for page in (doc[i] for i in range(min(2, len(doc)))):
                page_text = page.get_text()
                for link in page.get_links():
                    uri = link.get('uri', '')
                    if uri.startswith(('https://', 'http://')):
                        links.add(uri)
                for match in re.finditer(r'https?://[^\s<>]+', page_text):
                    links.add(match.group(0).rstrip('.,;'))
                    snippets.append(page_text[max(0, match.start()-100):match.end()+100])
        return {'key': key, 'source': url, 'links': sorted(links), 'context': snippets}
    except Exception as error:
        return {'key': key, 'source': url, 'error': str(error)}

print(f'Inspecting front pages of {len(tasks)} PDFs.', flush=True)
results = {item['key']: item for item in prior}
with ThreadPoolExecutor(max_workers=4) as executor:
    jobs = [executor.submit(inspect, task) for task in tasks]
    for i, future in enumerate(as_completed(jobs), 1):
        item = future.result()
        results[item['key']] = item
        if i % 10 == 0:
            print(f'PDFs checked: {i}/{len(tasks)}', flush=True)
            output.write_text(json.dumps(list(results.values()), indent=2), encoding='utf-8')
output.write_text(json.dumps(list(results.values()), indent=2), encoding='utf-8')
print(f'PDF audit complete: {len(results)} records, {sum(bool(r.get("error")) for r in results.values())} unavailable.', flush=True)
