/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
const slugify = require("slugify")

module.exports = {
  /* Your site config here */
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-mdx-embed`,
    {
      resolve: "gatsby-plugin-local-search",
      options: {
        // A unique name for the search index. This should be descriptive of
        // what the index contains. This is required.
        name: "pages",

        // Set the search engine to create the index. This is required.
        // The following engines are supported: flexsearch, lunr
        engine: "flexsearch",

        // Provide options to the engine. This is optional and only recommended
        // for advanced users.
        //
        // Note: Only the flexsearch engine supports options.
        engineOptions: "speed",

        // GraphQL query used to fetch all data for the search index. This is
        // required.
        query: `
          {
            allMdx {
              nodes {
                id
                body
                excerpt
                frontmatter {
                  title
                }
                slug
              }
            }
          }
        `,

        // Field used as the reference value for each document.
        // Default: 'id'.
        ref: "id",

        // List of keys to index. The values of the keys are taken from the
        // normalizer function below.
        // Default: all fields
        index: ["title", "body"],

        // List of keys to store and make available in your UI. The values of
        // the keys are taken from the normalizer function below.
        // Default: all fields
        store: ["id", "slug", "title", "excerpt"],

        // Function used to map the result from the GraphQL query. This should
        // return an array of items to index in the form of flat objects
        // containing properties to index. The objects must contain the `ref`
        // field above (default: 'id'). This is required.
        normalizer: ({ data }) =>
          data.allMdx.nodes.map(node => ({
            id: node.id,
            title: node.frontmatter.title,
            body: node.body,
            excerpt: node.excerpt,
            slug: node.slug,
          })),
      },
    },
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
          `gatsby-remark-autolink-headers`,
          {
            resolve: "gatsby-remark-obsidian",
            options: {
              titleToURL: title => `/${slugify(title)}`,
            },
          },
        ],
      },
    },
  ],
}
