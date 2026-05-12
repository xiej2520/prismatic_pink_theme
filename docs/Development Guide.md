# Development Guide

This is a guide for working on this project.

## Documentation

Developer documentation lives in the `/docs` folder. User documentation lives in
the repository root, (I don't want to change it because it will break links for
all extension versions published before the change).

## Project structure

|Location||
|-|-|
|`.vscode`|VS Code-related mainfests|
|`.vscodeignore`|Describes which files/directories to ignore when packaging the extension.|
|`build`|Build scripts|
|`colors`|Build output for Neovim colorscheme file.|
|`css`|Build output for CSS custom-property stylesheet|
|`docs`|Developer documentation|
|`out`|The build output for the typescript project.|
|`package`|The packaging output.|
|`src`|The typescript project.|
|`themes`|The build output for theme files.|

## Development

Prerequisites:
- `npm` 8.0+
- `node` 20.0+
- `pwsh` 7.0+

The extension manifest defines the following npm scripts:

- `clean` - Removes `out/` build directory
- `build` - Builds the typescript project and theme files.
- `buildTheme` - Builds the theme files.
- `buildZedTheme` - Builds the Zed theme `build/prismatic-pink-zed.json`.
- `buildNvimTheme` - Builds the Neovim Theme `build/prismatic-pink.lua`.
- `buildCssTheme` - Builds the CSS custom property stylesheet `css/prismatic-pink.css`.
- `buildTs` - Build the typescript project.
- `watchTs` - Watch the typescript project.
- `typecheck` - Type-check `src/`, `build/`, and `test/`.
- `test` - Run `node:test` unit tests in `test/`.
- `vscode:prepublish`: Runs `build` for `vsce package`.
- `package` - Package the extension into an `.vsix` file.
- `publishMS` - Publish the extension to the Microsoft marketplace.
- `publishOVSX` - Publish the extension to the OpenVSX marketplace.
- `test` - Runs `node:test` unit tests in `test/`.
- `getVersion` - A script that outputs the extension's version number in a specific format for azure pipelines purposes.

### Building the extension for debugging/testing

To build the extension when developing it, use the `Run Extension` launch
configuration. This will build the extension and launch the VS Code Extension
Development Host with the extension preloaded.

When the Extension Host is running, after making a change to the theme script,
run the `buildTheme` task. This will rebuild the theme files with `build/buildTheme.ts`
and the Extension Host will update and reload the theme colours according to the
defined `config` type, which uses the *default* setting values. If you're
working on the theme colours for a non-default setting value, modify this type
to suit, **but don't** commit the changes. The type should reflect the default
setting values.

Modifying the typescript code requires it to be rebuilt, run `npm run buildTs`,
or `npm run build` to both build the ts and rebuild the theme files.

### Packaging the extension (not publishing)

To package the extension locally, run `npm run package`.
Package contents are determined by `.vscodeignore` allow-list.

The packaged extension will be located at `./package/theme-prismatic-pink-${version}.vsix`.

## ⚠ Publish a new release

- [ ] Bump the version number in `package.json`.
- [ ] Add a new entry to the changelog with the date of release.
- [ ] If bumping minimum supported VS Code version, update the number in
  `package.json` and make a prominent node in the changelog entry `Changed` section.

## ⚠ Adding a new root file/directory

When adding a new file or directory at the repository root, make sure to update
`.vscodeignore` and `/build/Pre-Package.ps1` to add it to the exclusion list.

## Adding a new setting

Settings are defined in the `SETTINGS` array in `src/config.ts`. Then manually:

- [ ] Define the new key within the `package.json` extension manifest, using the same nameas the
  `SETTINGS` entry's `key`.
- [ ] Add a new entry to `SETTINGS` (key, default, isValid), matching extension manifest.
- [ ] Add a new getter in the `Config` class.
- [ ] Add a new subsection to `/Configuration.md`.

## Adding a new setting that deprecates an existing setting

- [ ] Define the new key within the `package.json` extension manifest. In the
  description mention that this new setting overrides the existing setting.
- [ ] Add a deprecation message to the deprecated property in `package.json`.
- [ ] Decide on how the old setting migrates to the new setting.
- [ ] Replace the existing entry in `SETTINGS` with a new one: new `key`, old property name added to
  `legacyVscodeKeys`, and `migrateLegacy` if the value needs converting.
- [ ] Update the `Config` class gett's name if the field name changed.
- [ ] Replace the existing subsection in `/Configuration.md` to explain the
  new setting. Include a note as to how the deprecated setting is migrated to the new one.

## Converting

Using `JetBrains/colorSchemeTool` to export `.icls` themes for Intellij.

`build/prismatic-pink.icls`, `build/prismatic-pink-contrast.icls`.
`build/Prismatic_pink.icls` is manual Intellij configured theme export.

For Zed, in Zed project:
```sh
cargo run -p theme_importer -- prismatic-pink.json --output prismatic-pink-zed.json
cargo run -p theme_importer -- prismatic-pink-contrast.json --output prismatic-pink-contrast-zed.json
```
