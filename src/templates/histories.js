import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

function HistoriesPage({ data }) {
  console.log(data)

  return <div>Poop</div>
}

HistoriesPage.propTypes = {
  data: PropTypes.shape({
    histories: PropTypes.object.isRequired,
  }).isRequired,
  // location: PropTypes.shape({
  //   pathname: PropTypes.string,
  // }).isRequired,
}

export default HistoriesPage

export const PageQuery = graphql`
  query HistoriesQuery($skip: Int!, $limit: Int!) {
    histories: allGoogleSheetRow(
      filter: { moderated: { eq: "yes" } }
      sort: { fields: [date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          date
          name
          history
          redacted
        }
      }
    }
  }
`
