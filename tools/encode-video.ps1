# PowerShell version — encode source video into web-optimized H.264 MP4 + JPG poster.
#
# We use H.264 baseline-profile MP4 only (no WebM/AV1) for maximum mobile
# compatibility — every Android & iOS browser handles H.264, but AV1 support
# is still patchy on mobile (Chrome Android < 113, iOS Safari < 17.4).
#
# Usage:
#   .\tools\encode-video.ps1 -Source "C:\path\to\raw.mov" -Name "v1-stack-overview" [-Width 1280]
#
# Requires ffmpeg in PATH.

param(
  [Parameter(Mandatory=$true)][string]$Source,
  [Parameter(Mandatory=$true)][string]$Name,
  [int]$Width = 1280
)

$OutDir = "public/videos"
New-Item -ItemType Directory -Force -Path $OutDir | Out-Null

$Scale = "scale=${Width}:-2:flags=lanczos"

Write-Host "-> Encoding $Source as $Name (width=$Width)" -ForegroundColor Cyan

# H.264 baseline — universal mobile decode
Write-Host "  [1/2] H.264 mp4..."
ffmpeg -y -i $Source -vf $Scale `
  -c:v libx264 -profile:v baseline -level 3.0 -preset medium -crf 23 `
  -pix_fmt yuv420p `
  -an -movflags +faststart "$OutDir/$Name.mp4"

# Poster (first frame)
Write-Host "  [2/2] Poster jpg..."
ffmpeg -y -i $Source -vf "$Scale,select=eq(n\,0)" -q:v 4 -frames:v 1 "$OutDir/$Name.jpg"

Write-Host ""
Write-Host "Done. File sizes:" -ForegroundColor Green
Get-ChildItem "$OutDir/$Name.mp4","$OutDir/$Name.jpg" |
  Select-Object @{N='Size';E={"{0:N0} KB" -f ($_.Length/1KB)}}, Name |
  Format-Table -AutoSize
