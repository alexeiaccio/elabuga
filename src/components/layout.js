import React from 'react'
import PropTypes from 'prop-types'
import { Global, css } from '@emotion/core'

import Img from './img'

import '../fonts/open-sans/stylesheet.css'
import '../fonts/plex/stylesheet.css'

function Layout({ children, image }) {
  return (
    <>
      <Global
        styles={css`
          html {
            ${tw(['font-opensans'])};
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
        src={image}
        style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgoundColor: '#abacad',
        }}
      />
      <div
        css={css`
          ${tw(['bg-white', 'mx-auto', 'max-w-md', 'p-q24', 'relative'])}
        `}
      >
        {children}
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  image: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default Layout
