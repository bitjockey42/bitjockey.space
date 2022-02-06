/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-mdx-embed`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `garden`,
        path: `${__dirname}/content/garden/`,
      },
    },
    {
      resolve: `gatsby-transformer-markdown-references`,
      options: {
        types: ["Mdx"], // or ['RemarkMarkdown'] (or both)
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-obsidian",
            options: {
              titleToURLPath: (title) => `/garden/${title}`,
            },
          },
        ],
      },
    },
  ],
}
