// Builds the theme files (the json theme definitions).
//
// Whilst all the necessary files can and will be created at runtime if missing, it's a good idea to publish the
// extension with pre-built files so that when the extension is installed, nothing _needs_ to be ran and vscode
// doesn't need to be reloaded straight away.

import { createThemes } from "../src/theme";
import { makeOutputFolder } from "./buildEnv";
import { Config } from "../src/config";

makeOutputFolder("themes");
Config.DEFAULT.writeToCache();
createThemes(Config.DEFAULT);

