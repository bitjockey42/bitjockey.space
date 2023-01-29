# bitjockey.space

Initialized from [here](https://dev.to/bathrobe/creating-a-diy-digital-garden-with-obsidian-and-gatsby-378e).

- [bitjockey.space](#bitjockeyspace)
- [Setup](#setup)
  - [Dependencies](#dependencies)
  - [Folders](#folders)
  - [Obsidian Sync](#obsidian-sync)
  - [Templates](#templates)
- [Usage](#usage)

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

## Folders

Set up these folders:

```shell
mkdir -p content/{garden,_private/templates}
```

## Obsidian Sync

In the Obsidian main screen, select "Open folder as vault". Open the `content` folder.

Then, go to Settings by pressing <kbd>Ctrl+p</kbd> and searching for "settings".

Go to "Core Plugins" -> Sync; toggle on.

Click on the gear icon and set a Remote vault. This will require entering an encryption password if you have one set for that vault.

Now your Obsidian notes should sync with the local.

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

# Usage

After [Setup](#setup) above, run:

```shell
nvm use  # Activate v16.14.2
npm start  # Build in development mode and run
```

Then, go to http://localhost:8000/.
