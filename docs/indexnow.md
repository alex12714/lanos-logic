# IndexNow

[IndexNow](https://www.indexnow.org/) lets us tell participating search engines
(Bing, Yandex, Seznam, Naver, and others — Google does **not** participate) that
URLs changed, so they re-crawl promptly instead of waiting for a scheduled crawl.

## How it's set up

- **Key**: `13da2a6232872600a75c8cbb17fe8fbb` (stable, hardcoded).
- **Key file**: `frontend/public/13da2a6232872600a75c8cbb17fe8fbb.txt` — its
  contents are exactly the key. CRA copies `public/` into `build/`, and nginx
  serves it at `https://lanos-logic.com/13da2a6232872600a75c8cbb17fe8fbb.txt`.
  IndexNow fetches this file to verify we own the host before accepting a submit.
- **Ping script**: `frontend/scripts/indexnow-ping.mjs` — standalone Node
  (>=18, no dependencies). Reads `https://lanos-logic.com/sitemap.xml`, extracts
  the `<loc>` URLs, and submits them in one batch POST to
  `https://api.indexnow.org/indexnow`.

## Usage

Run **manually after a deploy** (it is intentionally NOT wired into CI/deploy):

```bash
# Preview the payload without submitting:
node frontend/scripts/indexnow-ping.mjs --dry-run

# Submit the current sitemap URLs to IndexNow:
node frontend/scripts/indexnow-ping.mjs
```

Environment overrides (optional):

| Var             | Default                            | Purpose                  |
| --------------- | ---------------------------------- | ------------------------ |
| `SITEMAP_URL`   | `https://lanos-logic.com/sitemap.xml` | Source of URLs        |
| `INDEXNOW_HOST` | `lanos-logic.com`                  | Host + key-file origin   |

## Response codes

- `200` accepted · `202` accepted, key validation pending.
- `400` invalid format · `403` key file not found/mismatch · `422` URL/host or
  key mismatch · `429` too many requests.

## Notes

- The key is **public by design** (search engines fetch it over HTTP); it only
  proves host ownership, it grants no privileged access. Rotating it just means
  generating a new hex key, renaming the `.txt` file, and updating the `KEY`
  constant in the script.
- Submit only when content actually changed; avoid spamming on every deploy with
  no content delta.
- This is additive: it does not change rendering, build output, or runtime
  behavior of the site.
