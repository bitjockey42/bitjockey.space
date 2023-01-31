---
title: "Flutter"
created: 2023-01-30T00:29
updated: 2023-01-30T00:29
tags: ["garden", "how-to", "flutter"]
stage: "seedling"
---

> [Flutter](https://flutter.dev/)  is an open source framework by Google for building beautiful, natively compiled, multi-platform applications from a single codebase.

I use Flutter for building many of the apps I develop for mobile and desktop. Like other software ecosystems, my projects require different `flutter`  versions, so I use [fvm](https://fvm.app/) for managing versions.

This guide will show you how to install the Flutter SDK that will act as the default version of `flutter` and how to setup `fvm`.

# Setup the main Flutter SDK

## Install on `Pop!_OS` (Linux)

According to [this](https://github.com/flutter/flutter/issues/115909) GitHub issue on the Flutter repo, there is currently a problem with the Flutter SDK and `Pop!_OS`. As a workaround, install these dependencies:

```shell
sudo apt-get install clang cmake ninja-build pkg-config libgtk-3-dev liblzma-dev libstdc++-12-dev
```

Then install the SDK locally:

```shell
# Prepare directory
mkdir -p ~/.local/share
cd ~/.local/share

# Checkout the stable branch
git clone https://github.com/flutter/flutter.git -b stable
```

Edit your `PATH` to include `$HOME/.local/share/flutter/bin`. For example, if you use `zsh`:

```shell
export PATH=$HOME/bin:$HOME/.local/share/flutter/bin:$HOME/.local/bin:$PATH
```

Then restart your terminal.

# Setup fvm (macOS and Linux)

If you don't already have [brew](https://brew.sh) installed, install it suing this command:

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Then, install `fvm` with:

```shell
brew tap leoafarias/fvm
brew install fvm
```

# IDE/Editor Configuration

## VS Code

Create `.vscode` folder inside your project's folder. 

Then, create or edit a `.vscode/settings.json` file and add these:

```json
{
  "dart.flutterSdkPath": ".fvm/flutter_sdk",
  // Remove .fvm files from search
  "search.exclude": {
    "**/.fvm": true
  },
  // Remove from file watching
  "files.watcherExclude": {
    "**/.fvm": true
  }
}
```

This will auto-switch the `flutter` version with fvm if one is configured.