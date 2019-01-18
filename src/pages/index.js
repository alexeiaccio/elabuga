import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import propPathOr from 'crocks/helpers/propPathOr'
import posed from 'react-pose'
import uuid from 'node-uuid'

import Accordion from '../components/accordion'
import Form from '../components/form'
import Layout from '../components/layout'
import Query, { Label } from '../components/query'
import Seo from '../components/seo'
import Slider from '../components/slider'
import RichContent from '../components/rich-content'
import { Heading1, Heading4 } from '../components/typography'
import { RichText } from '../components/rich-text'

const cardStyles = css`
  ${tw(['py-q24'])};
`

const historyStyles = css`
  ${tw(['py-q8'])};
`

const Content = posed.div({
  closed: {
    applyAtEnd: { display: 'none' },
    height: 0,
  },
  open: {
    applyAtStart: { display: 'block' },
    height: 'auto',
  },
})

class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tag: null,
    }
  }

  renderHistories = body => {
    const { tag } = this.state
    const success = propPathOr(
      null,
      ['data', 'homepage', 'data', 'success', 'html'],
      this.props
    )

    return (
      <>
        <div css={historyStyles}>
          <h2 css={Heading4}>1. Выберите тип вашей истории</h2>
        </div>
        {body.map(({ id, items, primary }) => {
          const historytitle = propPathOr(
            null,
            ['historytitle', 'text'],
            primary
          )

          return (
            <div css={historyStyles} key={uuid()}>
              <input
                defaultChecked={tag === historytitle}
                css={css`
                  ${tw(['hidden'])};
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
        <Content
          css={css`
            ${tw(['overflow-hidden'])};
          `}
          pose={tag ? 'open' : 'closed'}
        >
          <div
            css={css`
              ${cardStyles};
              ${tw(['my-0'])};
            `}
          >
            <h2
              css={css`
                ${Heading4};
                ${tw(['mb-q36'])};
              `}
            >
              2. Заполните форму
            </h2>
            <Form tag={tag} success={success} />
          </div>
        </Content>
      </>
    )
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
    const title = propPathOr(null, ['title', 'html'], pageData)
    const description = propPathOr(null, ['description'], pageData)
    const date = propPathOr(null, ['date'], pageData)
    const fromNow = propPathOr(null, ['fromNow'], pageData)
    const success = propPathOr(null, ['success', 'html'], pageData)
    const body = propPathOr(null, ['body'], pageData)
    const historyBody = body.filter(
      ({ __typename }) => __typename === 'PrismicHomepageBodyHisory'
    )

    return (
      <Layout>
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
          <Query body={historyBody} success={success} />
          <div>
            Cбор историй завершится <b>{fromNow}</b> – {date}
          </div>
        </div>
        <div>
          {body.map(({ __typename, primary, items }, idx) => {
            const text = propPathOr(null, ['text', 'html'], primary)

            return (
              <Fragment key={uuid()}>
                {__typename === 'PrismicHomepageBodyText' && (
                  <div css={cardStyles} key={uuid()}>
                    <RichContent css={RichText} content={text} />
                  </div>
                )}
                {__typename === 'PrismicHomepageBodyHisory' &&
                  propPathOr(null, [idx - 1, '__typename'], body) !==
                    'PrismicHomepageBodyHisory' &&
                  this.renderHistories(historyBody)}
                {__typename === 'PrismicHomepageBodyImageGallery' && (
                  <div css={cardStyles} key={uuid()}>
                    <Slider items={items} />
                  </div>
                )}
              </Fragment>
            )
          })}
        </div>
      </Layout>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    homepage: PropTypes.object.isRequired,
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
        success {
          html
        }
        body {
          __typename
          ... on PrismicHomepageBodyText {
            primary {
              text {
                html
              }
            }
          }
          ... on PrismicHomepageBodyHisory {
            id
            primary {
              historytitle {
                text
              }
            }
            items {
              sampletitle {
                text
              }
              sampletext {
                html
              }
            }
          }
          ... on PrismicHomepageBodyImageGallery {
            items {
              images {
                url
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 640, quality: 80, jpegProgressive: true) {
                      ...GatsbyImageSharpFluid_noBase64
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
