npm run buildTs
npm run buildTheme
& ".\build\Pre-Package.ps1" -WorkingDirectory .\
Set-Location -Path .\package
npm run package

Set-Location -Path ..\
Write-Host "Package available at .\package\theme-prismatic-pink-[version].vsix"
