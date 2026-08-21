# indian-bank-logos

Indian RBI **scheduled commercial bank** logos (96 banks) as a free CDN + JSON API, with an npm client for search and category filters.

**Author:** [@harshitkushwahh](https://github.com/harshitkushwahh)

## Install (npm)

```bash
npm install indian-bank-logos
```

## Quick start

```typescript
import {
  getBank,
  searchBanks,
  getBanksByCategory,
  getLogoUrl,
  getLogoHorizontalUrl,
} from "indian-bank-logos";

// By slug
const hdfc = getBank("hdfc-bank");
// { slug, name, category, logo, logoHorizontal }

// Search
searchBanks("punjab");
// Punjab National Bank, Punjab & Sind Bank, ...

// By category
getBanksByCategory("private");

// Direct URLs (no fetch)
getLogoUrl("axis-bank");
// https://indian-bank-logos.vercel.app/logos/axis-bank.png
```

## Live API

Base URL: **https://indian-bank-logos.vercel.app**

| Endpoint | Description |
|---|---|
| `GET /api/banks` | List all banks |
| `GET /api/banks?q=hdfc` | Search |
| `GET /api/banks?category=private` | Filter by category |
| `GET /api/banks/axis-bank` | Single bank |
| `GET /logos/axis-bank.png` | Standard logo |
| `GET /logos/axis-bank-horizontal.png` | Horizontal logo |

Docs & live explorer: [indian-bank-logos.vercel.app](https://indian-bank-logos.vercel.app)

### Categories

`nationalised` · `private` · `sfb` · `payments` · `lab` · `foreign`

## Custom base URL

Default is `https://indian-bank-logos.vercel.app`. Override if needed:

```typescript
import { setBaseUrl, getLogoUrl } from "indian-bank-logos";

setBaseUrl("https://indian-bank-logos.vercel.app");
getLogoUrl("state-bank-of-india");
```

## Offline vs live

- **Offline** (bundled JSON): `getBank`, `searchBanks`, `getBanksByCategory`, `getAllBanks`
- **Live API**: `fetchBanks`, `fetchBank`

## License

MIT (code). Bank logos are trademarks of their respective owners — identification/UI use only; no affiliation with RBI or any bank.
