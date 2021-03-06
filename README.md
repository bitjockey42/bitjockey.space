# bitjockey.space

Initialized from [here](https://dev.to/bathrobe/creating-a-diy-digital-garden-with-obsidian-and-gatsby-378e).

- [bitjockey.space](#bitjockeyspace)
- [Setup](#setup)
  - [Folders](#folders)
  - [Templates](#templates)

# Setup

## Folders

Set up these folders:

```shell
mkdir -p content/{garden,_private/templates}
```

## Templates

Enable the Templates Core Plugin in Obsidian settings.

Go back to the Obisidan settings -> Core Plugins -> Templates -> click gear icon. Set the templates folder to `_private/_templates`.

Create a note under that templates folder called Frontmatter and enter this:

```yaml
---
title: "{{title}}"
date: {{date}}T{{time}}
---
```

From now on, when you create a note, you can do <kbd>Ctrl/Cmd+p</kbd> and type in "Insert template" to automatically fill in the frontmatter.
