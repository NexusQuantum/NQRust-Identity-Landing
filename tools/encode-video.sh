#!/usr/bin/env bash
# Encode source video into web-optimized H.264 MP4 + JPG poster.
#
# We use H.264 baseline-profile MP4 only (no WebM/AV1) for maximum mobile
# compatibility — every Android & iOS browser handles H.264, but AV1 support
# is still patchy on mobile (Chrome Android < 113, iOS Safari < 17.4).
#
# Usage:
#   ./tools/encode-video.sh <source-file> <output-name> [width]
#
# Example:
#   ./tools/encode-video.sh ~/Downloads/raw-stack.mov v1-stack-overview 1280

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

SCALE="scale=${WIDTH}:-2:flags=lanczos"

# H.264 baseline — universal mobile decode
echo "  [1/2] H.264 mp4…"
ffmpeg -y -i "$SRC" \
  -vf "$SCALE" \
  -c:v libx264 -profile:v baseline -level 3.0 -preset medium -crf 23 \
  -pix_fmt yuv420p \
  -an \
  -movflags +faststart \
  "$OUT_DIR/$NAME.mp4"

# Poster (first frame)
echo "  [2/2] Poster jpg…"
ffmpeg -y -i "$SRC" \
  -vf "$SCALE,select=eq(n\\,0)" \
  -q:v 4 \
  -frames:v 1 \
  "$OUT_DIR/$NAME.jpg"

# Report sizes
echo ""
echo "Done. File sizes:"
ls -lh "$OUT_DIR/$NAME".{mp4,jpg} | awk '{print "  " $5 "\t" $9}'
