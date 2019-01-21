import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import posed from 'react-pose'
import { spring, value } from 'popmotion'
import propPathOr from 'crocks/helpers/propPathOr'

import Bullets from './bullets'
import Images from './slider-images'

const sliderStyles = css`
  ${tw(['overflow-hidden', 'relative'])};
  max-height: 66.66666vh;
  padding-bottom: 66.66666%;
`

const wrapperStyles = css`
  ${tw(['absolute', 'pin'])};
`

const Draggable = posed.div({
  draggable: 'x',
  dragEnd: {
    transition: ({ from, to, velocity }) =>
      spring({ from, to, velocity, stiffness: 250, damping: 50 }),
  },
})

class Slider extends PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  constructor() {
    super()
    this.state = {
      current: 0,
      clientX: null,
    }
    this.x = value(0)
  }

  handleDragStart = e => {
    const { clientX } = propPathOr(e, ['touches', 0], e)
    this.setState({ clientX })
  }

  handleDragEnd = e => {
    const { items } = this.props
    const { clientX: oldClientX, current } = this.state
    const { clientX: newClientX } = propPathOr(e, ['changedTouches', 0], e)

    if (current + 1 < items.length && newClientX - oldClientX < -30) {
      this.setState({ current: current + 1 })
    } else if (current > 0 && newClientX - oldClientX > 30) {
      this.setState({ current: current - 1 })
    }
    this.setState({ clientX: null })
  }

  to = number => {
    this.setState({ current: number })
  }

  render() {
    const { items } = this.props
    if (!items) return null

    const { current, clientX } = this.state
    const valuesMap = { x: this.x }

    return (
      <>
        <div css={sliderStyles}>
          <Draggable
            css={css`
              ${wrapperStyles};
              cursor: ${clientX ? 'grab' : 'grabbing'};
            `}
            onDragEnd={this.handleDragEnd}
            onDragStart={this.handleDragStart}
            values={valuesMap}
          >
            <Images current={current} items={items} />
          </Draggable>
        </div>
        <Bullets active={current} length={items.length} onClick={this.to} />
      </>
    )
  }
}

export default Slider
