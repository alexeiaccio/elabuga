import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { Helmet } from 'react-helmet'
import propPathOr from 'crocks/helpers/propPathOr'
import uuid from 'node-uuid'

import Img from './img'
import Bullets from './bullets'

const slideStyles = css`
  ${tw(['relative'])};
  & .slide-image {
    max-height: 66.66666vh;
  }
`

class Slider extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  constructor() {
    super()
    this.state = {
      current: 0,
    }
  }

  next = () => {
    const { items } = this.props
    this.setState(({ current }) => ({
      current: (current + 1) % items.length,
    }))
  }

  previous = () => {
    const { items } = this.props
    this.setState(({ current }) => ({
      current: (current - 1) % items.length,
    }))
  }

  to = value => {
    this.setState({ current: value })
  }

  render() {
    const { items } = this.props
    if (!items) return null

    const { current } = this.state

    return (
      <>
        <Helmet>
          {items.map(({ images }) => {
            const imgSrc = propPathOr(
              null,
              ['localFile', 'childImageSharp', 'fluid', 'src'],
              images
            )

            return <link key={uuid} rel="preload" href={imgSrc} as="image" />
          })}
        </Helmet>
        <div
          css={slideStyles}
          onClick={items.length > 1 ? this.next : null}
          onKeyUp={items.length > 1 ? this.next : null}
        >
          {items.map(({ images }, idx) =>
            idx === current ? (
              <Img
                className="slide-image"
                key={uuid()}
                imgStyle={{ objectFit: 'contain' }}
                src={images}
              />
            ) : null
          )}
        </div>
        <Bullets active={current} length={items.length} onClick={this.to} />
      </>
    )
  }
}

export default Slider
