import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import { css } from '@emotion/core'
import propPathOr from 'crocks/helpers/propPathOr'
import uuid from 'node-uuid'

import Button from '../components/button'
import Layout from '../components/layout'
import Pagination from '../components/pagination'
import Seo from '../components/seo'
import RichContent from '../components/rich-content'
import { Heading1, Heading6 } from '../components/typography'

const cardStyles = css`
  ${tw(['bg-white', 'my-q48', 'px-q24', 'py-q36', 'shadow-text'])};
`

const smCardStyles = css`
  ${tw(['bg-white', 'my-q24', 'p-q24', 'shadow-text'])};
`

const LinkButton = Button.withComponent(Link)

function HistoriesPage({ data, location, pageContext }) {
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

  const { total } = pageContext
  const pluralize = x => (x % 100 === 1 ? 'ю' : x % 100 < 5 ? 'и' : 'й') // eslint-disable-line no-nested-ternary

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
      <div css={smCardStyles}>
        <h2 css={Heading6}>
          Мы уже собрали {total} истори{pluralize(total)}
        </h2>
      </div>
      <div css={smCardStyles}>
        <Pagination data={pageContext} />
      </div>
      {histories.map(({ node }) => {
        const history = propPathOr(null, ['history'], node)
        const date = propPathOr(null, ['date'], node)
        const name = propPathOr(null, ['name'], node)
        const redacted = propPathOr(null, ['redacted'], node)

        return (
          <div css={smCardStyles} key={uuid()}>
            <div>{history}</div>
            <div
              css={css`
                ${tw(['mt-q16', 'text-sm'])};
                color: #f0c41b;
              `}
            >
              <span
                css={css`
                  ${tw(['mr-q24'])};
                `}
              >
                {name}
              </span>
              <span>
                {new Date(date).toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              {redacted && (
                <span
                  css={css`
                    ${tw(['ml-q8'])};
                  `}
                >
                  ✎
                </span>
              )}
            </div>
          </div>
        )
      })}
      <div css={smCardStyles}>
        <Pagination data={pageContext} />
      </div>
      <div
        css={css`
          ${tw(['my-q48', 'text-center'])};
        `}
      >
        <LinkButton
          css={css`
            ${tw(['inline-block', 'no-underline', 'text-black'])};
          `}
          size="lg"
          to="/"
        >
          На главную
        </LinkButton>
      </div>
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
  pageContext: PropTypes.objectOf(PropTypes.any).isRequired,
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
