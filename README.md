# bitjockey.space

Initialized from [here](https://dev.to/bathrobe/creating-a-diy-digital-garden-with-obsidian-and-gatsby-378e).

- [bitjockey.space](#bitjockeyspace)
- [Setup](#setup)
  - [Dependencies](#dependencies)
  - [Folders](#folders)
  - [Obsidian Sync](#obsidian-sync)
  - [Templates](#templates)
- [Usage](#usage)
- [Additional Tips](#additional-tips)
  - [Enable vim keybindings](#enable-vim-keybindings)

# Setup

## Dependencies

**Requirements**
- Node `v16.14.2`

**Recommended** Use [`nvm`](https://github.com/nvm-sh/nvm) to manage `node` versions.

```shell
nvm install v16.14.2
cd path/to/this/repo
nvm use
```

Then, install the packages:

```shell
# Install all node dependencies
npm install
```

# Setting up a new Obsidian Vault
## Folders

Set up these folders:

```shell
mkdir -p content/{garden,_private/_templates}
```

## Obsidian Sync

In the Obsidian main screen, select "Open folder as vault". Open the `content` folder.

Then, go to Settings by pressing <kbd>Ctrl+p</kbd> and searching for "settings".

Go to "Core Plugins" -> Sync; toggle on.

Click on the gear icon and set a Remote vault. This will require entering an encryption password if you have one set for that vault.

Now your Obsidian notes should sync with the local vault.

## Templates

### Enable Templates plugin

Enable the Templates Core Plugin in Obsidian settings.

Go back to the Obsidian settings -> Core Plugins -> Templates -> click gear icon. Set the templates folder to `_private/_templates`.

### Create new template

Create a note under that templates folder called Frontmatter and enter this:

```yaml
---
title: "{{title}}"
date: {{date}}T{{time}}
---
```

From now on, when you create a note, you can do <kbd>Ctrl/Cmd+p</kbd> and type in "Insert template" to automatically fill in the frontmatter.

# Existing Synced Obsidian Vault

In the Obsidian main screen, select "Open vault from Obsidian Sync". Click Setup. Then select the vault you want to use. In this example, I had a vault named "Garden" with a directory tree that looks like this:

```
_drafts  # Where any drafts are stored
_private # For Obsidian plugin files
|--_templates
garden   # Where the actual published posts are stored
```

Then, follow the [Templates](#enable-templates-plugin) section above on how to set up the templates plugin.

# Usage

After [Setup](#setup) above, run:

```shell
nvm use  # Activate v16.14.2
npm start  # Build in development mode and run
```

Then, go to http://localhost:8000/.

# Additional Tips

## Enable vim keybindings

Open Settings -> scroll down to Advanced -> toggle Vim key bindings on. This will "test" your compentency with `vim` navigation.
