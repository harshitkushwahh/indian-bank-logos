# Indian Bank Logos

Free CDN and API for **96 RBI scheduled commercial bank** logos in India, plus an [npm package](./packages/indian-bank-logos) for search and category filters.

**Live site:** [https://indian-bank-logos.vercel.app](https://indian-bank-logos.vercel.app)  
**Author:** [@harshitkushwahh](https://github.com/harshitkushwahh)

## Logo URLs

| Variant | URL pattern | Use case |
|---|---|---|
| **Standard** | `/logos/{slug}.png` | Favicon, list icons, avatars |
| **Horizontal** | `/logos/{slug}-horizontal.png` | Headers, banners, wide layouts |

```
https://indian-bank-logos.vercel.app/logos/hdfc-bank.png
https://indian-bank-logos.vercel.app/logos/hdfc-bank-horizontal.png
```

## API

Base URL: `https://indian-bank-logos.vercel.app`

### List / search / filter

```
GET https://indian-bank-logos.vercel.app/api/banks
GET https://indian-bank-logos.vercel.app/api/banks?q=hdfc
GET https://indian-bank-logos.vercel.app/api/banks?category=private
GET https://indian-bank-logos.vercel.app/api/banks?q=bank&category=private&limit=10&offset=0
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
      "logo": "https://indian-bank-logos.vercel.app/logos/hdfc-bank.png",
      "logoHorizontal": "https://indian-bank-logos.vercel.app/logos/hdfc-bank-horizontal.png"
    }
  ]
}
```

### Single bank

```
GET https://indian-bank-logos.vercel.app/api/banks/hdfc-bank
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
// => https://indian-bank-logos.vercel.app/logos/state-bank-of-india.png
```

See [packages/indian-bank-logos/README.md](./packages/indian-bank-logos/README.md).

## Deploy to Vercel

Already deployed at [indian-bank-logos.vercel.app](https://indian-bank-logos.vercel.app).

To redeploy after changes: push to GitHub — Vercel auto-deploys.

Optional env var (defaults to production URL):

```
BANK_LOGOS_BASE_URL=https://indian-bank-logos.vercel.app
```

## Publish to npm

```bash
cd packages/indian-bank-logos
npm login
npm publish --access public
```

## Project structure

```
indian-bank-logos/
├── public/
│   ├── index.html         # Docs & API explorer
│   └── logos/             # PNG files (CDN)
├── data/banks.json
├── api/                   # Vercel serverless routes
├── packages/indian-bank-logos/
└── scripts/
```

## Adding logos

1. Add `{slug}.png` and `{slug}-horizontal.png` to `public/logos/`
2. Add metadata to `scripts/bank-meta.json`
3. Run `npm run generate`

## Slug reference

Slugs are kebab-case stable IDs, e.g. `hdfc-bank`, `state-bank-of-india`, `airtel-payments-bank`.

Full list: [GET /api/banks](https://indian-bank-logos.vercel.app/api/banks) or `data/banks.json`.

## Roadmap

- [ ] SVG logos (`/logos/{slug}.svg`)
- [ ] Regional Rural Banks (RRBs)
- [ ] State Co-operative banks

## Disclaimer

Bank logos are trademarks of their respective owners. Provided for identification and UI purposes only. Not affiliated with the Reserve Bank of India or any bank.

## License

MIT (code). Logo assets remain property of respective banks.
