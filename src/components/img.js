/** @jsx jsx */
import { jsx } from '@emotion/core'
import PropTypes from 'prop-types'
import GatsbyImg from 'gatsby-image'

import propPathOr from 'crocks/helpers/propPathOr'

function Img({ src, ...props }) {
  if (!src) return null

  const fluid = propPathOr(null, ['localFile', 'childImageSharp', 'fluid'], src)
  const url = propPathOr(null, ['url'], src)

  if (!fluid) {
    if (!url) return null

    return <img src={url} alt="" width="100%" {...props} />
  }
  return <GatsbyImg fluid={fluid} {...props} />
}

Img.propTypes = {
  src: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  ),
}

Img.defaultProps = {
  src: null,
}

export default Img
