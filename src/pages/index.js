import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import propPathOr from 'crocks/helpers/propPathOr'
import 'isomorphic-fetch'

import Img from '../components/img'
import Seo from '../components/seo'
import RichContent from '../components/rich-content'

const H1 = styled.div`
  color: red;
`

class IndexPage extends Component {
  componentDidMount() {
    const name = 'Poop'
    const contact = 'poop@po.op'
    const msg = 'Lorem ipsum'
    fetch(
      `https://v66qfxaz26.execute-api.us-east-1.amazonaws.com/dev/send?name=${name}&contact=${contact}&msg=${msg}`
    )
      .then(console.log) // eslint-disable-line
      .catch(console.error) // eslint-disable-line
  }

  render() {
    const { data, location } = this.props
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
      <Fragment>
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
        <Img src={image} />
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
            const historytext = propPathOr(
              null,
              ['historytext', 'html'],
              primary
            )

            return (
              <div key={id}>
                <h2>{historytitle}</h2>
                <div>{historydescription}</div>
                <Img src={historyimage} />
                <RichContent content={historytext} />
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
      </Fragment>
    )
  }
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
        }
      }
    }
    histories: allGoogleSheetRow(filter: { published: { eq: "yes" } }) {
      edges {
        node {
          id
          date
          name
          history
        }
      }
    }
  }
`
