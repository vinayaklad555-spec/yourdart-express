# Image credits and licensing

All hero photography in `/public/images` comes from **Unsplash**, used under the
[Unsplash Licence](https://unsplash.com/license) — free for commercial use, no
permission or attribution required. Attribution is recorded here anyway, both
as good practice and so any image can be traced back to its source.

Every file is **self-hosted**. Nothing is hot-linked: the site's
Content-Security-Policy sets `img-src 'self'`, so an external image URL would
be blocked by the browser.

| File | Source |
|---|---|
| `port-terminal.jpg` | `unsplash.com/photos/1494412574643-ff11b0a5c1c3` |
| `road-freight.jpg` | `unsplash.com/photos/1519003722824-194d4455a60c` |
| `container-ship.jpg` | `unsplash.com/photos/1578575437130-527eed3abbec` |
| `parcels-stacked.jpg` | `unsplash.com/photos/1580674285054-bed31e145f59` |
| `fulfilment-floor.jpg` | `unsplash.com/photos/1586528116311-ad8dd3c8310d` |
| `warehouse-racking.jpg` | `unsplash.com/photos/1587293852726-70cdb56c2866` |
| `parcel-pair.jpg` | `unsplash.com/photos/1595246140625-573b715d11dc` |
| `highway-haulage.jpg` | `unsplash.com/photos/1601584115197-04ecc0da31d7` |
| `hero-truck.jpg` | **Supplied by the business** (`Images/BG Landing 3.png`) — not Unsplash |
| `hero-truck-mobile.jpg` | **Supplied by the business** (`Images/BG Landing Mobile Version.png`) — not Unsplash |

> The IDs above are the Unsplash asset identifiers. Photographer names were not
> retrievable without an API key — resolve each at
> `https://unsplash.com/photos/<id>` if you want to credit them by name.

## Pexels

Three images come from **Pexels** rather than Unsplash, used under the
[Pexels Licence](https://www.pexels.com/license/) — free for commercial use,
attribution not required. Recorded here for the same traceability reason.

| File | Source | Photographer |
|---|---|---|
| `air-freight-hero.jpg` | `pexels.com/photo/3140204` | Brett Sayles |
| `shop-and-ship-hero.jpg` | `pexels.com/photo/6995133` | Kindel Media |
| `returns-van.jpg` | `pexels.com/photo/11932102` | Minsu Breitenstein |
| `warehouse-dock.jpg` | `pexels.com/photo/12585837` | Boom |

All four chosen by the owner.

`warehouse-dock.jpg` — cartons in front of loading dock doors. The original is
5158x3434 (1.50); trimmed evenly from both sides to 1.20 and resized to
1800x1500 (~0.18 MB), so the 0.90 card discards 25% of the width rather than
40%. No people, no marks.

`air-freight-hero.jpg` was downscaled from the 4024x4024 / 2.6 MB original to
1800x1800 at quality 60 (~0.48 MB) before committing, matching what
`shipping-hero.jpg` was held to. The master is square; the hero crops it to
each breakpoint's ratio.

> **Third-party livery in `air-freight-hero.jpg`.** Unlike the homepage truck,
> that photograph shows **United Airlines** aircraft, ground equipment and
> baggage containers, all carrying United's marks. Your Dart Express has no
> stated relationship with United, and on a page selling air freight
> forwarding a viewer could read one in. The Pexels licence covers the
> photograph; it does not grant any right in the trademarks inside it. Flagged
> to the owner on 2026-08-20 and used at their direction — revisit if the page
> ever makes a carrier-partnership claim, or swap for unbranded air-cargo
> imagery.

`shop-and-ship-hero.jpg` needed a **pre-crop**, not just a downscale. The
original is 2622x4655 — a 0.56 portrait — and the hero is landscape, so
letting `object-cover` centre it would have framed the front door and pushed
every parcel out of shot. It is cropped to `(190, 2600)-(2622, 4655)` and
resized to 1800x1521 (ratio 1.18, ~0.23 MB), which keeps the doorstep as the
subject. Its parcels sit centrally, so it survives the 0.90 card described
below. Re-crop from the original in `Images/` rather than reusing this file if
the hero's shape ever changes.

> The left edge starts at x=190 rather than 0 deliberately: an **Amazon**
> smile logo on the nearest box sits in the first ~160px, and this page sells
> parcel forwarding, where a retailer's mark could read as a tie-in. The
> remaining packaging is unbranded. Nothing else was altered.

`returns-van.jpg` was also pre-cropped: the original is 3448x4592 (0.75
portrait), cut to `(0, 962)-(3448, 4592)` and resized to 1600x1684
(ratio **0.95**), ~0.44 MB.

That 0.95 is deliberate and worth understanding before cropping another hero
— see the note below.

### The hero card is not one shape

Measured in the browser, `PageHero`'s image card runs across a **much wider
range than it looks**:

| Viewport | Card | Ratio |
|---|---|---|
| 390px (mobile) | 350x263 | 1.33 |
| 800px (sm) | 744x465 | **1.60** |
| 1024px (lg) | 444x496 | **0.90** |
| 1440px (desktop) | 540x496 | 1.09 |

The 1024–1279px band is the trap: two columns make the card *portrait* (0.90),
not landscape. `object-cover` then crops the sides hard — a 1.21 master loses
26% of its width there, a 1.50 master loses 40%.

That is fine when the subject is centred (the shipping, fulfillment and
shop-and-ship photographs all survive it), but the van in `returns-van.jpg`
sits right of centre, and a 1.21 crop cut its front off at that width. Hence
the near-square 0.95 master: it loses only 5% horizontally at 0.90, and at
1.60 the middle 59% of its height still holds the whole van.

**Rule of thumb:** keep the subject near the centre, or cut the master closer
to 0.95 than to 1.20.

> **A real company's livery.** The van is signwritten **DDM LWL Technik**,
> with a street address in Opfikon, the domain `ddm-lwl.ch` and a legible
> Swiss plate (ZH 520 845). That is an unrelated third party — and not a
> courier — sitting on a page about returns collection, so a viewer could read
> a relationship that does not exist. Unlike the Amazon box on
> `shop-and-ship-hero.jpg`, this cannot be cropped out: the van *is* the
> subject.
>
> In practice the lettering is illegible at the size the hero renders (the van
> is ~240px wide on a desktop hero), but it is readable in the committed
> master. Flagged to the owner on 2026-08-20 and used at their direction. If
> it needs resolving, the options are to blur the rear-door text and plate, or
> to choose an unbranded vehicle.

---

## `fulfillment-picking.jpg` — provenance not recorded

| File | Used on | Source |
|---|---|---|
| `fulfillment-picking.jpg` | `/services/fulfillment` hero | Supplied by the owner as `Images/Fulfillment.png` |

A warehouse worker lifting a carton from racking. Cropped from the 1023x1537
portrait master to 1023x1077 (ratio 0.95), quality 82 (~0.10 MB). The crop is
placed high on purpose: the 1.60 card shows only the middle 59% of the height,
and a centred crop cut the top of her head off.

Two things to know about this one.

**It is the lowest-resolution image on the site.** The master is 1023px wide
and is served as-is — upscaling would only add weight, not detail. That is
enough for the desktop card (540 CSS px, so 1080 at 2x) but *short* of the
800px-viewport card, which wants ~1488. It will look slightly soft on a retina
tablet. A higher-resolution copy of the same shot would fix it.

**Someone identifiable is in frame.** Her face is clearly visible and in
focus. The section above notes that identifiable people need written model
releases before publishing; no library, licence or release is on record here,
and the file carries no copyright metadata. Worth confirming a release exists —
this is a different question from the licence, and it is the one that matters
when a real person's face is used to advertise a service.

> **Two superseded photographs, 2026-08-20.** This slot previously held
> `african-american-staff-printing-awb-...jpg`, which carried an explicit
> `Artist` / `Copyright` EXIF notice reading "Dragos Condrea" and no licence
> grant — do not reinstate it without one. It then briefly held
> `box-sealing.jpg` (hands taping a carton, from
> `Images/person-sealing-cardboard-box-with-packing-tape.jpg`), which was clean
> on every count: no copyright metadata, no marks, no faces. That file has been
> deleted now that nothing references it, but it is in git history and is the
> obvious fallback if the picking photograph has to come down.

---

## The homepage hero image

`hero-truck.jpg` was supplied by the business rather than sourced from a stock
library, so the licence questions above do not apply to it. It is a rendered
scene: an **unbranded** box truck at dusk. Because the vehicle carries no
livery it depicts the category rather than claiming a truck the company owns,
which is why it is safe to use as the homepage backdrop.

It is decorative — the hero heading carries the meaning — so it is rendered
with an empty `alt` and hidden from assistive technology. Screen reader users
lose nothing.

### Source and sizing

The master is `Images/BG Landing 3.png` — 5016x2862 (ratio 1.753), 8.1MB. It is
served as a 3200px JPEG at quality 92, which Next delivers as AVIF/WebP at
whatever size each device needs.

### Two crops, switched by viewport

The hero ships as **two** masters, because the hero box is not one shape — it
runs from 0.54 on a phone to 2.52 on an ultrawide display:

| File | Source | Used |
|---|---|---|
| `hero-truck.jpg` | `BG Landing 3.png`, 5016x2862 | 640px and up |
| `hero-truck-mobile.jpg` | `BG Landing Mobile Version.png`, 3600x3600 | below 640px |

They are switched with `<picture>` via the framework's `getImageProps` helper,
so the browser downloads exactly one. Rendering both and hiding one with CSS
would fetch both.

Note that the hero `<img>` uses explicit `width`/`height` rather than `fill`.
`fill` writes inline positioning styles onto the element, and inline styles beat
class names — which silently prevented the mobile band layout from applying at
all. Explicit dimensions also give the browser an aspect ratio to reserve, and
CLS measures 0.

Below 640px the image is a band anchored to the bottom of the section rather
than a full-bleed backdrop. The truck sits at a fixed 47-72% of the square
crop's height, so when it covers the whole section it lands at 47-72% of the
section — and on a phone the copy is taller than that, so the two collide
whatever the padding. Clearing it by height alone would need a ~1230px hero.

The hero is the one image on the site rendered at `quality={90}` rather than the
default 75. Next 16 requires every quality value to be allowlisted in
`next.config.ts` (`images.qualities`), so both values are declared there. At 75
a full-bleed backdrop encodes down far enough to look soft on a large display;
at 90 it does not. Smaller images stay at 75, where the difference is not
visible and the bytes are better spent elsewhere.

Earlier versions of this backdrop were supplied as `.svg`. They were not vector
art — each was a single large PNG base64-encoded inside an `<svg>` wrapper, so
serving them as SVG would have shipped 6MB+ to every visitor and bypassed image
optimisation entirely (Next cannot resize a raster embedded in an SVG, and
`dangerouslyAllowSVG` would have to be enabled to render it at all). If a future
backdrop arrives as an SVG, check whether it is genuinely vector before pointing
the site at it.

To replace it, drop a new file at `public/images/hero-truck.jpg`, then clear
BOTH optimiser caches (see docs/DEPLOYMENT.md section 11a) — otherwise some
viewport widths keep serving the previous picture.

## These are not photographs of Your Dart Express

**This is the important part, and it is consistent with how the rest of the site
is written.**

Nothing pictured belongs to the business. These are stock photographs of
generic ports, roads, warehouses and parcels. No image shows a Your Dart Express
facility, vehicle, employee or customer's goods.

Because of that, the alt text in `content/media.ts` is deliberately
**descriptive, never possessive**:

- ✅ "Pallet racking stacked with goods in a storage warehouse"
- ❌ "Our warehouse in New York"

No caption anywhere claims the pictured facility is the company's. Keep it that
way — an image that implies infrastructure the business does not operate is the
same category of overclaim as an invented statistic, and it is the one kind of
dishonesty a website can commit without writing a single false word.

## Replacing them with real photography

Drop real photographs into `/public/images` using the **same filenames** and
the site picks them up with no code change. At that point:

1. Rewrite the alt text in `content/media.ts` to describe what is actually
   shown, and whose it is.
2. Update this file to record that the imagery is now first-party.
3. If people are identifiable, obtain written model releases before publishing.

## Owner-supplied artwork

These are **not** licensed stock and are not covered by the Unsplash table
above. They were provided by Your Dart Express and are the company's own
assets to use.

| File | Used on | Note |
| --- | --- | --- |
| `shipping-hero.jpg` | `/services/shipping` hero | Courier photograph. Downscaled from the 6000x4000 / 8.4 MB original to 2400px wide (~0.46 MB) before committing — the optimiser would have served it fine, but the source would have bloated the repo. |
| `auth-aura.png` | `/login`, `/signup` panel | Purple aura artwork. |
| `benefit-one-point-of-contact.png` | "One point of contact" card on `/services/shipping` | Rendered illustration (source: `Images/One point.png`). Supplied per-benefit via the `image` visual kind, which replaces the card wash. |
| `card-bg.png` | Benefit-card panels on every `/services/*` page | Lavender wash. Repeated four times per page, so it is served through the image optimiser rather than as a CSS background. Was briefly used on the footer too; removed at the owner's request. |
