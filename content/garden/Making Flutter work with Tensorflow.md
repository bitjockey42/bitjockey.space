---
title: "Making Flutter work with TensorFlow"
created: 2022-02-27T14:23
updated: 2022-02-27T09:50
tags: ["how-to", "flutter", "dev", "tensorflow"]
stage: "budding"
---
# Overview

As of this writing, TensorFlow Lite does not have an official library for Flutter. So I am trying to make it all work with [this](https://github.com/am15h/tflite_flutter_plugin) third-party library, [tflite_flutter_plugin](https://github.com/am15h/tflite_flutter_plugin) in order to build an app with machine learning support.

# Setup

This whole set up requires that you have an active Python environment with `numpy` installed in order to build the Tensorflow libraries.

# Python

[[Install Python and setup miniforge3]].

```shell
# Activate miniforge3
pyenv shell miniforge3

# Setup conda environment
conda create --name tensorflow # this can be any name

# Activate environment
conda activate tensorflow

# Install numpy
conda install numpy
```

# Install bazel

Bazel is a build tool.
```shell
# install bazel
brew install bazel
```

Clone tensorflow and then checkout whatever version. 
```shell
git clone https://github.com/tensorflow/tensorflow.git
cd tensorflow
git checkout r2.8 # can be any version
```

# Build TensorFlow lite binary with Bazel

First, make sure you're working within the `tensorflow` conda environment.
```shell
conda activate tensorflow
```

## Desktop

Generate the tensorflow binary.
```shell
bazel build -c opt \
	//tensorflow/lite/c:tensorflowlite_c \
	--define tflite_with_xnnpack=true`
```

## iOS

From [here](https://www.tensorflow.org/lite/guide/build_ios).
```shell
cd tensorflow
bazel clean
```

Run `./configure` and say `Y` to building with iOS support. You may be prompted to enter the path to Python, which needs to be whatever  miniforge3 and the conda environment supplies.

Once  configured:
```shell
bazel build --config=ios_fat -c opt \
	//tensorflow/lite/ios:TensorFlowLiteC_framework
```

This will generate a `TensorFlowLiteC_framework.zip` under `bazel-bin/tensorflow/lite/ios`.

The tricky part here will be where to extract this. You will need to go to the root of the project where `tflite_flutter` is a dependency and declared as such in `pubspec.yaml`.
```yaml
dependencies:
  tflite_flutter: ^0.9.0
```

Then install.
```shell
flutter pub get
```

Then, unzip TensorFlowLiteC_framework.zip to `~/.pub-cache/hosted/pub.dartlang.org/tflite_flutter-0.9.0/ios/`
```shell
cd ../tensorflow
unzip bazel-bin/tensorflow/lite/ios/TensorFlowLiteC_framework.zip \
	-d ~/.pub-cache/hosted/pub.dartlang.org/tflite_flutter-0.9.0/ios/
```

## Android

For TensorFlow v2.2 or greater:
```shell
bazel build -c opt \
	--cxxopt=--std=c++11 
	--config=android_arm \
	//tensorflow/lite/c:tensorflowlite_c

# similarily for arm64 use --config=android_arm64
```

For v2.1 or less:
```shell
bazel build -c opt \
	--cxxopt=--std=c++11 \
	--config=android_arm \
	//tensorflow/lite/experimental/c:libtensorflowlite_c.so

# similarily for arm64 use --config=android_arm64
```

# Troubleshooting

## bazel build errors

### Wrong version

If you get this error  when trying to then you do not have the right version.

![[error_bazel.png]]

To fix:

```shell
(cd "/opt/homebrew/Cellar/bazel/5.0.0/libexec/bin" && \
	curl -fLO https://releases.bazel.build/4.2.1/release/bazel-4.2.1-darwin-arm64 && \
	chmod +x bazel-4.2.1-darwin-arm64)
```

### numpy missing

Make sure you have `numpy` installed.

```shell
conda activate tensorflow
conda install numpy
```

## iOS simulator build errors

Upon trying to build for iOS simulator, you may get this:
![[error_flutter_linker.png]]

From [here](https://stackoverflow.com/a/63955114) (thank you to the author).

Open `ios/Runner.xcworkspace` and then click on "Runner". Select the "Runner" project, then click on the "Build Settings" tab. Search for "Architecture". Then under "Excluded Architectures", select "Any iOS Simulator SDK" for Debug and then add "arm64" by double-clicking on the field next to that. Do this for all of the other schemes (Profile, Release).

Then, update the post install block of the `ios/Podfile` :

```ruby
post_install do |installer|
  installer.pods_project.targets.each do |target|
    flutter_additional_ios_build_settings(target)
  end
  # Add below
  installer.pods_project.build_configurations.each do |config|
    config.build_settings["EXCLUDED_ARCHS[sdk=iphonesimulator*]"] = "arm64"
  end
end
```

Then clean and rebuild.

```
flutter clean
flutter pub get
flutter run -d 'iphone 11' # simulator
```

# References
- [tflite_flutter_plugin](https://github.com/am15h/tflite_flutter_plugin)
- [tflite_flutter_plugin desktop binaries](https://github.com/am15h/tflite_flutter_plugin/wiki/Building-Desktop-binaries-with-XNNPack-Delegate)
- [Text Classification using TensorFlow Lite Plugin for Flutter](https://medium.com/@am15hg/text-classification-using-tensorflow-lite-plugin-for-flutter-3b92f6655982)

