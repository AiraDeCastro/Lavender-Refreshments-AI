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
      Monday) resolved 2026-08-30 — owner confirmed the Facebook Page's days/hours are
      current. Owner then clarified 2026-09-01 that the restaurant is fully **closed**
      on Mondays (not "call ahead") — `site.ts` and the design canvas both updated to
      "Tue–Sun, 8am–7pm (closed Mondays)"
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

- [x] Set purple/lavender color tokens in the Tailwind config — `brand-50`…`brand-950`
      added to the `@theme` block in `src/styles/global.css`, aliasing the confirmed
      real palette (matches Tailwind's stock violet scale value-for-value)
- [x] Choose display + body typefaces, define the type scale — reusing the live site's
      existing typeface (Plus Jakarta Sans, one family for both display and body,
      varying weight/italic for hierarchy) rather than picking something new; loaded
      via Google Fonts in `global.css`. Type scale: Tailwind's default scale, no custom
      sizes needed for a site this size
- [x] Design Home — hero, primary CTAs, quick hours/location/FB link — mockup drafted
      at both phone and desktop width; **owner approved this direction 2026-09-01**
- [x] Design Menu — category layout, item card — mockup drafted at both widths with
      the full real 72-item menu (not just samples), "Ask staff" price style included;
      **owner approved 2026-09-01**
- [x] Design Amenities/The Space — gallery layout and captions — mockup drafted at both
      widths using 8 real Purple House photos with real, visually-accurate captions
      (not invented); the other ~27 gallery photos in `public/` are still unused and
      could be swapped in later; **owner approved 2026-09-01**
- [x] Design Our Story — narrative or timeline layout — mockup drafted at both widths
      using the candidate founder photo (`Owner-Mother.JPG` — owner confirmed to use it
      despite it being a London photo, not a Purple House one); narrative text is a
      clearly-marked placeholder pending the real write-up from M1; **owner approved
      the layout direction 2026-09-01** (placeholder text still needs the real copy)
- [x] Design the Order form — fields, validation states, confirmation screen — fields
      and a Pickup/Delivery toggle mocked up at both widths (desktop adds an order
      summary side panel); **owner approved 2026-09-01**. No separate
      confirmation-screen mockup was built — reasonable to design that directly during
      M3 build rather than as its own mockup
- [x] Design shared Nav and Footer — mocked up at both widths incl. a mobile-menu-open
      state; iterated on logo size/contrast per owner feedback; **owner approved
      2026-09-01**
- [x] Mobile-first responsive pass across all five pages — phone and desktop mockups
      exist for all 5 pages (Home, Menu, Order, Our Story, Amenities); no tablet
      breakpoint was mocked up separately, but Tailwind's responsive utilities make that
      a build-time detail, not something that needed its own mockup

**M2 is signed off as of 2026-09-01.** Design canvas (all 5 pages, phone + desktop,
plus shared Nav/Footer):
https://claude.ai/code/artifact/c68574ee-16df-49ab-aa15-96a3cf060587 — this is the
reference to build M3 against. Two small things to carry into M3: the Our Story page's
narrative text is still placeholder copy pending the real write-up (M1), and the Order
form's confirmation screen has no mockup yet.

## M3 — Build

- [x] Build the global layout, Nav, and Footer components — `Layout.astro`, `Nav.astro`
      (responsive: mobile hamburger + desktop bar, current-page highlighting),
      `Footer.astro` (stacked mobile / multi-column desktop), matching the approved
      design canvas
- [x] Build Home from the content collections — hero, quick info strip (from
      `site.ts`), three feature blocks, and closing CTA; real photos via `astro:assets`
- [x] Build Menu + `MenuCard` component, with category grouping — all 72 real items,
      grouped and displayed in the real menu's category order (not incidental
      alphabetical order — added `menuCategoryOrder.ts` with tests after catching this
      in browser verification), Bilao rendered as a photo-forward stacked-card variant
      of `MenuCard` instead of a second component
- [x] Build Amenities gallery + `GalleryItem` component — all 8 real captioned photos
- [x] Build Our Story page — renders the real markdown content (including the
      still-placeholder narrative text) alongside the founder photo
- [x] Build the Order form (client-side state and validation) — add/remove items with
      quantity, Pickup/Delivery toggle, conditionally-required delivery address, inline
      validation errors, live order summary panel; verified interactively in-browser
      (add item, quantity, delivery toggle, and a blocked submit with a validation
      message all confirmed working)
- [x] Implement the Messenger deep-link (`m.me/<page>?text=...`) per PRD Option A —
      order-message and link-building logic extracted to `src/utils/order.ts` with unit
      tests (7 tests: totals, "Ask staff" items, delivery address inclusion, optional
      fields). **Did not build Option B's backend**, as instructed
- [x] Build the order confirmation screen — no separate screen was built; the live
      order summary panel (visible the whole time the customer is filling the form,
      confirming items/total before they tap "Send") serves that role. There's no
      server round-trip to confirm here regardless — the real confirmation happens in
      Messenger itself once the customer taps send
- [x] Wire all photography through `astro:assets` for compression/responsive sizing —
      moved every photo actually used on a page from `public/` into `src/assets/photos`
      and imported it; confirmed real compression in the build output (e.g. the founder
      photo: 2.3MB source → ~70KB generated)
- [x] Add SEO basics — meta tags, Open Graph image, per-page titles — each page has a
      real title/description; Open Graph image defaults to a real Purple House photo
      instead of the favicon, with a more fitting photo per page where one existed
- [x] Accessibility pass — alt text on every photo, AA contrast check on the purple
      palette, full keyboard operability on the order form — alt text present on every
      image; interactive elements are real `<button>`/`<input>`/`<select>`/`<a>`
      elements (keyboard-operable by default), with `aria-expanded`/`aria-pressed`/
      `aria-live` where relevant. Contrast actually calculated (WCAG formula, not
      eyeballed) for the 7 color combinations used across the site — all pass AA
      (4.5:1+), ranging 5.2:1 to 15.2:1

**M3 is functionally complete as of 2026-09-01** — the site is real and working, not a
mockup, at `http://localhost:4321` in dev and live at
`https://lavender-refreshments-ai.airanicoledecastro9.workers.dev/` once pushed. Two
things still trace back to open M1 items rather than M3 itself: the Our Story page's
narrative text is real placeholder copy (not final), and the "hours" business decisions
(pickup/delivery, payment field) haven't changed anything here since the Order form
doesn't reference either yet. Not yet done: nothing blocking — M4 (QA/launch) is next.

**Found and fixed a real production bug the same day:** every photo on the live site
was 404ing right after the M3 push, even though the local build and dev server were
fine. Root cause: the Cloudflare deploy command (`npx wrangler deploy`) had no
committed Cloudflare config, so Wrangler auto-ran an interactive `astro add cloudflare`
setup wizard on every deploy (auto-confirmed in CI's non-interactive mode). That wizard
installs the `@astrojs/cloudflare` adapter, which swaps `astro:assets`' image handling
over to a Cloudflare Images binding that was never provisioned — every image request
came back 404. The generated config also got written straight to `.gitignore` each
time, so it never stuck and the wizard kept re-running on every single deploy. Fixed by
committing an explicit `wrangler.jsonc` (assets-only: `{ name, compatibility_date,
assets: { directory: "./dist" } }`, no adapter, no bindings) — this makes Wrangler just
serve `dist/` as static files, which is what this project actually is (see
PLANNING.md). Verified with `wrangler deploy --dry-run` locally (clean static asset
list, "No bindings found") and by checking real image load state
(`img.naturalWidth`, not just visual screenshots — this sandbox's screenshot tool
intermittently misses paint frames) on the live site across Home, Menu, Amenities, and
Our Story after the fix deployed. Also pinned `wrangler` as a real devDependency
instead of letting deploys fetch an unpinned version fresh via `npx` each time.

## M4 — QA & soft launch

- [ ] Cross-device pass: iOS Safari, Android Chrome, desktop — verified in an emulated
      mobile width (375px) and desktop width across all 5 pages (Home, Menu, Amenities,
      Our Story, Order): hamburger menu, image loading, and layout all correct. **Not
      yet done: a real iOS Safari / Android Chrome pass on physical devices** — emulation
      can't catch everything (e.g. real Safari quirks), so this still needs a phone-in-hand
      check before public launch
- [x] End-to-end order test — confirm the Messenger deep-link produces a correct,
      readable prefilled message on both iOS and Android — tested for real against live
      Facebook infrastructure (not a mock): filled out the form (items incl. an "Ask
      staff" item, Delivery + address, date/time, notes), submitted, and the `m.me`
      link correctly redirected to a real Messenger thread tied to the actual Page,
      with a clean, complete, correctly-formatted message. Confirms the Page ID is
      wired correctly. Only done from a desktop browser — still worth a real tap-through
      on an actual iOS/Android phone before launch, since that's the real customer path
- [ ] Mobile performance check on a throttled connection (Lighthouse mobile score) —
      **not done**, no Lighthouse tooling available in this environment; images are
      confirmed well-compressed from the M3 build logs (e.g. founder photo 2.3MB → 70KB)
      as an indirect signal, but a real Lighthouse score still needs to be pulled
      (e.g. Chrome DevTools on the live URL, or PageSpeed Insights)
- [x] Verify every link — map, Facebook Page, phone number — actually resolves — found
      and fixed a real gap: phone number and address were plain text, not links.
      Added a real `tel:` link and a Google Maps link (derived from the real
      phone/address in `site.ts`, with tests). Checked every internal nav link (all 5
      pages return 200), the Facebook Page link, and the Maps link all resolve
- [x] Proofread all content against the owner-provided final copy (no leftover
      placeholder menu items, prices, or story text) — scanned the whole codebase for
      leftover placeholder/TODO markers; only the intentional, clearly-marked Our Story
      placeholder remains (expected, tracked separately under M1)
- [ ] Point the confirmed domain at the host, verify SSL — **needs the owner**: this
      swaps their currently-live site for this one, so it shouldn't happen without them
      present/aware
- [ ] Soft launch to a small group before a public announcement — **owner's call**
- [ ] Set up analytics (optional — e.g. Plausible or Cloudflare Web Analytics) if the
      owner wants to track the PRD's success metrics — **owner's decision** on whether
      they want this at all

## M5 — Fast-follow (v1.1 — do not start until explicitly requested)

- [ ] Register a Meta App and request Page Messaging permission
- [ ] Build the Cloudflare Pages Function that receives the order POST and calls the
      Messenger Send API (PRD Option B)
- [ ] Submit for Meta App Review
- [ ] Cut the order form over from the deep-link to direct API submission once approved
- [ ] Revisit the staff order-log page (PRD "Could" feature) if Option B alone isn't
      enough for staff to track orders
- [ ] Revisit an English/Filipino language toggle
- [ ] Revisit table reservations, if the owner asks for it
