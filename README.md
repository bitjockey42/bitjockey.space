# Gatsby + Obsidian

Very simple example of using [Obsidian](https://obsidian.md) to publish a digital garden on [Gatsby](https://gatsbyjs.com).

You can check out the guide [here](https://dev.to/bathrobe/creating-a-diy-digital-garden-with-obsidian-and-gatsby-378e).

## Templates

Enable the Templates Core Plugin in Obsidian settings.

Create a folder in the vault: `content/_private`

```shell
mkdir -p content/_private/_templates
```

Go back to the Obisidan settings -> Core Plugins -> Templates -> click gear icon. Set the templates folder to `_private/_templates`.

Create a note under that templates folder called Frontmatter and enter this:

```markdown
---
title: "{{title}}"
date: {{date}}T{{time}}
---
```

From now on, when you create a note, you can do <kbd>Ctrl/Cmd+p</kbd> and type in "Insert template" to automatically fill in the frontmatter.