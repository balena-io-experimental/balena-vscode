import * as vscode from 'vscode';
import fetch from 'node-fetch';
import * as fs from 'fs';
import { BalenaApplication } from './BalenaApplication';

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
            return this.getBalenaApplications();
        }
        else {
            console.warn(`Should not specify an element to get children of.`);
        }
    }
    
    private getBalenaApplications(): Promise<BalenaApplication[]> {
        let balenaToken = fs.readFileSync(`${process.env['USERPROFILE']}\\.balenaToken`);
        return fetch('https://api.balena-cloud.com/v4/application', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${balenaToken}`
            }
        })
        .then(response => {
            console.log(`Returning Balena API JSON ...`);
            return response.json();
        })
        .then(payload => {
            return payload.d.map(item => new BalenaApplication(item.id, item.id, item.app_name));
        });
    }
}
