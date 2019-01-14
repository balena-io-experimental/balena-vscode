import * as vscode from 'vscode';
import { BalenaApplication } from './BalenaApplication';
//import * as balena from 'balena-sdk';

export function BalenaDeleteApplication() {
    let disposable = vscode.commands.registerCommand('balenaCloud.DeleteApplication', () => {
        console.log(`Registered balenaCloud.DeleteApplication`);
        vscode.window.showQuickPick(BalenaApplication.getBalenaApplicationList(), { canPickMany: true });
        
    });
    return disposable;
}