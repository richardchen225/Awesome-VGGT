# Contributing

Thank you for helping keep the VGGT literature index accurate and auditable.

## Inclusion Criteria

A paper is in scope when it does at least one of the following:

1. Modifies VGGT or a directly VGGT-derived reconstruction architecture.
2. Uses VGGT structured geometric outputs or multi-view geometry latent features in a downstream application.
3. Transfers VGGT geometric information through an explicit adaptation or distillation procedure.
4. Provides a benchmark or analysis specifically designed to evaluate VGGT-based methods.

Adjacent spatial models that do not use or modify VGGT are not included solely because they address a similar task.

## Proposing a Paper

Open a pull request or issue containing:

- Paper title and stable paper URL.
- Authors, year, and verified publication venue, if available.
- Proposed branch and category.
- One sentence identifying the exact VGGT component used or changed.
- Code and project-page links, when officially released.

Do not infer an accepted venue from an unverified profile or third-party list. Use the publisher, conference proceedings, OpenReview, or the authors' official project page.

## Updating Generated Files

The catalog is generated from the survey source:

```powershell
npm run sync
npm run check
```

The current source of truth is the sibling `survey_acmcsur.tex`, its Tables 1–6, and `survey_refs.bib`. The method catalog follows Tables 1 and 2, including the subgroup order. The dataset explorer follows Table 4, and its group percentages are checked against Table 3. Evaluation panels follow Tables 5 and 6. The author list and abstract are read from the manuscript.

Do not manually edit generated catalog, dataset, evaluation, or survey metadata files. Update the corresponding manuscript source, then run the sync command. The repository README is also generated. Verified official Paper, Code, and Project Page corrections can be recorded by BibTeX key in `data/resources.json`; the sync command preserves these links without running network discovery.

Personal homepage links and their verification sources are maintained in `data/people.json`. The generator reads names, order, institutions, and the correspondence role from the manuscript, then renders the centered two-line name block. The third and fourth names remain unlinked. The repository landing page contains the literature navigation, the two method branches, and the citation; dataset details and maintenance instructions stay in their separate files. Branch banners in `assets/` are generated together with the README.

`npm run collect:resources` is an optional network discovery step. Review its changes before rebuilding. Compile `survey_acmcsur.tex` before syncing if the manuscript PDF has changed. The asset exporter requires Python with PyMuPDF.
