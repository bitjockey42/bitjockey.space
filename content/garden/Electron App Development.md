---
title: Electron App Development
created: 2026-02-14T01:37
updated: 2026-02-14T01:45
tags:
  - how-to
  - development
  - electron
stage: seedling
---
# Overview

Herein I will try to document what I did to make an Electron-based app.

# Requirements
- node v24 installed with [nvm](https://www.nvmnode.com/guide/download.html)
- [Electron Forge](https://www.electronforge.io/)
# Creating a new app

I created  a new app with this command; since I just wanted to port over a website with vanilla JS, I opted out of using the `vite` or `webpack` templates.

```shell
npx create-electron-app@latest my-app
```

# Packaging (signed) builds

## Windows

## Linux

## macOS