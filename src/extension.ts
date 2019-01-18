// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { BalenaApplicationsProvider } from './BalenaApplicationsProvider';
import { BalenaDeleteApplication } from './BalenaDeleteApplication';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "balena-vscode" is now active!');

	// Register tree view data provider
	vscode.window.registerTreeDataProvider('balena-cloud-applications', new BalenaApplicationsProvider());

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.balenaListApplications', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Listing balenaCloud applications!');
	});

	
	BalenaDeleteApplication();

	// Add all dispoable objects here. Disposable is returned from the registerCommand() function.
	context.subscriptions.push(
		disposable,
	);
}

// this method is called when your extension is deactivated
export function deactivate() {
	console.log(`Balena extension has been deactivated.`);
}