# Video Assets

Drop the recorded videos here. Components reference them by these exact file names.

## File Layout

| Track | File names needed | Format | Duration | Notes |
|---|---|---|---|---|
| V1 | `v1-stack-overview.{mp4,jpg}` | 1280×720 16:9 | 8-10s | Stack overview (also rendered as live SVG in hero) |
| V2 | `v2-mobile-auth.{mp4,jpg}` | 720×1564 vertical | 10-12s | Phone screencast — PIN, TOTP, QR, backup |
| V3 | `v3-portal-tour.{mp4,jpg}` | 1280×720 16:9 | 12-15s | Portal walkthrough |
| V4 | `v4-airgapped-install.{mp4,jpg}` | 1280×720 16:9 | 10-12s | Terminal installer demo |

## Codec Choice: H.264 MP4 only

We ship **MP4 (H.264 baseline)** without WebM/AV1 fallback. Why:

- **Universal mobile support** — H.264 works on every Android (since 4.0) and iOS (since 6) without exception. AV1 only works on Android Chrome 113+, iOS Safari 17.4+, which is too narrow for a public marketing site.
- **Hardware decode everywhere** — every modern mobile chip has H.264 decoder; few have AV1.
- **One source = simpler `<video>` markup** and zero browser-pick ambiguity.
- File size penalty (~3-5x larger than AV1) is acceptable for clips < 10s and durations < 15s.

## Encoding Recipe

Use the helper script in [`tools/`](../../tools/):

**PowerShell (Windows):**
```powershell
.\tools\encode-video.ps1 -Source "C:\path\to\raw.mov" -Name "v1-stack-overview" -Width 1280
```

**Bash / macOS / WSL:**
```bash
./tools/encode-video.sh path/to/raw-recording.mov v1-stack-overview 1280
```

This produces 2 files:
- `<name>.mp4` — H.264 baseline, web-optimized (`+faststart`)
- `<name>.jpg` — first-frame poster

## Manual Encoding

```bash
# H.264 mp4 — universal compatibility
ffmpeg -i raw.mov \
  -vf "scale=1280:-2:flags=lanczos" \
  -c:v libx264 -profile:v baseline -level 3.0 -preset medium -crf 23 \
  -pix_fmt yuv420p \
  -an -movflags +faststart \
  v1-stack-overview.mp4

# Poster (first frame)
ffmpeg -i raw.mov -vf "scale=1280:-2,select=eq(n\,0)" -frames:v 1 v1-stack-overview.jpg
```

## Encoding Targets

| Setting | Value | Why |
|---|---|---|
| Resolution | 1280×720 max (16:9), 720×1280 max (9:16) | Player widths under 720px on desktop — no benefit going higher |
| Codec | H.264 baseline profile, level 3.0 | Universal mobile decode |
| CRF | 23 | Good quality at reasonable size |
| Pixel format | yuv420p | Required by old iOS Safari |
| Audio | None (`-an`) | All videos are muted by spec |
| `+faststart` | Always | MOOV atom moved to start so browser plays before full download |
| Target file size | < 2 MB per video where possible | Loads quickly even on slow connections |

## Activate Videos in the Page

After dropping files, flip the flag in [`src/lib/constants.ts`](../../src/lib/constants.ts):

```ts
export const VIDEOS_AVAILABLE = {
  "v1-stack-overview": true,
  "v2-mobile-auth": true,
  "v3-portal-tour": true,
  "v4-airgapped-install": true,
};
```

The page picks up the change automatically — no other code edits needed.

## Hosting

Vercel serves `/public/videos/*` from its CDN automatically with `Cache-Control` headers. No additional setup needed.

For files larger than ~5 MB, consider Cloudflare R2 + CDN (free 10 GB egress/month) or Mux Stream.
