# Maintaining the project page

## Layout

- `docs/index.html`: authors, copy, links, figures, and citation.
- `docs/styles.css`: responsive design; the method figure becomes full-width below 1100 px.
- `docs/app.js`: task selection, playback, result tables, accessible tabs, figure enlargement, and citation copy.
- `docs/assets/`: paper, figures, posters, and six demonstration videos.
- `scripts/prepare_assets.py`: rebuild web derivatives from the manuscript project supplied with `--paper-root`.

## Publish

Push changes to `main`. GitHub Pages is configured to serve `/docs`; `.nojekyll` keeps the page buildless. All local asset references are relative and support the `/X-World/` project subpath.

Update the paper in `docs/assets/papers/X-World.pdf` after a manuscript revision. An arXiv link should be added only after its actual identifier is assigned. The GitHub repository currently contains the project website and paper.

## Verification and provenance

Check JavaScript syntax with `node --check docs/app.js`. Preview at desktop, mobile, and split-pane widths. Confirm video selection and pause, the three result tabs, figure enlargement, and BibTeX copy.

The complete benchmark tables contain 80 LIBERO, 88 LIBERO-Plus, and 35 ablation numeric cells. Keep their values and row order synchronized with the manuscript. Preserve original experimental chart designs.

Video files retain the source picture stream and timing. Web figures are derivatives of the original paper assets. The paper PDF uses lossless resource deduplication for a smaller download; its pages and links are preserved. No TIDE research content or recordings are reused.
