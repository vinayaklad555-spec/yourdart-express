# Your Dart Express

Corporate website for Your Dart Express — a logistics company providing shipping,
fulfillment, warehousing, reverse logistics, freight forwarding and shop-and-ship.

**Next.js 16 · React 19 · TypeScript (strict) · Tailwind CSS v4 · Motion · Lucide**

---

## Quick start

```bash
npm ci
cp .env.example .env.local     # set NEXT_PUBLIC_SITE_URL and SMTP_* values
npm run dev                    # http://localhost:3000
```

| Command | Does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build — 43 static pages |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Type check |

Deployment: **[`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)** — Hostinger setup, GoDaddy DNS,
SSL, SMTP, Search Console and the production checklist.

Legal: **[`docs/LEGAL-REVIEW.md`](docs/LEGAL-REVIEW.md)** — must be actioned before launch.

---

## The rule this codebase is built around

**Nothing on this site claims something the business has not confirmed.**

There are no invented statistics, customer counts, delivery rates, coverage maps,
testimonials, partner logos, case studies, certifications, awards or pricing anywhere in the
content layer. Where a capability is not live, the site says so in plain language rather than
implying it exists.

Concretely:

- `/case-studies` renders a designed empty state explaining why there are none yet.
- `/partners` describes the partnerships being sought instead of showing a logo wall.
- `/integrations` lists the eight channels that are **not** connected, by name.
- The FAQ says self-serve tracking does not exist yet, twice.
- `/login` and `/signup` are visibly labelled interface previews that collect nothing.
- Business hours are `null` in `content/site.ts`; the UI hides the block rather than guess.
- The hero visual is captioned "Illustrative example… Not live data."
- Every legal page carries a "pending legal review" banner until counsel signs it off.

If you add content, keep to this. It is the site's main asset.

---

## Architecture

```
app/                      Routes. Thin — they compose sections and export metadata.
components/
  ui/                     Primitives: Button, Card, Field, typography
  layout/                 Header, Footer, Container, Section
  shared/                 Cross-page: PageHero, CtaBand, Reveal, FaqAccordion, Notice
  sections/               Page-level compositions (homepage sections, FeaturePage, AuthPreview)
  forms/                  ContactForm (the only substantial client component)
content/                  ALL copy. No prose lives in a component.
lib/                      seo, jsonld, validation, mailer, rate-limit, utils
types/                    Content types
docs/                     Deployment and legal handover
```

### Content drives everything

`content/*.ts` is the source of truth. Navigation, routing, `generateStaticParams`, the
sitemap and every index page are **derived** from it — there is no second list to keep in
sync.

Each entity carries a `published` boolean:

```ts
{ slug: "omnichannel", name: "Omnichannel", published: false, /* …full content… */ }
```

An unpublished entity is fully written and fully typed but invisible: no route, no nav entry,
no sitemap URL, no index card. Flipping the boolean launches it — no component changes.

Currently unpublished and ready: the **Omnichannel** industry
(`content/industries.ts`).

### To change copy

Edit `content/`. Never edit a component to change wording.

| File | Owns |
|---|---|
| `site.ts` | Name, contact details, address, corporate relationship |
| `home.ts` | All seven homepage sections |
| `services.ts` | Six services — hero, benefits, process, best-for, SEO |
| `features.ts` | Technology, Approach, Sustainability, Analytics, Small Business, Enterprise |
| `industries.ts` | DTC, B2B, and the case-study list |
| `integrations.ts` | Shopify; the "not connected" list |
| `faq.ts` | 18 questions; `featured: true` promotes one to the homepage |
| `company.ts` | About, Partners, Careers, Talk to an Expert |
| `legal.ts` | Four legal documents |
| `navigation.ts` | Menu structure (derived from the above) |

---

## Design system

Tokens live in `app/globals.css` under `@theme`. No component hardcodes a hex.

**Visual benchmark: [ramp.com](https://ramp.com).** The palette, type treatment, radii,
border weight and flat surface language are matched to it. The values were sampled from the
live site's computed styles rather than eyeballed, then checked for contrast before use.

| Token | Value | Role |
|---|---|---|
| `accent` | `#e4f222` | The signature lime. **Fill only** |
| `ink-950` | `#0c0a08` | Text, dark sections, secondary buttons |
| `canvas` | `#ffffff` | Page |
| `canvas-warm` / `sunk` | `#f4f2f0` | Panels and tinted sections |
| `line` | `#e5e3e1` | The one hairline weight |

- **The lime is never a text colour on a light surface.** Lime on white is 1.23:1 —
  effectively invisible. On ink it is 16.02:1, which is why it only appears as a button fill
  with ink text, or as an accent on a dark section. The rule is written into `globals.css`.
- **Ink ramp** runs `400 → 950`. Every step from 400 up clears AA on white *and* on the
  off-white surface; measured ratios are recorded beside the tokens. `ink-300` and lighter
  are decorative only.
- **Type** — Geist via `next/font`, self-hosted, one family. It stands in for the benchmark's
  proprietary Lausanne: same neo-grotesque character, freely licensed. Everything sits at
  **weight 400**; hierarchy comes from size, colour and whitespace, never from bolding.
  Display sizes run at a ~1.0 line height with near-zero tracking.
- **Flat, no shadows.** Separation comes from hairline borders and surface tone. The shadow
  tokens still exist so nothing breaks, but they resolve to `none`.
- **Radii** — 12px panels, 6px controls, 4px chips.
- **Backdrop** — a dot field rather than a line grid: texture instead of structure behind
  large type.
- **Motion** — one primitive, `Reveal` in `components/shared/reveal.tsx`. Pure CSS, zero JS,
  disabled entirely under `prefers-reduced-motion`.

> The YourDart logo keeps its own identity but renders monochrome ink to sit correctly in
> this system. The original green (`#16A34A`) is retained as `brand-500` in the token file
> and is no longer used for UI chrome.

## Performance and accessibility

### Measured, not aspirational

Lighthouse against the production build (`npm run build && npm run start`):

| Page | Desktop | Mobile |
|---|---|---|
| `/` | 100 / 100 / 100 / 100 | 98 / 100 / 100 / 100 |
| `/services/shipping` | 100 / 100 / 100 / 100 | 98 / 100 / 100 / 100 |
| `/contact` | 100 / 100 / 100 / 100 | 96 / 100 / 100 / 100 |
| `/faq` | 100 / 100 / 100 / 100 | 95 / 100 / 100 / 100 |
| `/about` | 100 / 100 / 100 / 100 | 95 / 100 / 100 / 100 |
| `/legal/privacy-policy` | 100 / 100 / 100 / 100 | 95 / 100 / 100 / 100 |

*performance / accessibility / best practices / SEO*

Also verified:

- **axe-core**: 0 WCAG 2.1 A/AA violations across all 17 page templates
- **Responsive**: no horizontal overflow and no clipped text across 320 / 375 / 390 / 768 /
  1024 / 1280 / 1440 / 1920 px — 155 page-width combinations
- **Keyboard**: skip link is the first tab stop; nav dropdowns open on Enter and close on
  Escape; every control is reachable
- **No JavaScript**: every page renders complete and readable; the FAQ accordion still opens
- **Reduced motion**: `animation-name` resolves to `none` under `prefers-reduced-motion`

### How it gets there

Almost everything is a Server Component. Client JavaScript exists in exactly two files: the
header (dropdowns, mobile drawer) and the contact form. Scroll reveals and the FAQ accordion
ship zero JS.

- Skip link, semantic landmarks, one `<h1>` per page, correct heading order
- Brand-tinted `:focus-visible` ring everywhere; focus never suppressed
- Form labels wired via `htmlFor`, errors via `aria-describedby` + `aria-invalid` + `role="alert"`,
  submission result in a live region
- All decorative SVG and icons `aria-hidden`
- No external requests at runtime — CSP blocks them by default

### Two decisions worth knowing about

**The palette is contrast-checked, and the accent is not a text colour.** Lime on white is
1.23:1. So it is used exclusively as a fill paired with ink text (16.02:1) or as an accent on
a dark section. Every ink step from 400 up clears 4.5:1 on both light surfaces; the measured
ratios are recorded in `app/globals.css`. `ink-300` and lighter are decorative only.

**The reveal animation moves but does not fade.** A fade renders text at partial opacity
mid-transition, which genuinely drops it below the contrast threshold for a few hundred
milliseconds — axe and Lighthouse both catch it, correctly. A pure `translateY` reads as a
reveal while keeping every character at full contrast throughout.

---

## Contact form

`ContactForm` → `POST /api/contact` → Nodemailer over SMTP.

- One Zod schema (`lib/validation.ts`) validates on both client and server
- Off-screen honeypot; a filled honeypot returns `200` so bots learn nothing
- In-memory fixed-window rate limit, 5 per 10 min per IP (`lib/rate-limit.ts`) — swap for
  Redis if the app is ever scaled beyond one instance
- `lib/mailer.ts` is `server-only`, so importing it from client code is a build error
- User input is HTML-escaped and CR/LF-stripped before it reaches a mail header
- With SMTP unconfigured the endpoint returns `503` and a message pointing at the email
  address — it never fails silently

---

## SEO

- `lib/seo.ts` builds title, description, canonical, robots, Open Graph and Twitter metadata
  for every page from one function
- `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts` generated from the content layer
- JSON-LD: Organization, WebSite, BreadcrumbList, FAQPage, Service, ItemList
- **No** AggregateRating, Review, or LocalBusiness with invented hours, price range or
  service area — see `lib/jsonld.ts`
- Social card generated at build by `app/opengraph-image.tsx`; app icons by
  `lib/icon-image.tsx`, so no binary asset can go stale
- `/login` and `/signup` are `noindex` and disallowed in `robots.txt`

---

## Before launch

See the checklist in [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md#11-production-checklist).
The two blocking items are the legal review and confirming business hours.
