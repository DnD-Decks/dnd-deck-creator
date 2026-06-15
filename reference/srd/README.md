# SRD 5.2.1 — Audit Ground-Truth

## Files

| File | Purpose |
|------|---------|
| `SRD_CC_v5.2.1.pdf` | **Authoritative source.** Verbatim official PDF from Wizards of the Coast (CC-BY-4.0). Never edited. |
| `SRD_5.2.1.md` | Grep/diff index. Machine-extracted from the PDF via `pymupdf4llm`. On any discrepancy the **PDF wins**. |
| `LICENSE` | CC-BY-4.0 attribution statement required by the license. |

## Scope — SRD only, not the PHB

This directory contains **SRD content only**. The SRD 5.2.1 covers a subset of spells, classes,
and items from the 2024 Player's Handbook. Full PHB content is not CC-licensed and is not committed
here.

Any data in `src/data/` that goes beyond the SRD is author-original and fine to include. Only
SRD-derived data needs this reference for audit purposes.

## Why it's here

Before building the master asset inventory (`src/assets/asset-manifest.json`), we need a canonical
reference to audit `src/data/spells/*.json` against — verifying spell names, schools, and levels
are faithful to the SRD. See issue #12 and the asset-pipeline epic #19.

## Re-extracting the markdown

If the PDF is updated, re-run:

```sh
python3 -m pip install --user pymupdf4llm
python3 -c "
import pymupdf4llm, pathlib
text = pymupdf4llm.to_markdown('reference/srd/SRD_CC_v5.2.1.pdf')
pathlib.Path('reference/srd/SRD_5.2.1.md').write_text(text, encoding='utf-8')
"
```
