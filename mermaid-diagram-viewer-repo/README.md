# Mermaid Diagram Viewer

This repo displays four Mermaid `.mmd` architecture diagrams in a browser.

## Included diagrams

1. `01_old_mcclintock_architecture.mmd`
2. `02_improved_ml_mcclintock_architecture.mmd`
3. `03_old_2008_biological_text_mining_architecture.mmd`
4. `04_modern_2008_biomedical_text_mining_graphrag_architecture.mmd`

## Run locally

Because browsers often block loading local files directly, run a small local server:

```bash
python -m http.server 3000
```

Then open:

```text
http://localhost:3000
```

## Deploy on Vercel

1. Upload/push this folder to GitHub.
2. Go to Vercel and import the GitHub repo.
3. Framework preset: **Other**.
4. Build command: leave empty.
5. Output directory: leave empty or use `.`.
6. Deploy.

## Deploy on GitHub Pages

1. Push this folder to a GitHub repo.
2. Go to **Settings → Pages**.
3. Source: **Deploy from a branch**.
4. Branch: `main`, folder: `/root`.
5. Save and open the GitHub Pages URL.

## Notes

The viewer uses Mermaid from a CDN in `index.html`. The original `.mmd` files are kept in the `diagrams/` folder, and `assets/diagrams.js` embeds the same diagram text as a fallback.
