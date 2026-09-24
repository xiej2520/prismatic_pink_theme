import { type Config, getConfig } from "./config";
import * as command from "./command";
import { showReloadConfirmation, showReloadOnLoadConfirmation } from "./message";
import { createThemes } from "./theme";
import * as vscode from "vscode";

// This method is called when your extension is activated.
export function activate(context: vscode.ExtensionContext) {
	// Register all of the commands.
	context.subscriptions.push(command.resetCmd);

	const config = getConfig();
	if (config.isModified()) {
		// The configuration must have been modified whilst vscode was not open.
		//
		// Write the modified configuration settings back to the cache and recreate the theme files.
		if (regenerate(config)) {
			// Unlike with icon themes, proper workbench/syntax themes are not reloaded upon modification of the
			// theme files, so we must force vscode to reload to see the changes.
			showReloadOnLoadConfirmation();
		}
	}

	context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(onConfigChange));
}

// This method is called when your extension is deactivated.
export function deactivate() {}

/**
 * Runs whenever the vscode configuration changes.
 */
function onConfigChange(e: vscode.ConfigurationChangeEvent) {
	// Ignore configuration changes that aren't related to our theme.
	if (!e.affectsConfiguration("theme-prismatic-pink")) {
		return;
	}

	// Read the current configuration settings, write any modifications to the cache, and recreate the theme files.
	const config = getConfig();
	if (regenerate(config)) {
		// Unlike with icon themes, proper workbench/syntax themes are not reloaded upon modification of the theme
		// files, so we must force vscode to reload to see the changes.
		showReloadConfirmation();
	}
}

/**
 * Writes the configuration to the cache and recreates the theme files. The extension folder may be read-only, so
 * failures are reported instead of thrown.
 */
function regenerate(config: Config): boolean {
	try {
		config.writeToCache();
		createThemes(config);
		return true;
	} catch (err) {
		vscode.window.showErrorMessage(`Prismatic Pink: could not write the theme files: ${err}`);
		return false;
	}
}

/* // Output channel used for debugging.
export let info = vscode.window.createOutputChannel("Pink Candy INFO"); */
