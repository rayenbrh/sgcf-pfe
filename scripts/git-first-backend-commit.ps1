# Run from repository root in PowerShell:
#   .\scripts\git-first-backend-commit.ps1
# Stops tracking heavy folders if they were committed by mistake, then commits and pushes.

Set-Location $PSScriptRoot\..

$dirs = @(
  "node_modules",
  "frontend/node_modules",
  "backend/node_modules",
  "frontend/.vite",
  "backend/dist",
  "frontend/dist"
)

foreach ($d in $dirs) {
  if (Test-Path $d) {
    git rm -r --cached $d 2>$null
  }
}

git add -A
git status
git commit -m "frst backend commit"
git push -u origin main
