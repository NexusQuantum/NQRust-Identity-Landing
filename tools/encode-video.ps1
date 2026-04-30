# PowerShell version — encode source video into web-optimized AV1 + H.264 + poster
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

# AV1
Write-Host "  [1/3] AV1 webm..."
ffmpeg -y -i $Source -vf $Scale -c:v libsvtav1 -crf 35 -preset 6 -g 60 -an -movflags +faststart "$OutDir/$Name.webm"

# H.264
Write-Host "  [2/3] H.264 mp4..."
ffmpeg -y -i $Source -vf $Scale -c:v libx264 -crf 24 -preset slow -profile:v main -pix_fmt yuv420p -an -movflags +faststart "$OutDir/$Name.mp4"

# Poster
Write-Host "  [3/3] Poster jpg..."
ffmpeg -y -i $Source -vf "$Scale,select=eq(n\,0)" -q:v 4 -frames:v 1 "$OutDir/$Name.jpg"

Write-Host ""
Write-Host "Done. File sizes:" -ForegroundColor Green
Get-ChildItem "$OutDir/$Name.webm","$OutDir/$Name.mp4","$OutDir/$Name.jpg" |
  Select-Object @{N='Size';E={"{0:N0} KB" -f ($_.Length/1KB)}}, Name |
  Format-Table -AutoSize
