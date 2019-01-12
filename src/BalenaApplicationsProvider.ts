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
            //console.log(payload.d);
            return payload.d.map(item => {
                return new BalenaApplication(item.id, item.id, item.app_name);
            });
        });
    }
}


// export class Dependency extends vscode.TreeItem {

// 	constructor(
// 		public readonly label: string,
// 		private version: string,
// 		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
// 		public readonly command?: vscode.Command
// 	) {
// 		super(label, collapsibleState);
// 	}

// 	get tooltip(): string {
// 		return `${this.label}-${this.version}`;
// 	}

// 	get description(): string {
// 		return this.version;
// 	}

// 	iconPath = {
// 		light: path.join(__filename, '..', '..', 'resources', 'light', 'dependency.svg'),
// 		dark: path.join(__filename, '..', '..', 'resources', 'dark', 'dependency.svg')
// 	};

// 	contextValue = 'dependency';

// }