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
- [x] Push the scaffold to `AiraDeCastro/Lavender-Refreshments-AI` — already on `main`
      as of the previous session (commit `f78fe22`); verified by cloning the repo fresh
      and confirming it matches
- [x] Connect the repo to Cloudflare Pages and confirm a blank deploy goes live
      end-to-end — owner connected the repo 2026-08-30; verified live at
      `https://lavender-refreshments-ai.airanicoledecastro9.workers.dev/` (Cloudflare
      served this under a `workers.dev` subdomain rather than `pages.dev` — same
      Pages product, no functional difference), page renders with no console errors.
      Every future push to `main` will auto-redeploy to this same address. **Not yet
      done, deliberately:** pointing the real `lavenderrefreshments.com` domain at
      this project — that's an M4 (soft launch) step, since the real domain is still
      serving the current live site and shouldn't be swapped until this one has real
      content

## M1 — Content & assets _(depends on the restaurant owner, not on code)_

- [x] Get the final menu: categories, item names, prices, photos — full menu (12
      categories, 72 items) provided by the owner 2026-08-30, loaded into
      `src/content/menu.yaml`. Bilao and Beer items are priced "Ask staff" (no fixed
      price) rather than a peso amount — extended `menuItemSchema` to accept that as a
      valid price, with tests. Bilao items reference photo filenames the owner gave
      (e.g. `/bilao-pancit.jpg`) — those exact files landed in `public/` 2026-08-30, so
      every Bilao item now has a matching real photo on disk
- [x] Get Purple House photography — exterior, interior, seating areas — owner added
      real photos directly to `public/` 2026-08-30: 35 gallery photos (`gallery-*`), 7
      food photos (`food-*`), 5 logo variants (`LR_Logo1–5.png`), and an owner/founder
      photo (`Owner-Mother.JPG`). Not yet sorted into `amenities.yaml` entries — that
      needs a caption per photo, which is content the owner should provide when
      convenient, not urgent
- [ ] Get the founder/story write-up and accompanying photos — write-up still coming in
      a future session; a candidate photo (`Owner-Mother.JPG`) already exists in
      `public/`
- [x] Confirm hours, address, phone number, and the Facebook Page URL/handle — Facebook
      **Page** confirmed 2026-08-30: https://www.facebook.com/profile.php?id=100076299965269
      ("Lavender refreshment", verified as a real Page, not the Group linked from the
      live site) — phone matches at +63 907 277 1354, so `src/data/site.ts` now points
      at the Page instead of the Group. Hours conflict (website said Mon–Sun
      7:30am–6:30pm, Facebook Page said Tue–Sun 8am–7pm with a call-ahead note for
      Monday) resolved 2026-08-30 — owner confirmed the Facebook Page version is
      current; `site.ts` updated, to be revisited later per the owner
- [x] Confirm existing logo/brand colors, or greenlight a purple palette built from
      scratch — confirmed from the live site: existing logo (`LR_Logo5.png`) and a
      purple/lavender palette already in use (button purple `#7C3AED`, dark section
      `#2E1065`, soft pink-to-lavender gradient background) — matches Tailwind's stock
      violet scale closely, reuse rather than inventing a new palette in M2.
      _(2026-08-30: owner also provided `LR_Logo_Transparent.png`, a true
      transparent-background version of the same logo — use this one over the
      lavender-boxed variants once real pages are built, since it sits cleanly on any
      background color, e.g. the dark footer)_
- [ ] Resolve the open questions from the PRD: pickup vs. delivery (and fee/area),
      payment field (cash-only vs. GCash reference), Option A vs. B for the order flow,
      ~~domain name~~, and language mix
      _(domain resolved: `lavenderrefreshments.com`, already live on the owner's
      Cloudflare account)_

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
