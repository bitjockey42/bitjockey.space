# bitjockey.space

Initialized from [here](https://dev.to/bathrobe/creating-a-diy-digital-garden-with-obsidian-and-gatsby-378e).

- [bitjockey.space](#bitjockeyspace)
- [Setup](#setup)
  - [Dependencies](#dependencies)
- [Setting up the Obsidian vault](#setting-up-the-obsidian-vault)
  - [Setting up a new vault](#setting-up-a-new-vault)
  - [Setting up Obsidian Sync with a Remote Vault](#setting-up-obsidian-sync-with-a-remote-vault)
  - [Templates](#templates)
    - [Enable Templates plugin](#enable-templates-plugin)
    - [Create new template](#create-new-template)
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

# Setting up the Obsidian vault
## Setting up a new vault

Under the root directory of this repo, create these folders:

```shell
mkdir -p content/{garden,_private/_templates}
```

These will house the actual posts to be published and the templates that will be used.

In the Obsidian main screen, select "Open folder as vault". Open the `content` folder.

## Setting up Obsidian Sync with a Remote Vault

If you have an [Obsidian Sync](https://obsidian.md/sync) subscription, you can set up a remote vault as well.

Then, go to Settings by pressing <kbd>Ctrl+p</kbd> and searching for "settings".

Go to "Core Plugins" -> Sync; toggle on.

Click on the gear icon and set a Remote vault. This will require entering an encryption password if you have one set for that vault.

Now your Obsidian notes should sync with the local vault and vice versa.

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
