import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import propPathOr from 'crocks/helpers/propPathOr'
import 'isomorphic-fetch'

import Form from '../components/form'
import Img from '../components/img'
import Layout from '../components/layout'
import Seo from '../components/seo'
import RichContent from '../components/rich-content'

const H1 = styled.div`
  color: red;
`

function IndexPage({ data, location }) {
  const pageData = propPathOr(null, ['homepage', 'data'], data)
  const pageTitle = propPathOr(null, ['title', 'text'], pageData)
  const pageKeywords = propPathOr(null, ['seokeywords'], pageData)
  const pageImage = propPathOr(
    propPathOr(null, ['image', 'fb', 'url'], pageData),
    ['image', 'fb', 'localFile', 'childImageSharp', 'fixed', 'src'],
    pageData
  )
  const pathname = propPathOr('/', ['location', 'pathname'], location)
  const title = propPathOr(null, ['title', 'text'], pageData)
  const description = propPathOr(null, ['description'], pageData)
  const date = propPathOr(null, ['date'], pageData)
  const fromNow = propPathOr(null, ['fromNow'], pageData)
  const image = propPathOr(null, ['image'], pageData)
  const text = propPathOr(null, ['text', 'html'], pageData)
  const info = propPathOr(null, ['info', 'html'], pageData)
  const body = propPathOr(null, ['body'], pageData)

  const histories = propPathOr([], ['histories', 'edges'], data)

  return (
    <Layout image={image}>
      <Seo
        pageTitle={pageTitle}
        pageDescription={description}
        pageKeywords={pageKeywords}
        pageImage={pageImage}
        pathname={pathname}
      />
      <H1
        css={css`
          color: black;
        `}
      >
        {title}
      </H1>
      <div>{description}</div>
      <div>
        Cбора историй завершиться <b>{fromNow}</b> – {date}
      </div>
      <RichContent content={text} />
      <div>
        {body.map(({ id, primary }) => {
          const historytitle = propPathOr(
            null,
            ['historytitle', 'text'],
            primary
          )
          const historydescription = propPathOr(
            null,
            ['historydescription'],
            primary
          )
          const historyimage = propPathOr(null, ['historyimage'], primary)
          const historytext = propPathOr(null, ['historytext', 'html'], primary)

          return (
            <div key={id}>
              <h2>{historytitle}</h2>
              <div>{historydescription}</div>
              <Img src={historyimage} />
              <RichContent content={historytext} />
              <Form tag={historytitle} />
            </div>
          )
        })}
      </div>
      <RichContent content={info} />
      {histories.map(({ node }) => {
        const id = propPathOr(null, ['id'], node)
        const historyDate = propPathOr(null, ['date'], node)
        const name = propPathOr(null, ['name'], node)
        const history = propPathOr(null, ['history'], node)

        return (
          <div key={id}>
            <p>{historyDate}</p>
            <p>{name}</p>
            <p>{history}</p>
          </div>
        )
      })}
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    homepage: PropTypes.object.isRequired,
    histories: PropTypes.object.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

export default IndexPage

export const PageQuery = graphql`
  query IndexQuery {
    homepage: prismicHomepage {
      data {
        title {
          text
        }
        description
        date(formatString: "DD MMMM YYYY", locale: "ru")
        fromNow: date(fromNow: true, locale: "ru")
        image {
          url
          localFile {
            childImageSharp {
              fluid(maxWidth: 1920) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
          fb {
            url
            localFile {
              childImageSharp {
                fixed(width: 1200, height: 628) {
                  src
                }
              }
            }
          }
        }
        text {
          html
        }
        info {
          html
        }
        body {
          id
          primary {
            historytitle {
              text
            }
            historydescription
            historyimage {
              url
              localFile {
                childImageSharp {
                  fluid(maxWidth: 1920) {
                    ...GatsbyImageSharpFluid_noBase64
                  }
                }
              }
            }
            historytext {
              html
            }
          }
          items {
            sampletitle {
              text
            }
            sampleimage {
              url
              localFile {
                childImageSharp {
                  fluid(maxWidth: 1920) {
                    ...GatsbyImageSharpFluid_noBase64
                  }
                }
              }
            }
            sampletext {
              html
            }
          }
        }
      }
    }
    histories: allGoogleSheetRow {
      edges {
        node {
          id
          tag
          date
          name
          history
          redacted
        }
      }
    }
  }
`
