---
title: "Building Flutter apps for distribution"
created: 2022-02-28T01:16
updated: 2023-02-05T02:17
tags: ["how-to", "ios", "app"]
stage: "seedling"
---

One would think it would be straightforward to install an iOS app you built yourself to your own iPhone. And yet...it took [this](https://stackoverflow.com/a/68968301) lifesaver of a StackOverflow post to help me figure this out.

# iOS

## Preparation

Follow instructions on [reviewing Xcode project settings](https://docs.flutter.dev/deployment/ios#review-xcode-project-settings). 

## Build 
First, build the app.

```shell
flutter build ipa
```

## Distribution

### With an Apple Developer Account

Then open the "Devices and Simulators" window in Xcode.

```shell
open build/ios/archive/Runner.xcarchive
```

In Archives -> select the latest created archive. Then click "Validate app". If you see any errors about "CONTRACT_STATE" or what not, you gotta go to [App Store Connect - Agreements](https://appstoreconnect.apple.com/agreements/#/), then try to validate again.

Once complete, click on Distribute App -> Ad Hoc. Follow the prompts. In Distrubution manifest information, set the Name and URLs to your own app's. Export to a folder somewhere.

This will generate a folder with an `.ipa` file and some `Plist` files.

### Without an Apple Developer Account

You do not need to shell out $99/year if you just want to test apps on your own device. To do this, open `PROJECT_DIR/build/` and find the `*.ipa` , which you can install.

## Install on device

Connect iPhone to Mac.

Open Finder, then select Locations -> iPhone. 

In another Finder window, open the folder where the ipa was exported. Drag the ipa to the iPhone window. The storage bar will turn into a progress bar.

# Linux

## Build

This will create `build/linux/x64/release/bundle` in your project directory:

```shell
flutter build linux --release -v  # Run verbose mode
```


> [!NOTE]
> This process took awhile, so I highly recommend passing the --verbose/-v flag to see the progress.


## Distribution

### AppImage

Then [build an AppImage](https://appimage-builder.readthedocs.io/en/latest/examples/flutter.html) with `appimage-builder` which is a utility that will create an `AppImage` from your Flutter Linux app.

Download [appimage-builder]()

To setup:

```shell
chmod +x appimage-builder-x86_64.AppImage

mkdir ~/Applications/
mv appimage-builder-x86_64.AppImage ~/Applications/appimage-builder
```

> [!NOTE] 
> Running `appimage-builder --generate` didn't work for me, so I just copied an example `AppImageBuilder.yml`.

Then, in your project directory, download the `AppImageBuilder.yml` example from [here](https://raw.githubusercontent.com/AppImageCrafters/appimage-builder-flutter-example/main/AppImageBuilder.yml) and place in your project folder.

Copy the project build files to an `AppDir`:
```shell
cp -r build/linux/x64/release/bundle $PWD/AppDir
```

Finally, run `appimage-builder` to create the `AppImage`:
```shell
appimage-builder --recipe AppImageBuilder.yml --skip-test
```

# macOS

## Prepare for Distribution 

### With Apple Developer Account

First, make sure you have a Developer ID certificate set up.

Open up the Xcode workspace: 
```shell
open macos/Runner.xcworkspace
```

Then go to Xcode -> Settings -> Accounts. Add your Apple ID if it isn't already there. Then click on "Manage Certificates".

Click the `+` button and select `Developer ID Application` to generate the certificate.

Back in the Xcode workspace, click on "Runner" on the left sidebar, then in the inner window under TARGETS, select Runner.

In the tabs above that screen, click on Signing & Certificates. Uncheck "Automatically manage signing" and set Team to your Apple ID that's associated with your Apple Developer Account. under Signing Certificate, select "Developer ID Application"

#### Notarization

In order to properly distribute your app, you have to modify the Signing & Capabilities settings. See [Common Notarization Issues](https://developer.apple.com/documentation/security/notarizing_macos_software_before_distribution/resolving_common_notarization_issues#3087735)

#### Notarizing

https://developer.apple.com/documentation/security/notarizing_macos_software_before_distribution#3087730

### Without an Apple Developer Account

Then open `Runner.xcworkspace`:
```shell
open macos/Runner.xcworkspace
```

Click on Product -> Archive. 

In the Archives window, select a build, then click Distribute App. Select Copy App, then select a location to export the app. This will produce a folder `Runner 2023-02-05 14-11-58`  inside which the `*.app` will be created.

## Build app

```shell
flutter build macos
```

### With Apple Developer Account

Verify codesigning:
```shell
codesign -vvv --deep --strict build/macos/Build/Products/Release/diarist.app/
spctl -vvv --assess --type exec build/macos/Build/Products/Release/diarist.app
codesign -dvv build/macos/Build/Products/Release/diarist.app
```

Open Xcode -> Product -> Archive.

Xcode -> Window -> Organizer.

select the most recent archive. click Distribute App. Follow prompts, this will upload your app to Apple notarization, which should complete in less than an hour.

### Create a `dmg` 

Install [`appdmg`](https://github.com/LinusU/node-appdmg):

```shell
npm install -g appdmg
```

Create a config file:
```shell
mkdir -p PROJECT_DIR/assets/
touch PROJECT_DIR/assets/app.json
```

And paste:
```json
{
  "title": "MyApp",
  "contents": [
    { "x": 448, "y": 344, "type": "link", "path": "/Applications" },
    { "x": 192, "y": 344, "type": "file", "path": "../build/macos/Build/Products/Release/myapp.app/" }
  ]
}
```

Then run:
```shell
appdmg assets/app.json MyApp.dmg
```

This will put the macos build in the DMG.

# Troubleshooting

### Cocoapods not found

#### Standalone flutter

This refers to the mainline release.

Whenever macOS updates to a new version you will have to uninstall cocoapods if installed through `gem`:

```shell
sudo gem uninstall cocoapods cocoapods-core
```

Then install with `brew`:

```shell
brew install cocoapods
```

If any issues arise regarding the `brew link` step:

```shell
brew link --overwrite cocoapods
brew reinstall cocoapods

flutter doctor
```

source:  [StackOverflow post](https://stackoverflow.com/a/71398813)

#### With fvm

Running `fvm flutter doctor` will sometimes lead to cocoapods not being found even if it's installed. This appears to be a [bug](https://github.com/fluttertools/fvm/issues/253).

So in order to account for this, we can set an `alias` in `.zprofile/.bash_profile/.zshrc`:

```shell
alias f=".fvm/flutter_sdk/bin/flutter"`
```

Then restart shell.

```shell
exec $SHELL
```

Check if flutter doctor finds any issues:

```shell
f doctor
```

