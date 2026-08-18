# Deployment — Hostinger + GoDaddy

Everything needed to take this repository from local to `https://yourdartexpress.com`.

---

## 1. Choose the hosting mode

The site is **43 static pages plus one dynamic API route** (`/api/contact`, which sends the
enquiry email over SMTP). That single route determines the hosting decision.

| Mode | Contact form works? | Hostinger plan |
|---|---|---|
| **Node.js hosting (recommended)** | Yes | VPS, or Business/Cloud with Node.js support |
| Static export | **No** — form is dead | Any shared plan |

### Recommended: Node.js hosting

Keep `/api/contact` server-side. Mail credentials stay in server environment variables and
never reach the browser. This is the mode the project is configured for — no code changes.

### Fallback: static export

Only if Node.js hosting is not available. You would need to:

1. Add `output: "export"` to `next.config.ts`.
2. Delete `app/api/contact/route.ts` and the icon/OG image routes (`ImageResponse` needs a
   server) — replace them with exported PNG files in `public/`.
3. Replace the form's `fetch("/api/contact")` with a third-party form endpoint (Formspree,
   Web3Forms) **or** replace the form entirely with a `mailto:` link.
4. Note that `headers()` in `next.config.ts` stops applying — the security headers must be
   re-created as an `.htaccess` file instead. See §7.

Static export is a real downgrade. Prefer Node.js hosting.

---

## 2. Build commands

```bash
npm ci                # install exactly what package-lock.json specifies
npm run build         # produces .next/
npm run start         # serves the production build on $PORT (default 3000)
```

Node **20 or newer** is required. Confirm with `node -v` on the server.

In the Hostinger Node.js application settings:

| Field | Value |
|---|---|
| Application root | the directory you upload to (e.g. `/home/USER/domains/yourdartexpress.com/app`) |
| Application URL | `yourdartexpress.com` |
| Application startup file | `node_modules/.bin/next` with args `start`, **or** use `npm run start` |
| Node version | 20+ |
| Environment | Production |

If the panel offers a persistent process manager, set the start command to `npm run start`.
On a VPS, use PM2 instead:

```bash
npm i -g pm2
pm2 start npm --name yourdart -- run start
pm2 startup && pm2 save
```

---

## 3. Environment variables

Copy `.env.example` and set every value in the **Hostinger control panel**, not in a file
committed to the repository.

```
NEXT_PUBLIC_SITE_URL=https://yourdartexpress.com
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=contact@yourdartexpress.com
SMTP_PASSWORD=<the mailbox password>
MAIL_FROM=contact@yourdartexpress.com
MAIL_TO=contact@yourdartexpress.com
```

> `NEXT_PUBLIC_SITE_URL` is read **at build time** for canonical URLs, Open Graph URLs, the
> sitemap and JSON-LD. If you change it, you must rebuild. Setting it after the build has no
> effect.

**Never** prefix a secret with `NEXT_PUBLIC_` — that prefix inlines the value into the
JavaScript sent to browsers.

---

## 4. Email setup (Hostinger)

1. Hostinger panel → **Emails** → select `yourdartexpress.com` → create the mailbox
   `contact@yourdartexpress.com`.
2. Note the password; put it in `SMTP_PASSWORD`.
3. SMTP settings are `smtp.hostinger.com`, port `465` (implicit TLS). Port `587` with
   STARTTLS also works — the mailer switches automatically based on the port number.
4. **Deliverability.** Hostinger adds SPF and DKIM records automatically when the domain's
   DNS is managed by Hostinger. If DNS stays at GoDaddy (Option B in §5), you must copy
   those records across manually or enquiries will land in spam. Verify with
   [mail-tester.com](https://www.mail-tester.com).

`MAIL_FROM` must be a mailbox on the domain. Sending as the enquirer's address would fail SPF.
The enquirer's address is set as `Reply-To` instead, so hitting reply reaches them directly.

---

## 5. Connecting the GoDaddy domain

`yourdartexpress.com` is registered at GoDaddy. Hosting is at Hostinger. Pick **one** of these.

### Option A — Point nameservers to Hostinger (recommended)

Simplest, and it lets Hostinger manage SPF/DKIM for email automatically.

1. Hostinger panel → **Domains** → the domain → note the nameservers, typically:
   ```
   ns1.dns-parking.com
   ns2.dns-parking.com
   ```
   Use the exact values Hostinger shows you — do not assume these.
2. GoDaddy → **My Products** → `yourdartexpress.com` → **DNS** → **Nameservers** → **Change**
   → **Enter my own nameservers** → paste both → **Save**.
3. GoDaddy will warn that existing DNS records will stop applying. That is expected.
4. Propagation is usually under an hour, occasionally up to 48.

**Before switching**, copy any DNS records you still need (existing email, verification TXT
records) into Hostinger's DNS zone, or they will break at cutover.

### Option B — Keep DNS at GoDaddy, point records at Hostinger

Use this if other services depend on GoDaddy DNS.

Get the server IP from Hostinger (**Hosting** → **Details** → website IP), then in GoDaddy
DNS:

| Type | Name | Value | TTL |
|---|---|---|---|
| A | `@` | `<Hostinger IPv4>` | 600 |
| CNAME | `www` | `yourdartexpress.com` | 600 |
| AAAA | `@` | `<Hostinger IPv6>` *(only if provided)* | 600 |

Delete GoDaddy's parking/forwarding records for `@` and `www` first — a leftover forwarding
rule silently overrides the A record.

For email under this option, also add Hostinger's MX, SPF (TXT) and DKIM (TXT) records
exactly as Hostinger lists them.

### Verify

```bash
dig +short yourdartexpress.com
dig +short www.yourdartexpress.com
curl -sI https://yourdartexpress.com | head -1
```

---

## 6. SSL and the www redirect

**SSL.** Hostinger panel → **Websites** → **SSL** → install the free Let's Encrypt
certificate. Issue it **after** DNS resolves to Hostinger, or validation fails. Then enable
**Force HTTPS**.

The app already sends `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`.
Do not enable that header until HTTPS is confirmed working on both apex and `www` — HSTS is
sticky in browsers and will lock out visitors if the certificate is wrong.

**www redirect.** Pick apex (`yourdartexpress.com`) as canonical — it is what
`NEXT_PUBLIC_SITE_URL` and every canonical tag use. Set a 301 from `www` to apex in the
Hostinger panel (**Websites → Redirects**). Duplicate content on both hostnames is the most
common avoidable SEO problem at launch.

Verify:

```bash
curl -sI http://yourdartexpress.com      | grep -i location   # → https://
curl -sI https://www.yourdartexpress.com | grep -i location   # → https://yourdartexpress.com
```

---

## 7. Security headers

Applied by `next.config.ts` on Node.js hosting — nothing more to do.

**Static-export deployments only**, add to `.htaccess` at the web root:

```apache
<IfModule mod_headers.c>
  Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self'; frame-src https://www.google.com/maps https://www.google.com/maps/; form-action 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'; upgrade-insecure-requests"
  Header always set X-Content-Type-Options "nosniff"
  Header always set X-Frame-Options "DENY"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=(), interest-cohort=()"
  Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
</IfModule>
```

---

## 8. Google Search Console

1. [search.google.com/search-console](https://search.google.com/search-console) → **Add
   property** → **Domain** (covers apex, `www` and both protocols).
2. Verification: add the TXT record Google gives you at whichever DNS provider is
   authoritative (Hostinger for Option A, GoDaddy for Option B).
3. After verification: **Sitemaps** → submit `sitemap.xml`.
4. Set the preferred domain by ensuring the `www` → apex redirect from §6 is live.

Meta-tag verification is also supported via `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in
`.env.example` — but it requires a rebuild, so the DNS method is preferable.

---

## 9. Google Analytics — read before adding

**The site currently loads no third-party scripts at all.** That is a deliberate position,
and three things depend on it:

- The **Cookie Policy** states there are no analytics or tracking cookies.
- There is **no cookie consent banner**, because there is nothing to consent to.
- The **CSP** in `next.config.ts` blocks all external script and connect origins.

If you add Google Analytics, you must do all four of these, in order:

1. Update `content/legal.ts` → Cookie Policy and Privacy Policy to describe the analytics
   cookies, their purpose and their retention.
2. Implement a consent mechanism that blocks GA until consent is given (required in the EU
   and UK; advisable everywhere).
3. Extend the CSP: add `https://www.googletagmanager.com` to `script-src`, and
   `https://www.google-analytics.com https://*.analytics.google.com` to `connect-src`.
4. Load the tag with `next/script` and `strategy="afterInteractive"`.

Adding the tag without steps 1–3 makes the published Cookie Policy false and the script will
be blocked by CSP anyway.

A privacy-friendly alternative (Plausible, Fathom, Umami) avoids the consent banner entirely
and needs only steps 1 and 3.

---

## 10. Deploying an update

```bash
git pull
npm ci
npm run build
pm2 restart yourdart          # or restart the app from the Hostinger panel
```

Rebuild whenever content in `content/`, `NEXT_PUBLIC_SITE_URL`, or anything under `app/`
changes. Content is compiled into the static pages at build time.

---

## 11. Production checklist

**Before going live**

- [ ] `npm run build` completes with no errors
- [ ] `npm run lint` is clean
- [ ] All environment variables set in the Hostinger panel
- [ ] `NEXT_PUBLIC_SITE_URL` is `https://yourdartexpress.com` and the site was built after
- [ ] Contact form submits successfully and the email arrives at `MAIL_TO`
- [ ] The reply-to on that email is the enquirer's address
- [ ] mail-tester.com score is 9/10 or better
- [ ] **Legal documents reviewed by counsel** — see `docs/LEGAL-REVIEW.md`, then set
      `requiresLegalReview: false` in `content/legal.ts` to remove the on-page banners
- [ ] **Tracking demo mode decided.** It is OFF in a production build by
      default. If you set `TRACKING_DEMO_MODE=true` for a staging demo,
      remember it returns sample shipments for *any* valid-looking reference —
      each one banner-ed as sample data, but it must not be left on once real
      customers arrive.
- [ ] Business hours confirmed and added to `content/site.ts`, or left `null`
- [ ] Every published claim re-read against what the business actually does today

**DNS and SSL**

- [ ] Apex and `www` both resolve to Hostinger
- [ ] SSL certificate issued and valid on both
- [ ] Force HTTPS on; `http://` redirects to `https://`
- [ ] `www` 301-redirects to apex
- [ ] Email still delivers after the DNS change (SPF, DKIM, MX intact)

**SEO**

- [ ] `https://yourdartexpress.com/sitemap.xml` returns 30 URLs
- [ ] `https://yourdartexpress.com/robots.txt` is correct and references the sitemap
- [ ] Search Console property verified and sitemap submitted
- [ ] [Rich Results Test](https://search.google.com/test/rich-results) passes on `/` and `/faq`
- [ ] Open Graph card renders — check with the LinkedIn Post Inspector
- [ ] Every page has one `<h1>` and a unique title and description
- [ ] `/track/<reference>` scores ~66 on Lighthouse SEO. **This is correct.** The
      only failing audit is `is-crawlable`, because individual tracking results
      are deliberately `noindex` — they are per-customer, time-sensitive, and a
      reference can identify a named person's delivery. Do not "fix" it.

**Quality** — all of these passed against the production build before handover. Re-run after
any content or styling change, and again on the live domain.

- [ ] Lighthouse ≥ 95 performance and 100 accessibility / best practices / SEO
      *(baseline: desktop 100 across the board; mobile 95–98 performance, 100 elsewhere)*
- [ ] axe-core reports 0 WCAG 2.1 A/AA violations *(baseline: 0 across 17 templates)*
- [ ] Keyboard-only pass: skip link, nav dropdowns, mobile drawer, form, FAQ accordion
- [ ] No horizontal overflow or clipped text at 320, 375, 390, 768, 1024, 1280, 1440, 1920 px
- [ ] `prefers-reduced-motion: reduce` stops all animation
- [ ] Page renders complete with JavaScript disabled
- [ ] 404 page reachable and links work
- [ ] `/login` and `/signup` still clearly labelled as previews and still collect nothing

> **Run Lighthouse against a freshly started server.** If a `next start` process is already
> bound to the port, a second one fails silently and you end up auditing a stale build —
> which shows up as spurious `errors-in-console` MIME-type failures on CSS chunks.

---

## 11a. Replacing an image after launch

Optimised images are served with `Cache-Control: public, max-age=2592000` — the
30-day `minimumCacheTTL` in `next.config.ts`. That is right for performance and
a trap for updates.

**If you overwrite a file in `/public/images` and keep the same filename,
returning visitors keep seeing the old picture for up to 30 days.** Their
browser has no reason to re-request a URL that has not changed.

So when replacing an image whose content changes meaningfully:

1. **Give it a new filename** — `hero-truck-2.jpg`, or a date suffix — and
   update the path in `content/media.ts`. This is the only approach that works
   for people who have already visited.
2. Clear the server-side optimiser caches so the new file is re-encoded:
   ```bash
   rm -rf .next/cache/images .next/dev/cache/images
   ```
   There are **two** of them. `.next/cache/images` is used by `next start`;
   `.next/dev/cache/images` is used by `next dev`. Clearing only one leaves the
   other serving the old picture, and because each width is cached separately
   you can get the new image at one breakpoint and the old one at another —
   which looks like a mystery rather than a cache.
3. Rebuild and restart.

## 12. Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Canonical tags say `localhost` | Built without `NEXT_PUBLIC_SITE_URL` | Set it, rebuild |
| Form returns 503 | SMTP vars missing | Set all four `SMTP_*` and restart |
| Form returns 502 | SMTP rejected the credentials or port | Check password; try 587 |
| Enquiries go to spam | SPF/DKIM missing after DNS move | Re-add Hostinger's TXT records |
| Form returns 429 | Rate limit — 5 per 10 min per IP | Expected; adjust in `lib/rate-limit.ts` |
| Fonts look wrong | Build ran without network access | Rebuild with network; `next/font` fetches DM Sans at build time |
| SSL fails to issue | DNS not yet pointing at Hostinger | Wait for propagation, retry |
| Blank page, 500 in logs | Node version too old | Use Node 20+ |
