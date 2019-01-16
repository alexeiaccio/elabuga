import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import propPathOr from 'crocks/helpers/propPathOr'
import uuid from 'node-uuid'

import Layout from '../components/layout'
import Seo from '../components/seo'
import RichContent from '../components/rich-content'
import { Heading1 } from '../components/typography'

const cardStyles = css`
  ${tw(['bg-white', 'my-q48', 'px-q24', 'py-q36', 'shadow-text'])};
`

function HistoriesPage({ data, location }) {
  const seoData = propPathOr(null, ['seo', 'data'], data)
  const pageTitle = propPathOr(null, ['title', 'text'], seoData)
  const description = propPathOr(null, ['description'], seoData)
  const pageKeywords = propPathOr(null, ['seokeywords'], seoData)
  const pageImage = propPathOr(
    propPathOr(null, ['image', 'fb', 'url'], seoData),
    ['image', 'fb', 'localFile', 'childImageSharp', 'fixed', 'src'],
    seoData
  )
  const image = propPathOr(null, ['image'], seoData)
  const title = propPathOr(null, ['title', 'html'], seoData)
  const pathname = propPathOr('/', ['location', 'pathname'], location)
  const histories = propPathOr(null, ['histories', 'edges'], data)

  return (
    <Layout image={image}>
      <Seo
        pageTitle={pageTitle}
        pageDescription={description}
        pageKeywords={pageKeywords}
        pageImage={pageImage}
        pathname={pathname}
      />
      <div css={cardStyles}>
        <RichContent
          content={title}
          css={css`
            h1 {
              ${Heading1};
            }
          `}
        />
        <div
          css={css`
            ${tw(['font-semibold', 'mt-q12', 'text-lg'])}
          `}
        >
          {description}
        </div>
      </div>
      {histories.map(({ node }) => {
        const history = propPathOr(null, ['history'], node)
        const date = propPathOr(null, ['date'], node)
        const name = propPathOr(null, ['name'], node)
        const redacted = propPathOr(null, ['redacted'], node)

        return (
          <div css={cardStyles} key={uuid()}>
            <div>{history}</div>
            <div>
              <span>{name}</span>
              <span>{date}</span>
              {redacted && <span>✎</span>}
            </div>
          </div>
        )
      })}
    </Layout>
  )
}

HistoriesPage.propTypes = {
  data: PropTypes.shape({
    histories: PropTypes.object.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

export default HistoriesPage

export const PageQuery = graphql`
  query HistoriesQuery($skip: Int!, $limit: Int!) {
    histories: allGoogleSheetRow(
      filter: { moderated: { eq: "yes" } }
      sort: { fields: [date], order: ASC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          date
          name
          history
          redacted
        }
      }
    }
    seo: prismicHomepage {
      data {
        title {
          text
          html
        }
        description
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
      }
    }
  }
`
