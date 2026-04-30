# Video Assets

Drop the recorded videos here. Components reference them by these exact file names.

## File Layout

| Track | File names needed | Format | Duration | Notes |
|---|---|---|---|---|
| V1 | `v1-stack-overview.{webm,mp4,jpg}` | 1280×720 16:9 | 8-10s | Stack overview — 4 components |
| V2 | `v2-mobile-auth.{webm,mp4,jpg}` | 720×1280 9:16 vertical | 10-12s | Phone screencast — PIN, TOTP, QR, backup |
| V3 | `v3-portal-tour.{webm,mp4,jpg}` | 1280×720 16:9 | 12-15s | Portal walkthrough |
| V4 | `v4-airgapped-install.{webm,mp4,jpg}` | 1280×720 16:9 | 10-12s | Terminal installer demo |

The `.svg` files in this folder are **placeholders** that show until real videos are dropped. Don't delete them — useful as branded fallback if a video file is ever missing.

## Encoding Recipe (Best for Web)

Use the helper script in [`tools/`](../../tools/):

**Bash / WSL / macOS:**
```bash
./tools/encode-video.sh path/to/raw-recording.mov v1-stack-overview 1280
```

**PowerShell (Windows):**
```powershell
.\tools\encode-video.ps1 -Source "C:\path\to\raw.mov" -Name "v1-stack-overview" -Width 1280
```

This produces 3 files automatically:
- `<name>.webm` — AV1 codec (smallest, modern browsers)
- `<name>.mp4` — H.264 fallback (Safari, older browsers)
- `<name>.jpg` — first-frame poster

## Manual Encoding (without script)

```bash
# AV1 webm — smallest
ffmpeg -i raw.mov \
  -vf "scale=1280:-2:flags=lanczos" \
  -c:v libsvtav1 -crf 35 -preset 6 -g 60 \
  -an -movflags +faststart \
  v1-stack-overview.webm

# H.264 mp4 — fallback
ffmpeg -i raw.mov \
  -vf "scale=1280:-2:flags=lanczos" \
  -c:v libx264 -crf 24 -preset slow -profile:v main -pix_fmt yuv420p \
  -an -movflags +faststart \
  v1-stack-overview.mp4

# Poster
ffmpeg -i raw.mov -vf "scale=1280:-2,select=eq(n\,0)" -frames:v 1 v1-stack-overview.jpg
```

## Encoding Targets

| Setting | Value | Why |
|---|---|---|
| Resolution | 1280×720 max | Hero player < 720px wide on desktop, so no benefit going higher |
| Bitrate | 800-1200 kbps (AV1) / 1500-2000 kbps (H.264) | Mute screencasts compress easily |
| Frame rate | 30 fps | UI animations don't need 60fps |
| Audio | None (`-an`) | All videos are mute by spec |
| `movflags +faststart` | Always | Lets browser start playback before full download |
| Target file size | < 2 MB per video | Loads instantly even on slow connections |

## Activate Videos in the Page

After dropping files, flip the flag in [`src/lib/constants.ts`](../../src/lib/constants.ts):

```ts
export const VIDEOS_AVAILABLE = {
  "v1-stack-overview": true,   // ← was false
  "v2-mobile-auth": false,
  "v3-portal-tour": false,
  "v4-airgapped-install": false,
};
```

The page picks up the change automatically — no other code edits needed.

## Why This Approach

1. **AV1 + H.264 dual format** — best compression on modern browsers, universal fallback.
2. **No audio track** — saves bytes, matches spec.
3. **`preload="metadata"`** — browser only fetches headers, not full video, until user interacts.
4. **`IntersectionObserver` lazy load** — videos below the fold don't even start loading until scrolled near.
5. **Per-video flags** — partial rollout (release V1 first, V2-V4 later) without touching code.
6. **SVG placeholders** — visible identity per slot during development; users see something branded instead of empty boxes.

## Hosting

Vercel serves `/public/videos/*` from its CDN automatically with proper `Cache-Control: public, max-age=31536000, immutable` headers. No additional setup needed.

If individual videos exceed ~5 MB, consider moving them to:
- Cloudflare R2 + Cloudflare CDN (free 10 GB egress/month)
- Mux or Cloudflare Stream (HLS streaming)

For 8-15 second mute screencasts at < 2 MB each, **Vercel static is fine.**
