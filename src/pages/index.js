import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import propPathOr from 'crocks/helpers/propPathOr'
import posed from 'react-pose'

import Accordion from '../components/accordion'
import Form from '../components/form'
import Layout from '../components/layout'
import Query, { Label } from '../components/query'
import Seo from '../components/seo'
import RichContent from '../components/rich-content'
import { Heading1, Heading4 } from '../components/typography'
import { RichText } from '../components/rich-text'

const Content = posed.div({
  closed: { height: 0 },
  open: { height: 'auto' },
})
class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tag: null,
    }
  }

  render() {
    const { tag } = this.state
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
    const title = propPathOr(null, ['title', 'html'], pageData)
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
        <Query body={body} />
        <div>
          Cбор историй завершится <b>{fromNow}</b> – {date}
        </div>
        <RichContent css={RichText} content={text} />
        <h2
          css={css`
            ${Heading4};
            ${tw(['mb-q24', 'mt-q48'])};
          `}
        >
          1. Выберите тип вашей истории
        </h2>
        <div>
          {body.map(({ id, primary, items }) => {
            const historytitle = propPathOr(
              null,
              ['historytitle', 'text'],
              primary
            )

            return (
              <div key={id}>
                <input
                  defaultChecked={tag === historytitle}
                  css={css`
                    ${tw(['hidden'])};
                    &:checked ~ label::before {
                      background-color: #f0c41b;
                    }
                  `}
                  id={id}
                  name="history-tag"
                  type="radio"
                  value={historytitle}
                />
                <Label
                  onClick={() => this.setState({ tag: historytitle })}
                  checked={tag === historytitle}
                >
                  {historytitle}
                </Label>
                <Accordion data={items} />
              </div>
            )
          })}
        </div>
        <Content
          css={css`
            ${tw(['overflow-hidden'])};
          `}
          pose={tag ? 'open' : 'closed'}
        >
          <h2
            css={css`
              ${Heading4};
              ${tw(['mb-q24', 'mt-q48'])};
            `}
          >
            2. Заполните форму
          </h2>
          <Form tag={tag} />
          <RichContent content={info} />
        </Content>
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
          html
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
