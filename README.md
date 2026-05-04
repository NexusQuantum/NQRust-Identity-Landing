# NQRust Identity — Landing Page

Marketing landing page for [NQRust Identity](https://nqrust.id) — a self-hosted identity & access management stack with an offline-first mobile authenticator and a one-command installer. Built for teams that need full control over identity, sessions, and audit trail.

> Production: deploys to Vercel. Hero shows a track-switchable video player with auto-next mode; per-feature USP sections embed dedicated screencasts.

---

## Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 16** (App Router, Turbopack, RSC) | `force-static` page, all routes prerendered |
| Runtime | **React 19** | |
| Language | **TypeScript 5** | strict mode |
| Styling | **TailwindCSS 4** + vanilla CSS tokens | Light theme with NQRust orange (`#FF6B1A`) |
| Fonts | Inter + JetBrains Mono | self-hosted via `next/font/google` |
| Icons | Custom inline SVG set | tree-shake friendly, see [`src/components/icons.tsx`](src/components/icons.tsx) |
| Package manager | **pnpm** 10+ | |
| Hosting | **Vercel** | |

No CMS — content is hardcoded in components. Add a CMS later if needed.

---

## Quick Start

```bash
pnpm install
pnpm dev      # http://localhost:3010
pnpm build    # production build
pnpm start    # serve production build
pnpm lint     # eslint
```

Requires Node.js 20+ and pnpm 10+.

---

## Project Structure

```
NQRust-Identity-Landing/
├── public/
│   ├── assets/
│   │   ├── nqr-logo.png            Logo used in nav, footer
│   │   └── tkdn.png                TKDN compliance badge
│   └── videos/
│       ├── v1-stack-overview.{mp4,jpg}    Solution / overview clip
│       ├── v2-mobile-auth.{mp4,jpg}       Mobile auth, vertical 9:19
│       ├── v3-portal-tour.{mp4,jpg}       Portal walkthrough
│       ├── v4-airgapped-install.{mp4,jpg} Terminal installer demo
│       └── README.md                       How to record / encode new videos
│
├── src/
│   ├── app/
│   │   ├── layout.tsx              Root layout, fonts, metadata
│   │   ├── page.tsx                Landing page — composes all sections
│   │   ├── globals.css             Design tokens, component styles
│   │   ├── opengraph-image.tsx     Dynamic 1200×630 OG image
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── nav.tsx                 Sticky header with brand & CTA
│   │   ├── icons.tsx               Stroke-icon set
│   │   ├── arch-diagram.tsx        Animated architecture SVG
│   │   ├── hero-video-player.tsx   Hero track-switcher (auto-next + manual)
│   │   ├── short-video.tsx         Inline video for USP sections
│   │   ├── sections.tsx            Hero, Features, Architecture, Downloads, FAQ, Footer
│   │   └── new-sections.tsx        Trust bar, Problem, Solution, USPs, Comparison, Use cases, Final CTA
│   └── lib/
│       └── constants.ts            Site URLs, download links, video flags, WhatsApp template
│
├── tools/
│   ├── encode-video.ps1            Encode raw video → H.264 mp4 + JPG poster (PowerShell)
│   └── encode-video.sh             Same, for bash / macOS / WSL
│
├── CLAUDE.md                       Coding guidelines (Karpathy)
├── README.md                       This file
├── next.config.ts
├── tsconfig.json
├── package.json
└── pnpm-lock.yaml
```

---

## Page Funnel

The page is a 15-section conversion funnel built around the primary CTA: **Download Installer**.

1. **Hero** — dual CTA, hero video player with track switcher
2. **Trust Bar** — strategic-institution proof (BIN)
3. **Problem** — five pain points enterprise IT teams face
4. **Solution** — 4-in-one stack (Identity Server, Portal, Mobile Auth, Installer)
5. **USP #1: Mobile Auth** — branded authenticator, comparison vs third-party (with vertical 9:19 video)
6. **USP #2: Portal** — custom-branded user & admin portal (16:9 laptop frame)
7. **USP #3: Self-Hosted & Airgapped** — full data control, zero outbound (16:9 terminal frame)
8. **USP #4: Made in Indonesia · TKDN** — local product, government/SOE-ready
9. **Architecture** — animated SVG diagram, OIDC/SAML flows
10. **Security Overview** — encryption, access control, audit (3 columns)
11. **Comparison** — NQRust vs foreign cloud IAM
12. **Use Cases** — 6 industries (gov, banking, defense, healthcare, manufacturing, education)
13. **FAQ** — 6 objection handlers
14. **Final CTA** — dual card (Download Installer / Contact Sales)
15. **Docs Banner + Footer** — secondary CTA + standard footer

See [`src/app/page.tsx`](src/app/page.tsx) for composition order.

---

## Hero Video Player

The hero shows one of four feature clips at a time. Behavior:

- **Auto-next (default)**: plays V1 → V2 → V3 → V4, advances on `ended`, loops back.
- **Manual**: user clicks any track chip → that track loops, no auto-advance.

Mode badge top-right: orange "AUTO" with pulsing dot, or dark "MANUAL".

Implementation: [`src/components/hero-video-player.tsx`](src/components/hero-video-player.tsx).

---

## Video Pipeline

All videos are served as **H.264 baseline-profile MP4** — single format, no WebM/AV1 fallback. Universal mobile compatibility prioritized over file-size optimization (AV1 support is still patchy on mobile: Chrome Android < 113 and iOS Safari < 17.4 can't decode it).

| Track | Final MP4 |
|---|---|
| V1 Stack Overview | 176 KB |
| V2 Mobile Auth | 455 KB |
| V3 Portal Tour | 1.1 MB |
| V4 Airgapped Install | 559 KB |

**Browser support**: every Android (since 4.0), every iOS (since 6), every desktop browser. Hardware decoded by virtually every mobile chip.

### Recording new clips

Spec lives in [`public/videos/README.md`](public/videos/README.md). Workflow:

1. Record raw screencast with any tool (OBS, ScreenToGif, Vegas Pro export, etc.)
2. Encode using the helper:
   ```powershell
   # PowerShell (Windows)
   .\tools\encode-video.ps1 -Source "C:\path\raw.mp4" -Name "v1-stack-overview"
   ```
   ```bash
   # bash / WSL / macOS
   ./tools/encode-video.sh /path/raw.mp4 v1-stack-overview
   ```
3. Output drops in `public/videos/` as `.mp4` + `.jpg` poster.
4. Flip the matching key in [`src/lib/constants.ts`](src/lib/constants.ts) to `true`:
   ```ts
   export const VIDEOS_AVAILABLE = {
     "v1-stack-overview": true,
     // ...
   };
   ```

The page picks up new files automatically — no other code changes needed.

---

## Design Tokens

Defined in [`src/app/globals.css`](src/app/globals.css) under `@theme`. Brand identity:

| Token | Value | Use |
|---|---|---|
| `--color-primary` | `#FF6B1A` | CTAs, accents |
| `--color-primary-hover` | `#E55A0F` | Hover state |
| `--color-primary-soft` | `#FFF1E6` | Tinted backgrounds, badges |
| `--color-primary-strong` | `#C84A0A` | Eyebrow text, headings emphasis |
| `--color-bg` | `#FFFFFF` | Page background |
| `--color-bg-alt` | `#FAFAFB` | Alt section background |
| `--color-text` | `#0B0B0F` | Body text |
| `--color-text-muted` | `#6B6B76` | Secondary text |
| `--radius-lg` | 16px | Cards, large surfaces |

Light theme only. No dark mode toggle.

---

## SEO

- Static HTML pre-render via `force-static`
- JSON-LD `SoftwareApplication` schema in `page.tsx`
- Dynamic OpenGraph image (Edge runtime) at `/opengraph-image`
- `robots.txt` + `sitemap.xml` auto-generated

OG image renders the brand orange gradient, headline, and trust badges. Tweak in [`src/app/opengraph-image.tsx`](src/app/opengraph-image.tsx).

---

## Configuration Constants

All external URLs and toggles live in [`src/lib/constants.ts`](src/lib/constants.ts):

- `SITE` — name, tagline, canonical URL
- `DOWNLOADS` — installer & APK URLs (currently Google Drive + GitHub Releases)
- `LINKS` — docs, GitHub, sales WhatsApp number
- `VIDEOS_AVAILABLE` — per-video boolean to skip 404s before files land
- `WA_URL` — pre-filled WhatsApp template for sales contact

Update there, not in components.

---

## Deployment

Connected to Vercel via GitHub. Push to `main` triggers production deploy; PRs get preview URLs.

Build settings:
- **Build command**: `pnpm build`
- **Output directory**: `.next` (default)
- **Install command**: `pnpm install`
- **Node version**: 20.x
- **Environment variables**: none required for MVP

Custom domain configured in Vercel dashboard.

---

## Development Notes

### Coding style

[`CLAUDE.md`](CLAUDE.md) holds Karpathy-style behavioral guidelines for any AI agent working on this repo: surgical changes, simplicity, clear success criteria. Worth reading before large refactors.

### Path aliases

`@/*` maps to `src/*`. Use it for imports:

```ts
import { SITE } from "@/lib/constants";
import { Nav } from "@/components/nav";
```

### Component conventions

- Section components live in `sections.tsx` (existing) or `new-sections.tsx` (added during the funnel restructure). Either is fine for new sections; consider merging if either gets unwieldy.
- All sections export named components (no defaults).
- `"use client"` only where event handlers, refs, or hooks are required (FAQ accordion, video player). Default to RSC.

### Adding a new section

1. Write the component in `new-sections.tsx`.
2. Import & place it in `src/app/page.tsx` at the desired funnel position.
3. Add styles to `globals.css` if needed (prefix new classes per existing convention).
4. Run `pnpm build` to verify static generation still works.

---

## License

Proprietary — © NexusQuantum. Not for redistribution.
