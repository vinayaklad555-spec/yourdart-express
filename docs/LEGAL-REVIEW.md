# Legal review handover

> **Status: NOT REVIEWED.** Every document in `content/legal.ts` is template scaffolding
> written to describe how this website actually behaves. None of it has been reviewed by a
> qualified lawyer. Each page renders a visible amber banner saying so.

## How to clear this

1. Send the four documents to counsel, together with the notes below.
2. Apply their revisions in `content/legal.ts`.
3. Set `requiresLegalReview: false` on each reviewed document. The banner disappears.
4. Update `lastUpdated` to the approval date.

The banner is per-document, so documents can be cleared one at a time.

---

## What the documents currently assert about the site

These statements are **factually true of the code as it stands**. If any of them stops being
true, the corresponding document becomes a misrepresentation and must be updated first.

| Assertion | Where it is true in code |
|---|---|
| No third-party analytics, advertising or tracking scripts | No such script exists; CSP in `next.config.ts` blocks external origins |
| No non-essential cookies, therefore no consent banner | Nothing sets a cookie |
| Log-in/sign-up collect no credentials | `components/sections/auth-preview.tsx` — every control is `disabled`; no form action, no handler |
| Site served over HTTPS only | HSTS + `upgrade-insecure-requests` in `next.config.ts` |
| SMTP credentials never reach the browser | `lib/mailer.ts` is `server-only`; secrets read from env |
| Contact form data used only to respond | `app/api/contact/route.ts` sends one email and stores nothing |
| No security certifications claimed | Data Security §8 states this explicitly |

---

## Gaps counsel must close

The templates deliberately do **not** cover the following, because the business has not
supplied the information and guessing at it would be worse than omitting it.

### Governing law and jurisdiction
Terms of Use §10 is a placeholder. The company address is New York, NY. Counsel to confirm
governing law, jurisdiction, and any consumer-protection carve-outs.

### Terms of carriage — the significant gap
The Terms of Use cover **the website only** and say so. A logistics operator needs a separate
service agreement covering at minimum:

- Limitation of liability for loss, damage and delay, and the basis of any limit
- Insurance: what is covered by default, what requires declared value
- Claims procedure and notification deadlines
- Prohibited and restricted goods
- Title, risk and lien over goods held in warehouse
- Payment terms, storage charges, demurrage
- Force majeure
- Subcontracting to carriers and last-mile providers
- **Freight forwarding specifically** — whether the company contracts as principal or as
  agent. This materially changes liability and is the single most important term to get
  right. Standard trading conditions (e.g. NCBFAA/FIATA) may be appropriate.
- Customs: who is importer/exporter of record, duties and taxes, declaration accuracy

### Privacy — jurisdictional scope
Confirm which regimes apply. A New York address with cross-border freight and a public
website may bring in:

- New York SHIELD Act (data security requirements)
- Other US state privacy laws, depending on customer residency
- GDPR / UK GDPR if EU or UK individuals are involved — this would require a lawful-basis
  table, an international-transfer mechanism, and possibly a representative

Also confirm: retention periods against actual customs and tax obligations; whether a
Data Processing Agreement is needed with warehouse or carrier partners.

### Shop and Ship
Package forwarding raises specific questions: who is the importer of record, who is liable
for duties and taxes, what happens to prohibited or undeliverable items, and how long
unclaimed parcels are held before disposal.

### Cookie Policy
Currently accurate. It becomes false the moment analytics is added. See `docs/DEPLOYMENT.md`
§9 — the policy must be updated *before* any tag goes live.

---

## Other pre-launch confirmations

Not legal, but they belong in the same review pass:

- [ ] Business hours — currently `null` in `content/site.ts`; the UI hides the block rather
      than guessing. Add them or leave them out.
- [ ] COD — FAQ says availability is confirmed per route. Confirm this is accurate.
- [ ] Coverage — no geographic claim is made anywhere. Confirm this is the intended position.
- [ ] Corporate relationship — the site states Your Dart Express is "part of the same company
      family as Globe Dart Gateway Inc. and shares its business address". Confirm this is the
      correct legal characterisation. It appears in the footer, About page, FAQ and in the
      `parentOrganization` field of the Organization JSON-LD.
- [ ] Entity name — `content/site.ts` uses "Your Dart Express" as `legalName`. If the
      registered entity differs, correct it; it appears in the copyright line and JSON-LD.
