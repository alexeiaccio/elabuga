import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import { css } from '@emotion/core'
import propPathOr from 'crocks/helpers/propPathOr'
import uuid from 'node-uuid'

import Button from '../components/button'
import Layout from '../components/layout'
import Pagination from '../components/pagination'
import { Heading6 } from '../components/typography'

const cardStyles = css`
  ${tw(['border-b', 'border-t', 'border-grey-lighter', 'my-q24', 'p-q24'])};
  border-bottom-style: solid;
  border-top-style: solid;
`

const smCardStyles = css`
  ${tw([
    'border-b',
    'border-t',
    'border-grey-lighter',
    'my-q24',
    'px-q24',
    'py-q12',
  ])};
  border-bottom-style: solid;
  border-top-style: solid;
`

const LinkButton = Button.withComponent(Link)

function HistoriesPage({ data, location, pageContext }) {
  const histories = propPathOr(null, ['histories', 'edges'], data)

  const { total } = pageContext
  const pluralize = x => (x % 100 === 1 ? 'ю' : x % 100 < 5 ? 'и' : 'й') // eslint-disable-line no-nested-ternary

  return (
    <Layout location={location}>
      <div css={cardStyles}>
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
          <div css={cardStyles} key={uuid()}>
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
  }
`
