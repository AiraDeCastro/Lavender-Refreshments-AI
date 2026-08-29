# Lavender Refreshments — Tasks

Build checklist derived from [PLANNING.md](PLANNING.md) (stack/architecture) and the
PRD (scope). Milestones mostly run in order, but M0 (setup) doesn't need to wait on
content, and M1 (content) can run in parallel with M0/M2 since it depends on the owner,
not on code. Leave boxes unchecked until the work is actually verified, not just
started.

## M0 — Project setup

- [x] Install Node.js (LTS) — wasn't on the machine yet; installed v24.19.0 via winget
      _(discovered while starting M0)_
- [x] Scaffold the Astro project (`npm create astro@latest`)
- [x] Add the Tailwind CSS integration
- [x] Define content collection schemas: `menu.yaml`, `amenities.yaml`, `story.md`,
      `site.yaml` (hours/address/phone/FB handle) — implemented as
      `src/content.config.ts` + one placeholder entry per file, verified with a real
      build. `site.yaml` became `src/data/site.ts` (a plain settings file rather than a
      collection, since it's one config object, not a repeating list)
- [x] Set up Prettier/ESLint conventions
- [x] Set up an automated test suite (Vitest) — `tests/content-schemas.test.ts` and
      `tests/site.test.ts`, 8 tests total against real schema/data logic
      _(discovered/requested before the first push)_
- [x] Set up a pre-commit gate (Husky): lint → tests → build → `npm ls` → `npm audit
    --audit-level=high`, verified to both pass cleanly and actually block a broken
      commit _(discovered/requested before the first push)_
- [x] Enforce Conventional Commits via commitlint (`.husky/commit-msg`)
      _(discovered/requested before the first push)_
- [ ] Push the scaffold to `AiraDeCastro/Lavender-Refreshments-AI`
- [ ] Connect the repo to Netlify (or chosen host) and confirm a blank deploy goes live
      end-to-end before writing real pages

## M1 — Content & assets _(depends on the restaurant owner, not on code)_

- [ ] Get the final menu: categories, item names, prices, photos
- [ ] Get Purple House photography — exterior, interior, seating areas
- [ ] Get the founder/story write-up and accompanying photos
- [ ] Confirm hours, address, phone number, and the Facebook Page URL/handle
- [ ] Confirm existing logo/brand colors, or greenlight a purple palette built from
      scratch
- [ ] Resolve the open questions from the PRD: pickup vs. delivery (and fee/area),
      payment field (cash-only vs. GCash reference), Option A vs. B for the order flow,
      domain name, and language mix

**Blocks:** M2 and M3 need at least placeholder-quality answers here to design and
build real pages against — don't let this stall M0.

## M2 — Design

- [ ] Set purple/lavender color tokens in the Tailwind config
- [ ] Choose display + body typefaces, define the type scale
- [ ] Design Home — hero, primary CTAs, quick hours/location/FB link
- [ ] Design Menu — category layout, item card
- [ ] Design Amenities/The Space — gallery layout and captions
- [ ] Design Our Story — narrative or timeline layout
- [ ] Design the Order form — fields, validation states, confirmation screen
- [ ] Design shared Nav and Footer
- [ ] Mobile-first responsive pass across all five pages

## M3 — Build

- [ ] Build the global layout, Nav, and Footer components
- [ ] Build Home from the content collections
- [ ] Build Menu + `MenuCard` component, with category grouping
- [ ] Build Amenities gallery + `GalleryItem` component
- [ ] Build Our Story page
- [ ] Build the Order form (client-side state and validation)
- [ ] Implement the Messenger deep-link (`m.me/<page>?text=...`) per PRD Option A —
      **do not build Option B's backend here**
- [ ] Build the order confirmation screen
- [ ] Wire all photography through `astro:assets` for compression/responsive sizing
- [ ] Add SEO basics — meta tags, Open Graph image, per-page titles
- [ ] Accessibility pass — alt text on every photo, AA contrast check on the purple
      palette, full keyboard operability on the order form

## M4 — QA & soft launch

- [ ] Cross-device pass: iOS Safari, Android Chrome, desktop
- [ ] End-to-end order test — confirm the Messenger deep-link produces a correct,
      readable prefilled message on both iOS and Android
- [ ] Mobile performance check on a throttled connection (Lighthouse mobile score)
- [ ] Verify every link — map, Facebook Page, phone number — actually resolves
- [ ] Proofread all content against the owner-provided final copy (no leftover
      placeholder menu items, prices, or story text)
- [ ] Point the confirmed domain at the host, verify SSL
- [ ] Soft launch to a small group before a public announcement
- [ ] Set up analytics (optional — e.g. Plausible or Cloudflare Web Analytics) if the
      owner wants to track the PRD's success metrics

## M5 — Fast-follow (v1.1 — do not start until explicitly requested)

- [ ] Register a Meta App and request Page Messaging permission
- [ ] Build the Netlify Function that receives the order POST and calls the Messenger
      Send API (PRD Option B)
- [ ] Submit for Meta App Review
- [ ] Cut the order form over from the deep-link to direct API submission once approved
- [ ] Revisit the staff order-log page (PRD "Could" feature) if Option B alone isn't
      enough for staff to track orders
- [ ] Revisit an English/Filipino language toggle
- [ ] Revisit table reservations, if the owner asks for it
