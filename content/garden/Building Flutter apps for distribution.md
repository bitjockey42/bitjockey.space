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

# macOS

## Build

```shell
flutter build macos
```

## Distribution

### Without an Apple Developer Account

Then open `Runner.xcworkspace`:
```shell
open macos/Runner.xcworkspace
```

Click on Product -> Archive. 

In the Archives window, select a build, then click Distribute App. Select Copy App, then select a location to export the app. This will produce a folder `Runner 2023-02-05 14-11-58`  inside which the `*.app` will be created.

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
  "title": "My Application",
  "icon": "my-app.icns",
  "background": "my-background.png",
  "contents": [
    { "x": 448, "y": 344, "type": "link", "path": "/Applications" },
    { "x": 192, "y": 344, "type": "file", "path": "MyApp.app" }
  ]
}
```
