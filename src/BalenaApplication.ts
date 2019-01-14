import * as vscode from 'vscode';
import fetch from 'node-fetch';
import * as fs from 'fs';

export class BalenaApplication extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly appId: string,
        public readonly name: string,

		public readonly collapsibleState?: vscode.TreeItemCollapsibleState,
    ) {
        super(label, collapsibleState);
    }

    get tooltip(): string {
        return `${this.appId}-${this.name}`;
    }
    
    get description(): string {
        return `${this.name} (${this.appId})`;
    }

    iconPath = {
        light: '',
        dark: '',
    }

    contextValue = 'balenaApplication';

    // Helper function to retrieve a list of balenaCloud Application names as a string array
    static getBalenaApplicationList(): Promise<string[]> {
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
                return item.app_name;
            });
        });
    }
}
