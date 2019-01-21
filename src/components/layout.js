import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Global, css } from '@emotion/core'
import propPathOr from 'crocks/helpers/propPathOr'
import { StaticQuery, graphql } from 'gatsby'

import Img from './img'
import Seo from './seo'
import RichContent from './rich-content'
import { Heading1 } from './typography'

import '../fonts/open-sans/stylesheet.css'
import '../fonts/plex/stylesheet.css'

const cardStyles = css`
  ${tw(['py-q24'])};
`

function Layout({ children, data, location }) {
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
  const image = propPathOr(null, ['image'], pageData)

  return (
    <>
      <Seo
        pageTitle={pageTitle}
        pageDescription={description}
        pageKeywords={pageKeywords}
        pageImage={pageImage}
        pathname={pathname}
      />
      <Global
        styles={css`
          html {
            ${tw(['font-opensans'])};
          }
          body {
            ${tw(['m-0', 'p-0'])}
          }
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          a {
            ${tw(['font-plex'])};
          }
        `}
      />
      <Img
        backgroundColor="#abacad"
        fadeIn
        src={image}
        style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      />
      <div
        css={css`
          ${tw(['bg-black', 'fixed', 'opacity-25', 'pin'])};
        `}
      />
      <div
        css={css`
          ${tw([
            'bg-white',
            'max-w-md',
            'mx-auto',
            'my-q48',
            'p-q24',
            'shadow-text',
            'relative',
            'md:my-q72',
          ])}
        `}
      >
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
        {children}
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.objectOf(PropTypes.object).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

const WithStaticQuery = props => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        homepage: prismicHomepage {
          data {
            title {
              html
              text
            }
            description
            seokeywords
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
            image {
              url
              localFile {
                childImageSharp {
                  fluid(maxWidth: 1920, quality: 80, jpegProgressive: true) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => <Layout data={data} {...props} />}
  />
)

export default memo(WithStaticQuery)
