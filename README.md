# Indian Routes & Trails

**Exclusive India Tours by Om** — a premium travel website built with Next.js 16, Tailwind v4 and the Haveli Indigo design system.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router, JSX only — no TypeScript)
- **Styling**: Tailwind CSS v4 (`@theme` tokens), CSS custom properties
- **Fonts**: Cormorant Garamond (display) + Inter (body) via `next/font/google`
- **Icons**: Lucide React
- **Deployment**: Vercel

---

## Local Development

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Production Build

```bash
npm run build
npm start
```

---

## Vercel Deployment

### 1. Import repo on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import `itsolutioncodecarft-2026/Indian-Trail`
3. Framework will be auto-detected as **Next.js**
4. Root directory: leave as `/` (project root)

### 2. Environment Variables

Add the following in **Vercel → Project → Settings → Environment Variables**.  
These are required for the Google Calendar availability feature.  
See `.env.example` for setup instructions.

| Variable | Description |
|---|---|
| `GOOGLE_CALENDAR_ID` | Admin Google Calendar ID (e.g. `abc@group.calendar.google.com`) |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Service account email from Google Cloud Console |
| `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` | Full private key from JSON key file (include `-----BEGIN...-----END-----`) |
| `CALENDAR_LOOKAHEAD_DAYS` | Days ahead to load (default: `90`) |

> **Note:** Without these variables the calendar availability drawer will show an error state — the rest of the site works fully without them.

### 3. Deploy

Click **Deploy**. Vercel will run `npm run build` and deploy.

---

## Project Structure

```
app/                    Next.js App Router pages + API routes
  api/calendar/         Google Calendar availability endpoint
components/             Shared UI components
  FloatingActionGroup   Floating WhatsApp + Calendar FAB
  AvailabilityDrawer    Availability calendar drawer
  Navbar                Header/navigation
  EnquiryForm           Contact/enquiry form
data/                   Static data (tours, destinations, festivals)
hooks/                  Shared React hooks (useCarousel)
lib/                    Utilities (destImage resolver, language context)
public/                 Static assets
  destination/          Destination images
  experiances/          Experience images (folder name as on disk)
  festivals/            Festival images
  journies/             Journey images (folder name as on disk)
sections/               Page section components
```

---

## Environment Variables Reference

Copy `.env.example` to `.env.local` (git-ignored) and fill in real values for local development.

```bash
cp .env.example .env.local
```

---

## Notes

- **No TypeScript** — all files are `.js` / `.jsx`
- **No animal rides** — responsible tourism messaging is preserved throughout
- **Bilingual** — EN/ES toggle via `lib/LanguageContext`
- All festival dates beyond what was verifiable are marked TODO in `data/festivals.js`
