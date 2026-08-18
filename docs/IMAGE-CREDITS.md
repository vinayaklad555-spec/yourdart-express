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
