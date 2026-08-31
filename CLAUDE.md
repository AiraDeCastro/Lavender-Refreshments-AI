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
  once there's real content to show.
