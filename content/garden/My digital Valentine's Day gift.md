---
title: My digital Valentine's Day gift
created: 2026-02-13T21:08
updated: 2026-02-13T21:08
tags:
  - personal
stage: seedling
---
My wife and I are currently long-distance (at least until I get a visa to move to her country permanently), so we aren't able to celebrate Valentine's Day in person this year. And of course, with work obligations for us both and current issues in my country, it's been difficult to arrange for an in-person celebration. So we have contended with celebrating this occasion digitally, at least this year. (I hope that by the time I revisit this post next year, I'll actually be able to celebrate Valentine's Day in person with her). We've also promised to both ourselves and to each other to be frugal this year, so that limits our options quite a bit. Making each other digital gifts seemed like the perfect solution to our conundrum.

She loves jigsaw puzzles. She can get lost in them for hours if she's given free reign to do so. There's a specific jigsaw puzzle set she wanted, but it is sold out (and, as I just found out, completely off the shop site). And I can't seem to find it anywhere at all, at least not at an absurdly high price (plus we *did* say we weren't going to spend too much on gifts). So what is a developer to do but figure out how to create a digital version of that puzzle instead?

I started looking up algorithms to generate jigsaw puzzle pieces from any image and couldn't really find anything particularly useful or expedient enough to implement. Until, that is, I came across [this](https://codepen.io/Dillo/pen/QWKLYab) incredible codepen by [Dillo](https://codepen.io/Dillo) that does everything I wanted to see in a jigsaw puzzle game. Dillon was generous enough to put the code for the jigsaw puzzle under an open license, so I could adapt the code into something that my wife could use on her computer offline. While the codepen works very well as it is, you do need to be connected to the internet to play with it. 

Like many out there, I've also desperately been trying to get out of a doom-scrolling spiral enabled by outrage-driven social media algorithms. And what better way to do that than to focus on a new project, maybe learn new things?

One aspect of app development I hadn't yet (until recently) explored were Electron apps. I'll admit, when [ElectronJS](https://www.electronjs.org/) first entered the scene, I was a bit skeptical of its merits. But it's since become fairly commonplace in software development, especially for apps that require cross-platform desktop support. Notable examples of Electron-based apps include VS Code, Obsidian, Discord, the former 2 of which run incredibly well on every machine I own.

So I looked into [Electron Forge](https://www.electronforge.io/) and initialized a new project using it. Scaffolding a barebones Electron app is simple enough with that, and my needs were fairly simple anyway. I copied the codepen html, css, and js code into separate files and packaged them into the new project. Electron Forge also made it easy to build executables of the game.

I'll document the entire process of development in a separate post, but for now, you can see the results in GitHub [here](https://github.com/bitjockey42/jigsaw/releases/). I've made signed builds for Windows, macOS, and binaries for Linux (`*.deb` and `*.rpm`; am working on supporting `appimage`).

In the future, I'd like to rewrite the code a bit so I can add multiplayer/co-op support. That will take quite a bit of time, so time will tell when I'll be able to achieve that. For now, this works for single-player, offline fun.

I'll be showing my wife the project tomorrow for Valentine's Day. I know she'll appreciate the effort, but I genuinely hope she finds the game fun. 
