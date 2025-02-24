import * as config from "./config";
import * as vscode from "vscode";

/**
 * Resets all extension settings.
 */
export const resetCmd = vscode.commands.registerCommand(
	"theme-prismatic-pink.restoreDefaultConfig",
	() => {
		config.resetConfig();
	}
);
