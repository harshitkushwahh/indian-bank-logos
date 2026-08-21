# Indian Bank Logos

Free CDN and API for **96 RBI scheduled commercial bank** logos in India, plus an [npm package](./packages/indian-bank-logos) for search and category filters.

**Author:** [@harshitkushwahh](https://github.com/harshitkushwahh)

Deploy on [Vercel](https://vercel.com) · Use in any frontend · No auth required

## Logo URLs

| Variant | URL pattern | Use case |
|---|---|---|
| **Standard** | `/logos/{slug}.png` | Favicon, list icons, avatars |
| **Horizontal** | `/logos/{slug}-horizontal.png` | Headers, banners, wide layouts |

Example:

```
https://your-app.vercel.app/logos/hdfc-bank.png
https://your-app.vercel.app/logos/hdfc-bank-horizontal.png
```

## API

### List / search / filter

```
GET /api/banks
GET /api/banks?q=hdfc
GET /api/banks?category=private
GET /api/banks?q=bank&category=private&limit=10&offset=0
```

Response:

```json
{
  "version": "1.0.0",
  "count": 1,
  "total": 1,
  "offset": 0,
  "limit": 100,
  "banks": [
    {
      "slug": "hdfc-bank",
      "name": "HDFC Bank Limited",
      "category": "private",
      "logo": "https://your-app.vercel.app/logos/hdfc-bank.png",
      "logoHorizontal": "https://your-app.vercel.app/logos/hdfc-bank-horizontal.png"
    }
  ]
}
```

### Single bank

```
GET /api/banks/hdfc-bank
```

### Categories

| Value | Banks |
|---|---|
| `nationalised` | 12 |
| `private` | 21 |
| `sfb` | 11 |
| `payments` | 6 |
| `lab` | 2 |
| `foreign` | 44 |

## npm package

```bash
npm install indian-bank-logos
```

```typescript
import { searchBanks, getLogoUrl, getBanksByCategory } from "indian-bank-logos";

searchBanks("axis");
getBanksByCategory("nationalised");
getLogoUrl("state-bank-of-india");
```

See [packages/indian-bank-logos/README.md](./packages/indian-bank-logos/README.md).

## Deploy to Vercel

1. Push this repo to GitHub
2. [vercel.com/new](https://vercel.com/new) → Import repository
3. Framework preset: **Other**
4. Deploy

Optional env var:

```
BANK_LOGOS_BASE_URL=https://your-app.vercel.app
```

Set the same URL in your frontend via `setBaseUrl()` from the npm package.

## Publish to npm

```bash
cd packages/indian-bank-logos
npm login
npm publish --access public
```

## Project structure

```
indian-bank-logos/
├── public/logos/          # PNG files (CDN)
├── data/banks.json        # Manifest
├── api/                   # Vercel serverless routes
├── packages/indian-bank-logos/  # npm client
└── scripts/               # generate-manifest.js
```

## Adding logos

1. Add `{slug}.png` and `{slug}-horizontal.png` to `public/logos/`
2. Add metadata to `scripts/bank-meta.json`
3. Run `npm run generate`

## Slug reference

Slugs are kebab-case stable IDs, e.g. `hdfc-bank`, `state-bank-of-india`, `airtel-payments-bank`.

Full list: `data/banks.json` or `GET /api/banks`.

## Roadmap

- [ ] SVG logos (`/logos/{slug}.svg`)
- [ ] Regional Rural Banks (RRBs)
- [ ] State Co-operative banks

## Disclaimer

Bank logos are trademarks of their respective owners. Provided for identification and UI purposes only. Not affiliated with the Reserve Bank of India or any bank.

## License

MIT (code). Logo assets remain property of respective banks.
