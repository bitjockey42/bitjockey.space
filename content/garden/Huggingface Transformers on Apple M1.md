---
title: "Huggingface Transformers on Apple M1"
created: 2022-02-28T20:27
updated: 2022-02-28T20:27
tags: ["how-to", "tensorflow", "huggingface", "machine-learning"]
stage: "budding"
---

# Overview

This is a guide on setting up [huggingface](https://huggingface.co) transformers on a MacBook Air with Apple Silicon (M1).

# Install

## Python

[[Install Python and setup miniforge3]].

## Tensorflow

**NOTE**: Tensorflow v2.5 natively supports M1. 
**NOTE**:`tensorflow-macos, tensorflow-metal` are only available on  Python 3.8-3.9.

```shell
# only 3.8-3.9 supported
# python_version=$(python -c "import platform; print(platform.python_version())")
# conda create -n [NAME] python=$python_version
conda create -n $NAME python=3.8  # 3.8 is stable
conda activate $NAME
conda install -c apple tensorflow-deps
# conda install -c apple tensorflow-deps==2.6.0

# Pip
python -m pip install tensorflow-macos
python -m pip install tensorflow-metal

# Homebrew deps
brew install libjpeg
conda install -y matplotlib jupyterlab
```

## Test Tensorflow
To test whether tensorflow is working:
```python
(tensorflow) aj@computer ~ % python
Python 3.9.5 | packaged by conda-forge | (default, Oct 19 2021, 17:32:20)
[Clang 11.1.0 ] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> import tensorflow as tf
Init Plugin
Init Graph Optimizer
Init Kernel
>>> print(tf.__version__)
2.8.0
>>>
```

## Tokenizers
[Installation — tokenizers  documentation](https://huggingface.co/docs/tokenizers/python/latest/installation/main.html)
```shell
# install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# activate conda
conda activate [NAME]

# in a new terminal:
git clone https://github.com/huggingface/tokenizers
cd tokenizers/bindings/python
pip install setuptools_rust
python setup.py install
```

## Transformers
```shell
conda activate tensorflow
pip install git+https://github.com/huggingface/transformers
```

## Hugging Face Dataset
[Installation — datasets 1.18.0 documentation](https://huggingface.co/docs/datasets/installation.html#conda)
```shell
conda install -c huggingface -c conda-forge datasets
```

# Troubleshooting
## MemoryError: Cannot allocate write+execute memory for ffi.callback()
https://github.com/dbt-labs/dbt-core/issues/3162#issuecomment-1011600708

To fix:

```shell
brew install libffi 
```

Download [wheel](https://files.pythonhosted.org/packages/3e/9b/660d6da900af1976a8b4efea713a7ce9e514bf4659eff9b17f90f00be1cf/cffi-1.15.0-cp39-cp39-macosx_11_0_arm64.whl)

Then install the wheel:

```shell
pip install --force-reinstall ~/Downloads/cffi-1.15.0-cp39-cp39-macosx_11_0_arm64.whl
```

## Cannot install tensorflow-macos or tensorflow-metal

If `pip` cannot find these packages, you may not be on a supported Python version. As of this writing, only Python 3.8-3.9 are supported, so switch to one of those versions.

# References
- [Huggingface Transformers on Apple M1](https://towardsdatascience.com/hugging-face-transformers-on-apple-m1-26f0705874d7)
- [AI - Apple Silicon Mac M1 natively supports TensorFlow 2.6 GPU acceleration (tensorflow-metal PluggableDevice) | MakeOptim](https://makeoptim.com/en/deep-learning/tensorflow-metal)
-  [How to Setup TensorFlow on Apple M1 Pro and M1 Max (works for M1 too)](https://www.mrdbourke.com/setup-apple-m1-pro-and-m1-max-for-machine-learning-and-data-science/)
- [How to use tensorflow.js in react.js — Object Detection | by Manfye Goh | Towards Data Science](https://towardsdatascience.com/how-to-use-tensorflow-js-in-react-js-object-detection-98b3782f08c2)

