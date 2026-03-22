# Project: agency99 web (Vercel + GitHub)

## Credentials
Stored in: `memory/credentials.env` (never put tokens in this file directly)
- GitHub user: `priidikkasak`
- Vercel user: `priidikkasak-2234`

## Project Stack
- Next.js 16 App Router, TypeScript strict, CSS Modules (no Tailwind, no UI libs)
- Fonts: Cabinet Grotesk (local woff2), DM Sans (Google), Geist Mono (local woff2)
- i18n: React Context in `lib/i18n/context.tsx`, translations in `lib/i18n/et.ts` + `en.ts`
- Design tokens: CSS variables in `app/globals.css`, typed in `lib/tokens.ts`
- Accent: #9B8BFF (violet)

## Key Files
- `app/layout.tsx` — fonts, I18nProvider, metadata
- `app/globals.css` — :root tokens, reset, grain, animations
- `lib/i18n/et.ts` — Translations interface + ET copy
- `components/` — Nav, Hero, ValuePillars, Services, Pricing, Process, TechStack, FinalCTA, Footer
- `hooks/useScrollReveal.ts` — IntersectionObserver reveal
- `public/fonts/` — CabinetGrotesk-Bold.woff2, CabinetGrotesk-ExtraBold.woff2, GeistMono-Regular.woff2

## Dev Commands
- `npm run dev` — localhost:3000
- `npm run build` — production build

## Deploy
- Vercel token in credentials.env
- GitHub repo: priidikkasak (not yet pushed)
