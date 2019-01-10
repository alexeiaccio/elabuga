/** @jsx jsx */
import { jsx } from '@emotion/core'
import PropTypes from 'prop-types'

const RichContent = ({ content, ...props }) =>
  content ? (
    <div dangerouslySetInnerHTML={{ __html: content }} {...props} /> // eslint-disable-line react/no-danger
  ) : null

RichContent.propTypes = {
  content: PropTypes.string.isRequired,
}

export default RichContent
