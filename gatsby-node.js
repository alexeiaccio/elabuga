const path = require('path')

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const pages = await graphql(`
    {
      histories: allGoogleSheetRow(filter: { moderated: { eq: "yes" } }) {
        edges {
          node {
            id
          }
        }
      }
    }
  `)

  const histories = pages.data.histories.edges
  const postsPerPage = 10
  const numPages = Math.ceil(histories.length / postsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/histories` : `/histories/${i + 1}`,
      component: path.resolve('./src/templates/histories.js'),
      context: {
        currentPage: i + 1,
        limit: postsPerPage,
        numPages,
        skip: i * postsPerPage,
        total: histories.length,
      },
    })
  })
}

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: 'babel-plugin-tailwind',
  })
}
