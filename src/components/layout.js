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
            'relative',
            'shadow-text',
            'md:my-q72',
          ])}
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
