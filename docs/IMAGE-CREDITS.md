# Image credits and licensing

Hero imagery in `/public/images` comes from four places, each with its own
section below: **Unsplash**, **Pexels**, **owner-supplied** files whose origin
is not recorded, and one **AI-generated** image. Read the relevant section
before reusing a file — the licence position is not the same for all of them.

The files in the table immediately below are from Unsplash, used under the
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

### Sea freight is not a service — watch the imagery

`services.ts` states plainly that the company forwards **by air** and does
"not run ocean or rail freight". Two files in the table above contradict that
if used on a transport page:

| File | Status |
|---|---|
| `port-terminal.jpg` | Removed from `/industries/b2b` and `/enterprise` on 2026-08-20. **Still on `/services` and `/partners`** — flagged to the owner, not yet changed. |
| `container-ship.jpg` | Unused, and should stay unused. The most explicit sea-freight claim in the library. |

A reader takes the picture as the claim, so a container port on a page about
moving goods offers a service that does not exist. Replacements so far:

- `/industries/b2b` -> `b2b-trucks.jpg`, road haulage supplied by the owner
  for this page. (It went briefly via the stock `road-freight.jpg` on the same
  reasoning: a curtain-sider is what these pallet consignments travel on.)
- `/enterprise` -> `warehouse-racking.jpg`. That page is about written
  procedures and reviewable reporting rather than about transport at all, so
  organised racking suits it better than any vehicle would.

> `road-freight.jpg` carries a legible third-party marking of its own: the
> trailer is signwritten **GRANOTRADE** with the domain `granotrade.cl`, a
> Chilean grain trader. It is unrelated to Your Dart Express but is not a
> logistics business either, so it reads as an ordinary vehicle rather than as
> a partner. Pre-existing — the file was already on `/talk-to-an-expert`,
> `/track` and `/approach` before B2B was added to that list.

## Pexels

Three images come from **Pexels** rather than Unsplash, used under the
[Pexels Licence](https://www.pexels.com/license/) — free for commercial use,
attribution not required. Recorded here for the same traceability reason.

| File | Source | Photographer |
|---|---|---|
| `air-freight-hero.jpg` | `pexels.com/photo/3140204` | Brett Sayles |
| `returns-van.jpg` | `pexels.com/photo/11932102` | Minsu Breitenstein |

Both chosen by the owner.

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

`returns-van.jpg` was pre-cropped: the original is 3448x4592 (0.75
portrait), cut to `(0, 962)-(3448, 4592)` and resized to 1600x1684
(ratio **0.95**), ~0.44 MB.

> **A real company's livery.** The van is signwritten **DDM LWL Technik**,
> with a street address in Opfikon, the domain `ddm-lwl.ch` and a legible
> Swiss plate (ZH 520 845). That is an unrelated third party — and not a
> courier — sitting on a page about returns collection, so a viewer could read
> a relationship that does not exist. It cannot be cropped out: the van *is*
> the subject.
>
> In practice the lettering is illegible at the size the hero renders (the van
> is ~240px wide on a desktop hero), but it is readable in the committed
> master. Flagged to the owner on 2026-08-20 and used at their direction. If
> it needs resolving, the options are to blur the rear-door text and plate, or
> to choose an unbranded vehicle.

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

That is fine when the subject is centred — the shipping photograph survives it
comfortably — but the van in `returns-van.jpg` sits right of centre, and a 1.21
crop cut its front off at that width. Hence the near-square 0.95 master: it
loses only 5% horizontally at 0.90, and at 1.60 the middle 59% of its height
still holds the whole van.

**Rule of thumb:** keep the subject near the centre, or cut the master closer
to 0.95 than to 1.20.

---

## AI-generated images

| File | Used on | Source |
|---|---|---|
| `doorstep-parcel.jpg` | `/services/shop-and-ship` hero | Supplied by the owner as `Images/Doorstep.png` |

A parcel on the step of a yellow front door. Cropped from the 1086x1448
portrait (0.75) to 1086x1143 (0.95), quality 82 (~0.30 MB). Served at its
native width — the master is only 1086px, so it is not upscaled.

The crop is taken from **y=130**, i.e. high in the frame, keeping the arch and
fanlight and dropping the lower brickwork. It cannot go higher. The parcel
sits at y 887–1032 in the master, and the 1.60 card shows only the middle
59.4% of the crop; taking it from y=0 pushed the parcel below that band and
the hero became a photograph of a door with no delivery in it. The offset has
to stay between 121 and 655 for the parcel to survive every card.

**This image is AI-generated, and it is worth knowing why that is certain.**
Magnify the parcel's shipping label or the brass plaque beside the door and
the lettering resolves into gibberish — letter-shaped marks that spell
nothing. Real signage does not do that.

Practical consequences:

- **No licence or model-release question.** Nothing was photographed, and the
  door number and plaque are not a real address. This is the cleanest image on
  the site on that front.
- **Never enlarge it or crop into it.** At hero size the fake text is
  illegible and reads as ordinary label detail. Any closer and it becomes
  obvious. That rules it out for a lightbox, a zoom, or a detail crop.
- The purple mark on the label resembles a brand logo but is not the Your Dart
  Express one. It is invented. Do not describe it as company packaging.

Also note that the site-wide honesty rule at the top of `content/media.ts` —
alt text is descriptive, never possessive — matters doubly here: this depicts
nothing that exists.

> `Images/Fulfillment.png`, used for the fulfillment hero, may also be
> AI-generated — it is the same kind of asset from the same batch — but
> inspection was **inconclusive**: its background is thrown out of focus and
> carries no legible text to test. The model-release caution recorded for it
> below therefore stands until its origin is confirmed either way.

---

## Owner-supplied, provenance not recorded

| File | Used on | Source |
|---|---|---|
| `fulfillment-picking.jpg` | `/services/fulfillment` hero | Supplied by the owner as `Images/Fulfillment.png` |
| `warehouse-pallet.jpg` | `/services/warehousing` hero | Supplied by the owner as `Images/Warehousing new.png` |
| `b2b-trucks.jpg` | `/industries/b2b` hero | Supplied by the owner as `Images/B2B.png` |
| `dtc-courier-hd.jpg` | `/industries/dtc` hero | Supplied by the owner as `Images/Door to door.png` |

### `dtc-courier-hd.jpg`

A courier on a delivery scooter, city background motion-blurred. Cut from
4611x3069 to 1.60 and resized to 1800x1125, quality 80 (~0.18 MB).

The target ratio is **1.60 on purpose**: that is exactly the widest card, so
that card crops nothing at all, and the rider is small enough in frame to
still clear the narrow 0.90 card with room. The 187px trim comes off the
bottom, where the frame is empty road — the only direction with anything
spare.

> **Supersedes `dtc-courier.jpg`, 2026-08-20.** That was the same composition
> from `Images/Direct to consumer.png`, but only 1537px wide and framed much
> tighter on the rider — tight enough that no crop cleared both ends of the
> card range, so it had to ship uncropped. This version is 3x the resolution
> with air around the subject, which is what makes a clean 1.60 cut possible.

`parcelsStacked` (`parcels-stacked.jpg`) was the previous DTC hero and is
**not** retired: `/integrations/shopify` still uses it.

### `b2b-trucks.jpg`

A curtain-side truck and a box truck at a road junction. Cropped from the
1086x1448 portrait (0.75) to 1086x905 (1.20), quality 82 (~0.23 MB), served at
native width.

The trucks sit in a horizontal band, so the crop **centres that band** rather
than cutting from either end — the 0.90 card then shows the middle 75% of the
width and the 1.60 card the middle 75% of the height, and both keep the
vehicles whole.

At 1086px it just covers the desktop card at 2x and reaches about 73% of what
the 800px card wants, so expect it to be slightly soft on a retina tablet — the
same limitation as `fulfillment-picking.jpg` and `doorstep-parcel.jpg`.

### `warehouse-pallet.jpg`

A forklift carrying a shrink-wrapped pallet past racking. Cut from 3762x3231
(1.164) by removing **300px off the top**, then resized to 1800x1402 (1.28),
quality 80 (~0.31 MB).

The trim direction is the point. The forklift stands tall in frame, so cutting
the bottom pushes it downward relative to the frame until the 1.60 card clips
its wheels — the same trap the previous warehousing file was shaped around.
Removing ceiling instead lifts the machine clear at both ends: the 0.90 card
shows the middle 70% of the width and the 1.60 card the middle 80% of the
height, and the whole forklift survives both. Verified in the browser.

> **Supersedes `warehouse-forklift.jpg`, 2026-08-20.** That was the same
> subject from `Images/Warehousing.png` (since renamed `Warehousing1.png`) but
> only 1254px square, which left the 800px card at about 84% of the pixels it
> wanted. This file is 3762px wide with more of the aisle in shot.

> **Rejected before this one, 2026-08-20.** The slot was briefly pointed at
> `Images/✨ Transform with Precision_ Powder Coating Service in Singapore
> ✨.jpeg`. Two problems: it is only **736px wide** — 68% of what the desktop
> card needs at 2x and 49% of the 800px card, so visibly soft — and it depicts
> a powder-coating production plant, not storage, on a page about recording
> stock. The filename is also a third party's marketing title, so its rights
> were unclear. Replaced at the owner's request before it shipped.

### `fulfillment-picking.jpg`

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
