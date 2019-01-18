import * as vscode from 'vscode';
import { BalenaApplication } from './models/BalenaApplication';
import fetch from 'node-fetch';
import { getBalenaToken } from './BalenaHelpers';
//import * as balena from 'balena-sdk';

export function BalenaDeleteApplication(): vscode.Disposable {
    let disposable = vscode.commands.registerCommand('balenaCloud.DeleteApplication', async () => {
        let itemList = await BalenaApplication.getBalenaApplicationQuickPick();
        let appList = await vscode.window.showQuickPick(itemList, { canPickMany: true });
        vscode.window.showWarningMessage(`Deleting application ${appList}`);
        vscode.window.showWarningMessage(typeof appList);

        // If user doesn't select any items, return nothing
        if (!appList) { console.log(`User didn't select any balenaCloud apps to delete`); return; }

        await appList.map(async app => {
            // @ts-ignore
            console.log(`Deleting ${app.label}`)
            // @ts-ignore
            await fetch(`https://api.balena-cloud.com/v4/application(${app.label})`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getBalenaToken()}`,
                }
            });
        });
    });
    return disposable;
}