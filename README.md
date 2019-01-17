## Balena Visual Studio Code Extension

This repository contains the Balena extension for Microsoft [Visual Studio Code](https://code.visualstudio.com).

- [x] View a list of balenaCloud applications
- [ ] Delete a balenaCloud application
- [ ] Create a new balenaCloud application
- [ ] Flash an SD card with balenaEtcher
- [ ] Feature TBD
- [ ] Feature TBD

## Build

To build the `.vsix` package, use the `vsce` command line tool from npm.

    Set-Location -Path $ProjectRoot
    vsce package

## Debug

To debug this extension, open the project root in Visual Studio Code and hit <kbd>F5</kbd> to start debugging, or select the `Debug: Start Debugging` command from the command palette.

## Installation

The `balena-vscode` extension is not yet available on the Visual Studio Marketplace. To install the extension, run the `install.ps1` PowerShell script.

    `./install.ps1`

## Authentication to balenaCloud

In order to use the Balena extension for Visual Studio Code, you'll need to configure access to your balenaCloud account. Follow the steps below to generate an API key and store it on your development system.

1. Log into the balenaCloud dashboard
2. Navigate to Username --> Preferences --> Access Tokens
3. Select the **Create API Key** button
4. Store the API key in `$HOME/.balenaToken`