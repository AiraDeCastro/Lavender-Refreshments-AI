# Lavender Refreshments — Project Guide

Web app for **Lavender Refreshments**, a Filipino restaurant inside the Purple House, a
known landmark in Culasi, Ajuy, Iloilo, Philippines. Full requirements live in the PRD
(published artifact, ask the user if the link is needed — it is not in this repo).

Nothing below is a description of a finished product — treat it as the spec to build
against. See "Session log" at the bottom for what's actually been done so far.

## Session workflow

- **Always read [PLANNING.md](PLANNING.md) at the start of every new conversation** —
  it has the architecture, stack, and required tools this project is building against.
- **Check [TASKS.md](TASKS.md) before starting work** to see what milestone is active
  and what's already done, so work doesn't duplicate or jump ahead of its milestone.
- **Mark completed tasks in TASKS.md immediately** after finishing them — don't batch
  updates for the end of a session.
- **Add newly discovered tasks to TASKS.md when found** — file them under the milestone
  they belong to (add a new milestone only if none fit).

## What this app is

A brand-and-ordering front door, **not** a full commerce platform. Facebook stays the
place orders are actually fulfilled and confirmed. Five pages:

- **Home** — hero (Purple House photo, name, tagline), CTAs to Menu and Order, quick
  hours/location/Facebook link.
- **Menu** — items grouped by category, name + short description + price in ₱, photo
  where available. No cart or payment logic.
- **Amenities / The Space** — gallery of the physical Purple House space (seating,
  indoor/outdoor, parking). Captions, not long copy.
- **Our Story** — founder narrative: who started it, why the Purple House, what the
  name means. Photo-driven.
- **Order** — form (name, contact, items + quantities from the menu, pickup/delivery,
  date/time, notes, delivery address if applicable) that hands the order to the
  restaurant's Facebook Page. See "Order → Facebook" below — this is the one piece with
  real technical decisions, everything else is static content.

## Explicitly out of scope for v1

Do not build these unless the user asks for them by name — they were deliberately cut:

- Online payment processing
- Live order status / order-management dashboard
- Table reservations
- User accounts or login
- Full English/Filipino language toggle (candidate for v1.1, not v1)

## Order → Facebook: the key technical decision

Three options were scoped; **default to Option A** unless the user has said otherwise:

- **A — Messenger deep-link (default for v1).** Form composes a readable order summary
  and deep-links to `m.me/<page>` with the message pre-filled; customer taps send
  themselves. No backend, no Meta App Review. Build this first.
- **B — Messenger Send API (fast-follow, not v1).** A backend posts the order directly
  into the Page inbox via the Messenger Platform API. Requires a Meta App with Page
  Messaging permission and App Review — don't start this without the user explicitly
  asking for it, since it has real approval-timeline risk.
- **C — Notify staff directly, bypassing Facebook.** Only relevant if paired with B or
  if the user changes direction away from Facebook as the fulfillment channel.

## Design direction

- Purple/lavender-led, clean and minimal — whitespace and photography carry the
  warmth, not decorative elements.
- Mobile-first: most traffic is expected to arrive via Facebook referral on phones.
- Imagery-first on Home, Amenities, and Story — the Purple House itself is a visual
  draw, so real photography (never placeholder/stock-looking images) matters more here
  than on a typical brochure site.
- No official brand hex codes or logo are confirmed yet — ask before hardcoding a
  specific purple as "the" brand color if it matters for the task at hand.
- Copy can mix English with Filipino/Hiligaynon naturally — don't force everything into
  one language.

## Content dependencies

Menu items/prices, Purple House photography, the founder's story, and logo/brand assets
are real content that has to come from the restaurant owner — never invent placeholder
menu items, prices, or founder details and leave them in place as if final. It's fine to
scaffold pages with clearly-marked placeholder content while real content is pending.

## Open decisions (confirm with the user before building around them)

- Pickup only vs. delivery too, and delivery area/fee if so
- Payment handling: cash only, or a GCash/e-wallet reference field on the order form

Resolved: existing brand assets confirmed (logo + purple/lavender palette already live
at lavenderrefreshments.com, see TASKS.md M1). Domain/hosting resolved: Cloudflare
Pages, domain `lavenderrefreshments.com` already registered and live on the owner's
Cloudflare account. Facebook Page confirmed:
https://www.facebook.com/profile.php?id=100076299965269 ("Lavender refreshment") — the
live site's only link was a Group, which can't receive `m.me` deep links; the Page is
what the Option A order flow will use. Full menu (72 items) confirmed and loaded, see
TASKS.md M1.

## Astro dev workflow

- Start the dev server in background mode: `astro dev --background`. Manage it with
  `astro dev stop`, `astro dev status`, and `astro dev logs`.
- Consult these before working on related tasks: [routing](https://docs.astro.build/en/guides/routing/),
  [Astro components](https://docs.astro.build/en/basics/astro-components/),
  [framework components](https://docs.astro.build/en/guides/framework-components/) (React/Vue/Svelte),
  [content collections](https://docs.astro.build/en/guides/content-collections/),
  [styling/Tailwind](https://docs.astro.build/en/guides/styling/),
  [i18n](https://docs.astro.build/en/guides/internationalization/).

## Commit & testing standards

- **Every commit must pass a pre-commit gate** (`.husky/pre-commit`, runs automatically
  via git — don't bypass with `--no-verify`): lint (`npm run lint`), tests (`npm test`),
  a full build (`npm run build`), a dependency-tree check (`npm ls`), and a security
  audit (`npm audit --audit-level=high`). If any step fails, fix the underlying issue —
  don't loosen the gate to get past it.
- **Write tests for real logic as you add it.** Tests live in `tests/`, run with
  [Vitest](https://vitest.dev). Content-collection schemas live in
  `src/content/schemas.ts` as plain Zod schemas (not inline in `src/content.config.ts`)
  specifically so they're importable in tests without Astro's build pipeline — follow
  that pattern for other logic that deserves unit coverage. Don't write tests against
  static markup/JSX with no logic in it.
- **Commit messages must follow [Conventional Commits](https://www.conventionalcommits.org)**
  (`type(scope): summary` — enforced by commitlint via `.husky/commit-msg`). Common
  types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`.

## Astro dev workflow

- Fast on mid-tier mobile connections — compress images, avoid heavy frameworks the
  content doesn't need.
- AA contrast on the purple palette; alt text on all photos; order form fully
  keyboard-operable.
- Home/Menu/Amenities/Story are effectively static content — favor a static-friendly
  hosting approach over one that requires a persistent backend, except for whatever the
  chosen order-flow option (above) actually needs.

## Session log

Running record of what's actually been done, oldest first — update this when a session
completes meaningful work, don't rewrite history in it.

- **2026-08-29** — Repo cloned locally; git configured with project credentials. PRD
  drafted and published as an artifact; [CLAUDE.md](CLAUDE.md),
  [PLANNING.md](PLANNING.md), and [TASKS.md](TASKS.md) written from it. M0 underway:
  Node.js LTS installed, Astro project scaffolded (minimal template), Tailwind CSS v4
  wired in via `@tailwindcss/vite` and verified (`npm run build` succeeds, output CSS
  carries Tailwind's preflight reset, dev server renders with no console errors).
  Content-collection schemas defined (`src/content.config.ts` + `src/content/schemas.ts`,
  one placeholder entry per collection) and Prettier/ESLint set up — all verified with a
  real build. Before the first push: added a Vitest suite (`tests/`, 8 tests against the
  schemas and site settings), a pre-commit gate (`.husky/pre-commit` — lint, tests,
  build, `npm ls`, `npm audit --audit-level=high`) verified to both pass cleanly and
  actually block a broken commit, and Conventional Commits enforcement via commitlint
  (`.husky/commit-msg`). No page content, layout, or components built yet — still just
  the Astro starter's `index.astro`.
- **2026-08-30** — Repo cloned to a new machine, dependencies installed, dev server
  verified working. Hosting decision made: owner has Cloudflare (not Netlify), with
  `lavenderrefreshments.com` already registered and live there — PLANNING.md, TASKS.md,
  CLAUDE.md updated to reflect Cloudflare Pages as the host. Pulled real content from
  the live site for M1: hours, address, phone, email, existing logo, and the live
  purple/lavender palette (close to Tailwind's stock violet scale) — see TASKS.md M1.
  Flagged that the live site's only Facebook link is a Group, not a Page, which blocks
  the Option A order flow until resolved. Menu items/prices and the founder story still
  need to come from the owner; Purple House/food photography is being sent via chat.
  Owner then confirmed the real Facebook Page
  (facebook.com/profile.php?id=100076299965269) and supplied the full 72-item menu,
  now loaded into `src/content/menu.yaml` (schema extended to allow "Ask staff" pricing
  for Bilao/Beer items, with tests). Owner picked the Facebook Page's hours (Tue–Sun
  8am–7pm, call ahead Monday) as current over the website's conflicting Mon–Sun
  7:30am–6:30pm — `site.ts` updated. Owner added real photography directly to
  `public/`: 35 gallery photos, 7 food photos, 5 logo variants, the 7 Bilao photos
  referenced by the menu, and a candidate owner/founder photo — not yet sorted into
  `amenities.yaml` (needs captions, low priority). Owner connected the repo to
  Cloudflare Pages; verified live end-to-end at
  `https://lavender-refreshments-ai.airanicoledecastro9.workers.dev/` (a `workers.dev`
  address rather than `pages.dev`, same Pages product). **M0 is now fully complete.**
  Deliberately not pointing the real domain at this project yet — that's an M4 step,
  once there's real content to show. Pushed all of the above (commit `13dee5c`).
  Started M2: brand color tokens (`brand-50`…`brand-950`, aliasing the confirmed
  palette) and typography (Plus Jakarta Sans, reused from the live site) added to
  `src/styles/global.css`. Built mobile mockups for Home, Menu, Order, and a shared
  Nav/Footer as a design canvas for the owner to react to — see TASKS.md M2 for the
  link. Iterated with the owner on the canvas: fixed the nav/footer logo (was cropped
  and, once corrected, invisible against the dark footer — made a white version of the
  mark for that use instead of changing the footer's brand color), resized it down
  twice per feedback, and changed the footer's Facebook line to "Message Us on
  Facebook". Owner also supplied a true transparent-background logo file
  (`LR_Logo_Transparent.png`, added to `public/`) — pushed together with the design
  tokens (commit `7ac6058`). Amenities and Our Story pages not designed yet; no desktop
  layout considered yet either.
- **2026-08-31** — Continued the M2 design canvas from the same link. Expanded the Menu
  mockup from a handful of sample items to the full real 72-item menu (all 12
  categories, exact names/descriptions/prices from `menu.yaml`), and added all 7 real
  Bilao tray photos as a photo grid. Added an Our Story mockup with the candidate
  founder photo — owner confirmed using it even though it's a personal London photo,
  not one taken at the Purple House — with the narrative text left as clearly-marked
  `[Placeholder — ...]` boxes pending the real write-up from M1. Added an
  Amenities/Gallery mockup using 8 of the real gallery photos (aerial view, outdoor
  lounge, indoor dining, the neon sign at night, etc.) with real, visually-grounded
  captions, not invented ones — about 27 more gallery photos in `public/` remain
  unused. Built desktop-width (1440px) versions of all five pages plus the shared
  Nav/Footer, laid out as a second "Desktop" page on the same canvas next to the
  original "Mobile" one. Ran background content-accuracy checks against the real
  menu/photo data after each major addition (full menu, desktop set) — both came back
  clean, no invented content or broken references found. Pushed two documentation-only
  commits recording this progress in TASKS.md (`b5c2e48`, `658c752`); nothing else in
  the repo changed today since the design work itself lives on the canvas, not in git.
  **M2's full checklist (all 5 pages + Nav/Footer, both mobile and desktop) is now
  drafted, but not yet signed off by the owner as final** — that sign-off is the next
  step before M3 (Build).
- **2026-09-01** — Owner corrected the hours: the restaurant is fully closed on
  Mondays, not "call ahead" as previously recorded. `site.ts` and every mention in the
  design canvas (Home, Footer, both mobile and desktop) updated to "Tue–Sun, 8am–7pm
  (closed Mondays)" and pushed. Owner then approved the full M2 design direction (all 5
  pages + Nav/Footer, mobile and desktop) — M2 signed off.

  Started and finished M3 (Build) the same day: real Astro pages now exist for all five
  routes, replacing the starter placeholder. Layout/Nav/Footer built as shared
  components (Nav is a true responsive component — mobile hamburger and desktop bar in
  one, not two copies); Menu renders the real 72-item menu grouped by category (caught
  in browser testing that content-collection order isn't the YAML's source order, so
  added `menuCategoryOrder.ts` to sort by the real menu's category sequence, with
  tests); Amenities and Our Story render the real content added during M2. The Order
  page is fully interactive — add/remove items with quantity, a Pickup/Delivery toggle
  that conditionally requires a delivery address, live validation, and a live order
  summary — and implements the PRD's Option A Messenger deep-link with the
  message/link-building logic unit-tested in isolation (`src/utils/order.ts`, 7 tests).
  All photography actually used on a page was moved from `public/` into
  `src/assets/photos` and wired through `astro:assets` — real compression confirmed in
  the build output (founder photo: 2.3MB → ~70KB). Added basic SEO (per-page
  titles/descriptions, Open Graph image using a real photo instead of the favicon).
  Ran an actual WCAG contrast calculation (not eyeballed) on every color combination
  used on the site — all pass AA. Found and fixed a real gap along the way: ESLint's
  config never had a TypeScript parser wired up for `.astro` frontmatter, so
  `interface`/`typeof` usage was silently unparseable rather than linted — added
  `typescript-eslint` and pointed `eslint-plugin-astro` at it. Verified everything in
  the browser (desktop and mobile widths, the hamburger menu, and the order form's
  interactions) before committing. Pushed as a single commit (`2176e0b`) after the
  pre-commit gate passed for real. **M3 is functionally complete** — nothing blocking
  M4 next, though the Our Story text is still placeholder copy pending the real
  write-up from M1.

  Then found a real production bug by actually checking the live site (not just local
  dev) after a follow-up fix: every photo was 404ing live, despite working perfectly
  locally. Traced it to the Cloudflare deploy command itself — `npx wrangler deploy`
  with no committed Cloudflare config auto-triggers an interactive `astro add
  cloudflare` wizard (silently auto-confirmed in CI), which installs the
  `@astrojs/cloudflare` adapter and reroutes image handling through a Cloudflare Images
  binding that was never provisioned. The generated config got written straight to
  `.gitignore` each time, so this was silently re-happening on every deploy. Fixed with
  a committed `wrangler.jsonc` (static assets only, no adapter/bindings) and pinned
  `wrangler` as a real devDependency — confirmed with `wrangler deploy --dry-run`
  locally and by checking actual image load state on the live site page-by-page after
  redeploying. Diagnosed this collaboratively with the owner, who doesn't have
  terminal/CLI access — walked through the Cloudflare dashboard UI (deployments → build
  log → settings) step-by-step to get the log text needed to find the real cause,
  rather than guessing at fixes blind.

  Started M4 (QA): did a cross-device emulated pass (mobile + desktop) across all 5
  pages, and a real end-to-end order test — filled out the Order form and submitted it
  for real, confirming the `m.me` link redirects to an actual Messenger thread tied to
  the real Page. Link-checked the whole site and found a real gap: the phone number and
  address were plain unlinked text — added a real `tel:` link and a Google Maps link,
  both derived from `site.ts` so they can't drift from the real contact info, with
  tests. Proofread all content for leftover placeholders — clean except Our Story.

  Owner then provided the real founder write-up (the full story: growing up near
  Culasi Bridge, her grandmother's love of purple, her grandfather's injury and the
  promise it inspired, Purple House's 2015 founding and growth into a four-bedroom
  home with Airbnb rooms, the refreshments business, and a clothing shop) plus a new
  real photo of herself, replacing both the placeholder text and the earlier candidate
  London photo. Rewrote `story.astro`'s styling too — it was built for short boxed
  placeholder callouts (dashed borders, italic), which would have looked wrong for a
  full flowing narrative, so switched to normal long-form article typesetting.
  Verified the real story renders correctly on both mobile and desktop before
  committing. This closes the last open M1 content item and the M3/M4 notes that
  tracked it.
