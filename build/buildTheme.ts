// Builds the theme files (the json theme definitions).
//
// Whilst all the necessary files can and will be created at runtime if missing, it's a good idea to publish the
// extension with pre-built files so that when the extension is installed, nothing _needs_ to be ran and vscode
// doesn't need to be reloaded straight away.

import * as fs from "fs";
import * as path from "path";
import { createThemes } from "../src/theme";
import { makeOutputFolder } from "./buildEnv";
import { DEFAULT_CONFIG, type Config } from "../src/config";

const folder = makeOutputFolder("themes");
const config = DEFAULT_CONFIG as unknown as Config;

fs.writeFileSync(path.join(folder, "cached_config.json"), JSON.stringify(config));
createThemes(config);

