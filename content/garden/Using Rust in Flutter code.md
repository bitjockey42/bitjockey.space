---
title: "Using Rust in Flutter code"
created: 2022-03-06T14:15
updated: 2022-03-06T14:15
tags: ["how-to", "rust", "huggingface"]
stage: "seedling"
---

# Introduction
I am trying to figure out how to integrate [huggingface](https://huggingface.co/) into my Flutter app. Here is my attempt at figuring that out.

# Setup
## Pre-requisites
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

source $HOME/.cargo/env

brew install llvm

rustup target add aarch64-apple-ios x86_64-apple-ios
rustup target add aarch64-apple-ios-sim
```

## Rust
```bash
cargo install flutter_rust_bridge_codegen cbindgen
dart pub global activate ffigen
# if building for iOS or MacOS
cargo install cargo-xcode

flutter pub add flutter_rust_bridge
# if using Dart codegen
flutter pub add -d build_runner
flutter pub add -d freezed
flutter pub add freezed_annotation
```

# Integrating with an existing project
Where `$crate` is the name of the crate. Set it by running `crate=somenamehere`

```bash
crate=cortex
# At the root flutter project, create a crate
cargo new --lib $crate
```

Add this to `Cargo.toml`:
```toml
[dependencies]
flutter_rust_bridge = "1"

[lib]
crate-type = ["lib", "staticlib", "cdylib"]
```


Then use `cargo` to generate an Xcode project within `$crate`. You will add this as a sub-project for the `ios/Runner.xcodeproj`.
```bash
cd $crate
cargo xcode
``````

## iOS setup
`open ios/Runner.xcodeproj`

Then drag the `$crate/$crate.xcodeproj` under the `Runner` folder in the Xcode sidebar.

Then click on the top `Runner` item in the sidebar -> Build Phases. 

Under Targets -> Runner -> Dependencies, add the `$crate-staticlib` . 

Under Link Binary With Libraries -> add `lib$crate_static.a`.

Then run:

```bash
flutter_rust_bridge_codegen \
    -r $crate/src/api.rs \
    -d lib/bridge_generated.dart \
    -c ios/Runner/bridge_generated.h
# if building for MacOS
cp ios/Runner/bridge_generated.h macos/Runner/bridge_generated.h
```

# Libraries
- [flutterrust](https://github.com/shekohex/flutterust)
- [flutter_rust_bridge](https://pub.dev/packages/flutter_rust_bridge)
- [rust_bert](https://docs.rs/rust-bert/latest/rust_bert/)

# References
- https://medium.com/flutter-community/finally-running-rust-natively-on-a-flutter-plugin-here-is-how-6f2826eb1735
- [Integrate flutter_rust_bridge with existing project](https://fzyzcjy.github.io/flutter_rust_bridge/integrate.html)
