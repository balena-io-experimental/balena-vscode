# Purpose: Installs the Balena extension for Microsoft Visual Studio Code

# Clean up old .vsix packages
Remove-Item -Path $PSScriptRoot\* -Filter *.vsix

# Package the extension into a new .vsix file
Start-Process -Wait -FilePath vsce -ArgumentList 'package' -WorkingDirectory $PSScriptRoot

# Get the packaged .vsix file
$ExtensionPath = @(Get-ChildItem -Path $PSScriptRoot -Filter *.vsix)[0]

# Install the Visual Studio Code extension, using its fully-qualified filesystem path
if ($ExtensionPath) {
  code --install-extension $ExtensionPath.FullName
}
else {
  throw 'Could not find .vsix file in project root'
}