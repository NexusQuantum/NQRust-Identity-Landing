#!/usr/bin/env bash
# Encode source video into web-optimized AV1 (.webm) + H.264 (.mp4) + poster .jpg
#
# Usage:
#   ./tools/encode-video.sh <source-file> <output-name> [width]
#
# Example:
#   ./tools/encode-video.sh ~/Downloads/raw-stack.mov v1-stack-overview 1280
#
# Outputs to public/videos/:
#   v1-stack-overview.webm   (AV1, smallest)
#   v1-stack-overview.mp4    (H.264, fallback)
#   v1-stack-overview.jpg    (first-frame poster)

set -e

SRC="$1"
NAME="$2"
WIDTH="${3:-1280}"

if [ -z "$SRC" ] || [ -z "$NAME" ]; then
  echo "Usage: $0 <source> <output-name> [width=1280]"
  exit 1
fi

OUT_DIR="public/videos"
mkdir -p "$OUT_DIR"

echo "→ Encoding $SRC as $NAME (width=$WIDTH)"

# Common scale + strip audio
SCALE="scale=${WIDTH}:-2:flags=lanczos"

# AV1 (smallest, best quality) — use libsvtav1 (faster than libaom-av1)
echo "  [1/3] AV1 webm…"
ffmpeg -y -i "$SRC" \
  -vf "$SCALE" \
  -c:v libsvtav1 -crf 35 -preset 6 -g 60 \
  -an \
  -movflags +faststart \
  "$OUT_DIR/$NAME.webm"

# H.264 fallback (Safari iOS, older browsers)
echo "  [2/3] H.264 mp4…"
ffmpeg -y -i "$SRC" \
  -vf "$SCALE" \
  -c:v libx264 -crf 24 -preset slow -profile:v main -pix_fmt yuv420p \
  -an \
  -movflags +faststart \
  "$OUT_DIR/$NAME.mp4"

# Poster — first frame
echo "  [3/3] Poster jpg…"
ffmpeg -y -i "$SRC" \
  -vf "$SCALE,select=eq(n\\,0)" \
  -q:v 4 \
  -frames:v 1 \
  "$OUT_DIR/$NAME.jpg"

# Report sizes
echo ""
echo "Done. File sizes:"
ls -lh "$OUT_DIR/$NAME".{webm,mp4,jpg} | awk '{print "  " $5 "\t" $9}'
