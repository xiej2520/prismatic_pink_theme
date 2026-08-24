$ProjectRoot = Split-Path -Parent $PSScriptRoot

Push-Location $ProjectRoot
try {
	npm run buildTs
	npm run buildTheme
	& "$ProjectRoot\build\Pre-Package.ps1" -WorkingDirectory "$ProjectRoot\"
	Set-Location -Path "$ProjectRoot\package"
	npm run package

	Write-Host "Package available in $ProjectRoot\package\theme-prismatic-pink-[version].vsix"
}
finally {
	Pop-Location
}
