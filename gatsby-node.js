exports.createPages = async ({ actions, graphql, reporter }) => {
  const slugify = require("slugify")
  const { createPage } = actions

  const result = await graphql(`
    {
      allMdx(sort: { order: ASC, fields: frontmatter___tags }) {
        nodes {
          slug
          excerpt
        }
        allTags: group(field: frontmatter___tags) {
          tag: fieldValue
          totalCount
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const markdowns = result.data.allMdx.nodes
  const tags = result.data.allMdx.allTags

  const noteTemplate = require.resolve(`./src/templates/noteTemplate.js`)
  const tagTemplate = require.resolve(`./src/templates/tagTemplate.js`)

  markdowns.forEach(node => {
    const { slug } = node

    createPage({
      path: `/${slugify(node.slug)}`,
      component: noteTemplate,
      context: { slug },
    })
  })

  tags.forEach(({ tag }) => {
    createPage({
      path: `/tags/${tag}`,
      component: tagTemplate,
      context: {
        tag: tag,
      },
    })
  })
}
