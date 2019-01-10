const path = require('path')

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const pageMaker = (type, data) => {
    data.map(({ node }) => {
      const { uid } = node
      createPage({
        component: path.resolve(`src/templates/${type}.js`),
        context: {
          uid,
        },
        path: uid,
      })
      return false
    })
  }

  const pages = await graphql(`
    {
      volumes: allPrismicVolume {
        edges {
          node {
            uid
          }
        }
      }
      chapters: allPrismicChapter {
        edges {
          node {
            uid
          }
        }
      }
      texts: allPrismicText {
        edges {
          node {
            uid
          }
        }
      }
    }
  `)

  pageMaker('texts', pages.data.texts.edges)
}

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: 'babel-plugin-tailwind',
  })
}
