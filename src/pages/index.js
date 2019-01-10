import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

const H1 = styled.div`
  color: red;
`

function IndexPage({ data }) {
  console.log(data.homepage)

  return (
    <Fragment>
      <H1
        css={css`
          color: black;
        `}
      >
        {data.homepage.data.title.text}
      </H1>
    </Fragment>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    homepage: PropTypes.object.isRequired,
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
        date
        image {
          url
          localFile {
            childImageSharp {
              fluid {
                src
              }
            }
          }
          fb {
            url
          }
        }
        text {
          html
        }
        info {
          html
        }
        body {
          primary {
            historytitle {
              text
            }
            historydescription
            historyimage {
              url
              localFile {
                childImageSharp {
                  fluid {
                    src
                  }
                }
              }
            }
            historytext {
              html
            }
          }
        }
      }
    }
  }
`
