exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const notesTemplate = require.resolve(`./src/templates/noteTemplate.js`)
  const categoryTemplate = require.resolve(`./src/templates/categoryTemplate.js`)

  const result = await graphql(`
    {
      allFile {
        edges {
          node {
            childMdx {
              slug
            }
          }
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

  result.data.allFile.edges.forEach(({ node }) => {
    createPage({
      path: `garden/${node.childMdx.slug}`,
      component: notesTemplate,
      context: {
        // additional data can be passed via context
        slug: node.childMdx.slug,
      },
    })
  })

  result.data.allDirectory.edges.forEach(({ node }) => {
    createPage({
      path: `garden/${node.name}`,
      component: categoryTemplate,
    })
  })
}
