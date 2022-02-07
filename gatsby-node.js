exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
  {
    allMdx {
        nodes {
        id
        body
        parent {
            ... on File {
                name
            }
        }
        slug
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

  markdowns.forEach((node) => {
      const { id, body } = node;

      createPage({
          path: `/${node.slug}`,
          component: noteTemplate,
          context: { id, body },
      });
  });

  tags.forEach(({ tag }) => {
    createPage({
      path: `/tags/${tag}`,
      component: tagTemplate,
      context: {
        tag: tag,
      }
    })
  })
}
