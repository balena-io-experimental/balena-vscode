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