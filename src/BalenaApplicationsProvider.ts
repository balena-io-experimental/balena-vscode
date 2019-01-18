import * as vscode from 'vscode';
import fetch from 'node-fetch';
import { BalenaApplication } from './models/BalenaApplication';
import { getBalenaToken } from './BalenaHelpers';
export class BalenaApplicationsProvider implements vscode.TreeDataProvider<BalenaApplication> {

	private _onDidChangeTreeData: vscode.EventEmitter<BalenaApplication | undefined> = new vscode.EventEmitter<BalenaApplication | undefined>();
	readonly onDidChangeTreeData: vscode.Event<BalenaApplication | undefined> = this._onDidChangeTreeData.event;

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}

	getTreeItem(element: BalenaApplication): vscode.TreeItem {
		return element;
	}

	getChildren(element?: BalenaApplication): Thenable<BalenaApplication[]> {
        if (!element) {
            console.log(`Retrieving Balena Applications`);
            return BalenaApplication.getBalenaApplicationObjects();
        }
        else {
            console.warn(`Should not specify an element to get children of.`);
        }
    }
    
}
