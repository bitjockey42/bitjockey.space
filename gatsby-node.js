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
        }
      allDirectory {
        edges {
          node {
            name
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const markdowns = result.data.allMdx.nodes
  const categories = result.data.allDirectory.edges 

  const noteTemplate = require.resolve(`./src/templates/noteTemplate.js`)
  const categoryTemplate = require.resolve(`./src/templates/categoryTemplate.js`)

  markdowns.forEach((node) => {
      const { id, body } = node;

      createPage({
          path: `/${node.parent.name}`,
          component: noteTemplate,
          context: { id, body },
      });
  });

  categories.forEach(({ node }) => {
    createPage({
      path: `/${node.name}`,
      component: categoryTemplate,
      context: {
        categoryName: node.name,
        categoryRegex: `/${node.name}/`,
      }
    })
  })
}
