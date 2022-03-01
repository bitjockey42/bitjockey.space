---
title: "Installing iOS app ad-hoc"
created: 2022-02-28T01:16
updated: 2022-02-28T01:25
tags: ["how-to", "ios", "app"]
stage: "seedling"
---

One would think it would be straightforward to install an iOS app you built yourself to your own iPhone. And yet...it took [this](https://stackoverflow.com/a/68968301) lifesaver of a StackOverflow post to help me figure this out.

# Build 
First, build the app.

```shell
flutter build ipa
```

Then open the "Devices and Simulators" window in Xcode.

```shell
open build/ios/archive/Runner.xcarchive
```

In Archives -> select the latest created archive. Then click "Validate app". If you see any errors about "CONTRACT_STATE" or what not, you gotta go to [App Store Connect - Agreements](https://appstoreconnect.apple.com/agreements/#/), then try to validate again.

Once complete, click on Distribute App -> Ad Hoc. Follow the prompts. In Distrubution manifest information, set the Name and URLs to your own app's. Export to a folder somewhere.

This will generate a folder with an `.ipa` file and some `Plist` files.

# Install on device
Connect iPhone to Mac.

Open Finder, then select Locations -> iPhone. 

In another Finder window, open the folder where the ipa was exported. Drag the ipa to the iPhone window. The storage bar will turn into a progress bar.


