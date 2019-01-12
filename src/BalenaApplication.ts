import * as vscode from 'vscode';

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
}
