import * as vscode from 'vscode';
import fetch from 'node-fetch';
import * as fs from 'fs';
import { getBalenaToken } from '../BalenaHelpers';

export class BalenaApplication extends vscode.TreeItem implements vscode.QuickPickItem {
    constructor(
        public label: string,
        public readonly appId: string,
        public readonly name: string,

		public readonly collapsibleState?: vscode.TreeItemCollapsibleState.Collapsed,
    ) {
        super(label, collapsibleState);
    }

    get tooltip(): string {
        return `${this.appId}-${this.name}`;
    }

    get detail() {
        return 'applicationdetail';
    }
    
    get description(): string {
        return `${this.name} (${this.appId})`;
    }

    get target() {
        return this;
    }

    iconPath = {
        light: `${__dirname}/../../resources/microchip_light.svg`,
        dark: `${__dirname}/../../resources/microchip_dark.svg`,
    }

    contextValue = 'balenaApplication';

    static async getBalenaApplications() {
        return fetch('https://api.balena-cloud.com/v4/application', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getBalenaToken()}`
            }
        }).then(response => {
            console.log(`Returning Balena API JSON ...`);
            return response.json();
        });
    }

    static async getBalenaApplicationObjects(): Promise<BalenaApplication[]> {
        
        return await this.getBalenaApplications().then(payload => {
            return payload.d.map(item => new BalenaApplication(item.id, item.id, item.app_name));
        });
    }


    // Helper function to retrieve a list of balenaCloud Application names as a string array
    static getBalenaApplicationList(): Promise<string[]> {
        return this.getBalenaApplications().then(payload => {
            return payload.d.map(item => {
                return item.app_name;
            });
        });
    }

    static async getBalenaApplicationQuickPick() {
        return this.getBalenaApplications().then(payload => {
            return payload.d.map(app => {
                return new BalenaApplicationQuickPick(String(app.id), `${app.id} - ${app.app_name}`, `${app.id} (${app.app_name})`);
            });
        });
    }
}

export class BalenaApplicationQuickPick implements vscode.QuickPickItem {
    label: string;
    description: string;
    detail: string;

    constructor(
        label: string,
        description: string,
        detail: string
    ) {
        this.label = label;
        this.description = description;
        this.detail = detail;
    }
}