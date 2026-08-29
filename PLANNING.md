# Lavender Refreshments — Planning

Companion to [CLAUDE.md](CLAUDE.md) (scope, conventions, guardrails). This file covers
the shape of the build: vision, architecture, stack, and tools. Stack choices below are
a recommendation sized to the project — a five-page, mostly-static restaurant site run
by a non-technical owner — not a constraint the user has locked in. Confirm before
switching frameworks wholesale, but don't treat "TBD" as a reason to stall on setup.

## Vision

A restaurant that already draws people in on reputation and a landmark building
deserves a front door that loads fast on a mid-tier phone, makes the Purple House and
its story the visual centerpiece, and turns "what's on the menu" and "how do I order"
into a two-tap answer instead of a Messenger back-and-forth. The site's job is to get
someone from curious to a Facebook order sent — nothing more, nothing less. It is not
trying to become a booking platform, a POS, or a payments product.

## Architecture

Static-first, JAMstack-shaped. No database, no server-rendered app, no persistent
backend in v1 — the order flow is Option A from the PRD (Messenger deep-link), which is
pure client-side.

```
Content (menu, story, amenities, hours)
        │  git-committed markdown/YAML/JSON
        ▼
  Astro build (SSG)
        │  produces static HTML/CSS + minimal JS islands
        ▼
   CDN hosting (Netlify)
        │
        ▼
     Visitor's phone
        │  fills Order form (client-side only)
        ▼
  m.me/<page> deep-link, prefilled message
        │
        ▼
   Facebook Page inbox (fulfillment happens here, not in the app)
```

If the order flow later moves to PRD Option B (Messenger Send API), that adds exactly
one serverless function (Netlify Functions) that receives the form POST and calls the
Messenger Platform API — everything else in this diagram is unchanged. Don't build that
function until the user asks for it; see [CLAUDE.md](CLAUDE.md).

### Proposed structure

Nothing below exists yet — this is the shape to build toward, not a description of
current code.

```
src/
  content/
    menu.yaml         # categories → items → { name, description, price, photo }
    amenities.yaml     # { title, photo, caption }[]
    story.md            # founder narrative, frontmatter for photos
    site.yaml           # hours, address, phone, FB page URL/handle
  components/           # Nav, Footer, MenuCard, GalleryItem, OrderForm, ...
  layouts/
  pages/
    index.astro          # Home
    menu.astro
    amenities.astro
    story.astro
    order.astro
public/
  images/                # source photos, optimized at build time via astro:assets
```

Content lives in version-controlled files so changes are reviewable, not in a database —
appropriate for update frequency this low, and keeps hosting free-tier-friendly.

## Technology stack

| Layer                      | Choice                                                                       | Why                                                                                                                                                            |
| -------------------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework                  | **Astro**                                                                    | Ships near-zero JS by default, ideal for a content-heavy site with one small interactive form; ties directly to the mobile-perf non-functional bar in the PRD. |
| Styling                    | **Tailwind CSS**                                                             | Fast to hand-build a purple/lavender design system as tokens (config theme), no component-library look to fight against.                                       |
| Content                    | **Markdown/YAML files via Astro content collections**                        | No CMS server to run; menu/story/amenities edits are just file edits. Owner-editing story below.                                                               |
| Images                     | **astro:assets** built-in pipeline                                           | Automatic resizing/compression — load speed on mid-tier connections was called out explicitly as a non-functional requirement.                                 |
| Order flow (v1)            | **Client-side only** — builds an `m.me/<page>?text=...` link from form input | Matches PRD Option A: no backend, no Meta App Review needed to ship.                                                                                           |
| Order flow (v1.1, not yet) | **Netlify Functions + Messenger Send API**                                   | Only once Option B is explicitly requested; needs a Meta App and Page Messaging permission.                                                                    |
| Hosting                    | **Netlify**                                                                  | Free tier covers this site's traffic, git-push-to-deploy, and (if adopted) pairs natively with Netlify Identity + Git Gateway for owner content editing.       |
| Version control            | **Git / GitHub**                                                             | Repo already exists: `AiraDeCastro/Lavender-Refreshments-AI`.                                                                                                  |

### Owner content-editing — open decision

The PRD flags "who edits menu/prices" as unresolved. Two reasonable paths once that's
answered:

- **Git-only editing** — owner (or whoever helps them) edits the YAML/Markdown files
  directly and pushes. Zero extra tooling, but requires someone comfortable with git.
- **Decap CMS** (git-backed, free, no database) — gives a simple form UI over the same
  content files, deployable alongside Netlify Identity + Git Gateway with no separate
  backend to run. Worth adding only if the owner will actually be the one editing
  content day-to-day.

Default to git-only for the v1 build; don't add Decap CMS until the user asks for it.

## Required tools

**Core development**

- Node.js (LTS) + a package manager (npm or pnpm)
- Astro CLI (`npm create astro@latest`)
- Tailwind CSS
- Git + a GitHub account (repo already set up)

**Hosting & deployment**

- Netlify account (or equivalent static host, if the user prefers Vercel/Cloudflare
  Pages — swap freely, nothing above is Netlify-specific except the optional Decap CMS
  pairing)
- A domain name — still an open question per [CLAUDE.md](CLAUDE.md)

**Content & assets**

- Real photography of the Purple House, the menu, and the founders — no stock/placeholder
  images in the final build
- An image compressor/optimizer is unnecessary as a separate tool since astro:assets
  handles it at build time

**Facebook integration**

- Facebook Page for Lavender Refreshments (handle/URL still unconfirmed) — required even
  for v1's simple deep-link
- Meta for Developers account + a Meta App with Page Messaging permission — **only**
  needed if/when the project moves to PRD Option B; not required for v1

**Optional, not required for v1**

- Decap CMS + Netlify Identity, if owner-direct editing is wanted
- A privacy-friendly analytics tool (e.g. Plausible or Cloudflare Web Analytics) to
  track the success metrics from the PRD (menu engagement, order-form completion)
