---
title: Sowing a digital garden with GatsbyJS and Obsidian
created: 2022-02-07T14:06
updated: 2026-02-14T02:14
tags:
  - how-to
  - development
  - garden
stage: budding
---

# Overview

In this I will describe the steps I took to create this [[Digital Garden]]. You can view the code for this garden [here](https://github.com/bitjockey42/bitjockey.space) on GitHub. It's built using `Gatsby` and published to GitHub pages with Actions.

# Ingredients
- [[Obsidian]] - what I'm using to write this
- [Gatsby](https://www.gatsbyjs.com/) - the JS framework that powers this site

# Project Structure

```
$ tree -I 'node_modules|public' -L 2
.
├── CNAME
├── LICENSE
├── README.md
├── content
│   ├── _private
│   └── garden
├── gatsby-config.js
├── gatsby-node.js
├── package-lock.json
├── package.json
├── resolve-url.js
├── src
│   ├── assets
│   ├── components
│   ├── pages
│   └── templates
└── static
    └── favicon.ico
```

# Gatsby

You can see a more detailed guide [here](https://www.gatsbyjs.com/docs/tutorial/part-0/) on setting Gatsby up.

## Setup gatsby-cli

```shell
npm install -g gatsby-cli
```

## Initialize project

Based on [this](https://www.gatsbyjs.com/docs/tutorial/part-1/).

To initialize a `gatsby` site, type the command below.

```shell
gatsby new
```

Then, follow the prompts:

```shell
What would you like to call your site?
✔ · My Gatsby Site

What would you like to name the folder where your site will be created?
✔ tutorials/ my-gatsby-site

✔ Will you be using a CMS?
· No (or I'll add it later)

✔ Would you like to install a styling system?
· Sass

✔ Would you like to install additional features with other plugins?
· Add page meta tags with React Helmet

Thanks! Here's what we'll now do:

    🛠  Create a new Gatsby site in the folder my-gatsby-site
    🎨 Get you set up to use Sass for styling your site
    🔌 Install gatsby-plugin-react-helmet, gatsby-plugin-mdx

```

## Install Dependencies

```shell
cd my-gatsby-site
npm i gatsby-plugin-catch-links \
	gatsby-remark-autolink-headers \
	gatsby-remark-double-brackets-link \
	gatsby-remark-obsidian \
	gatsby-transformer-markdown-references \
	postcss-loader
```

The `dependencies` array in `package.json` will look something like this:
```json
{
	...
	"dependencies": {
	    "bulma": "^0.9.3",
	    "bulmaswatch": "^0.8.1",
	    "fork-awesome": "^1.2.0",
	    "gatsby": "^4.6.2",
	    "gatsby-plugin-catch-links": "^4.6.0",
	    "gatsby-plugin-local-search": "^2.0.1",
	    "gatsby-plugin-mdx": "^3.6.0",
	    "gatsby-plugin-mdx-embed": "^0.0.23",
	    "gatsby-plugin-react-helmet": "^5.7.0",
	    "gatsby-plugin-sass": "^5.6.0",
	    "gatsby-remark-autolink-headers": "^5.6.0",
	    "gatsby-remark-double-brackets-link": "^0.1.11",
	    "gatsby-remark-obsidian": "^0.5.0",
	    "gatsby-source-filesystem": "^4.6.0",
	    "gatsby-transformer-markdown-references": "^0.1.8",
	    "mdx-embed": "^0.0.23",
	    "moment": "^2.29.1",
	    "postcss-loader": "^4.3.0",
	    "react": "^17.0.2",
	    "react-dom": "^17.0.2",
	    "react-helmet": "^6.1.0",
	    "react-use-flexsearch": "^0.1.1",
	    "sass": "^1.49.7",
	    "slugify": "^1.6.5"
	}
	...
}

```

## Install styling and search plugins

```shell
npm i bulma bulmaswatch fork-awesome moment react-use-flexsearch
```


# Obsidian

My primary note-taking and writing tool is [[Obsidian]]. The posts on here are all sourced from my Obsidian vault.

## Obsidian Desktop

1. Download Obsidian for your desktop OS.
2. Create a folder under the Gatsby project called `content`. This will be where the vault is.
3. Launch Obisidian and open `content` as an existing vault. Create a `_private/_templates` and `garden` folders. `garden` is where the notes will live.
4. Enable the Templates plugin in Settings -> Core Plugins -> Templates. Click on Options and set the "Template folder location" to `_private/_templates`. Create a new file under `_private/_templates/Frontmatter`  and enter this:
```
---
title: "{{title}}"
created: {{date}}T{{time}}
updated: {{date}}T{{time}}
tags: ["garden"]
stage: "seedling"
---
```
5. Go to Settings -> Community Plugins and disable Restricted mode (if it's not already disabled). Click on "Browse" and search for "Updated modified date". Install and enable this plugin, then go to the options. Set **Modified date property** to `updated`, then change **Date format** to `YYYY-MM-DDTHH:mm`. Turn on **Only update existing fields** and **Use typing events instead of Obsidian events**.
6. **To setup sync** (optional) This requires the [sync](https://obsidian.md/sync) plan, which is a paid plan for Obsidian. Go to Settings -> Sync and click "Connect" next to **Remote vault**. You may have to log in before this.

## Obsidian Mobile

1. **To insert templates:** In Options -> Mobile -> Configure mobile Quick Action, look for the Templates: Insert template command by hitting the (+) button. This will add it to the toolbar in the editor. You can also configure it to be the Quick Action so that the template will be inserted when you do the pull down gesture. I found that this was a little too active, so I left it off.


# Deploying to GitHub Pages

1. Create the  `.github/workflows` directory: `mkdir -p .github/workflows`.
2. Create a file under that directory `gatsby.yml` and paste the contents of [this](https://raw.githubusercontent.com/bitjockey42/bitjockey.space/refs/heads/develop/.github/workflows/gatsby.yml) into it. You may have to change the `develop` value for `branches` to whatever your main branch is named.
3. You'll then need to create a personal access token. Go to your GitHub profile page (click on the avatar photo and then "Settings"), navigate to "Developer settings".  Go to "Personal access tokens"  -> "Tokens (classic)".  Click on "Generate new token" -> "Generate new token (classic)". You'll be prompted for your password/passkey/verification code. Then check all the options for "Repo". Create the token, and copy the value.
4. In the GitHub repo settings, go to Security -> Secrets and variables -> Actions. Create a new repository secret and name it `ACCESS_TOKEN`. In the `value` textbox, paste in the personal access token created in the previous step.

# Workflow

This is my general workflow to tend to this digital garden.

## Creating a new post
1. In Obsidian, create a new file under the `garden` folder. 
2. Press <kbd>CMD+p</kbd> or <kbd>Ctrl+p</kbd> and search for "Insert frontmatter" to insert the Gatsby post frontmatter. You can change the values in it to whatever you like, although I wouldn't recommend manually changing the timestamps (this should be handled by plugins as stated above).
3. Type in some text, regale about experiences, etc. 
4. Commit the post in git: 
   ```shell
    git add content/garden/<new post name>.md
   ```

Then push the changes to `GitHub`:
```shell
git push origin
```

## Updating an existing post
1. I search for the file from within Obsidian.
2. I make the changes I need to the post, whether it's the content itself or something in the frontmatter.
3. The *Updated modified date* plugin should handle updating the `updated` timestamp, with some delay.
4. I commit the changes to `git`:
```shell
   git commit -am "Update post"
```

Then, like before, push to `GitHub`:
```shell
git push origin
```

# References
