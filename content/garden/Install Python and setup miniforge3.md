---
title: "Install Python and setup miniforge3"
created: 2022-02-27T14:43
updated:
tags: ["how-to", "python"]
stage: "seedling"
---
# Setup

I use pyenv to handle different python versions.

## macOS
Using homebrew:
```shell
# Install homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install pyenv
brew install pyenv

# Install miniforge3
pyenv install miniforge3
```

To activate:
```shell
# Within the root of your project
pyenv local miniforge3

# Check that miniforge3 python is loaded
which python

# this should output something like: /Users/bitjockey/.pyenv/versions/miniforge3/bin/python
```
---
title: "Install Python and setup miniforge3"
created: 2022-02-27T19:59
updated:
tags: ["garden"]
stage: "seedling"
---
---
title: "Install Python and setup miniforge3"
created: 2022-02-27T19:59
updated:
tags: ["garden"]
stage: "seedling"
---
