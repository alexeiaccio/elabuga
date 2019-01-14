import React, { Component } from 'react'
import PropTypes from 'prop-types'
import propPathOr from 'crocks/helpers/propPathOr'
import posed, { PoseGroup } from 'react-pose'
import { css } from '@emotion/core'

import Accordion from './accordion'
import Button from './button'

const Modal = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    delay: 300,
    transition: {
      y: { ease: 'easeOut', duration: 300 },
      default: { duration: 200 },
    },
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: { duration: 150 },
  },
})

const Shade = posed.div({
  enter: { opacity: 0.5 },
  exit: { opacity: 0 },
})

class Query extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }

  handleClick = e => {
    e.preventDefault()

    this.setState(state => ({
      isOpen: !state.isOpen,
    }))
  }

  render() {
    const { body } = this.props
    const { isOpen } = this.state

    return (
      <>
        <Button
          css={css`
            ${tw(['mb-q24', 'mt-q48'])};
          `}
          onClick={this.handleClick}
          size="lg"
          type="button"
        >
          Написать свою историю
        </Button>

        <PoseGroup>
          {isOpen && [
            <Shade
              css={css`
                ${tw([
                  'bg-black',
                  'cursor-pointer',
                  'fixed',
                  'max-w-full',
                  'pin',
                ])};
              `}
              key="shade"
              onClick={this.handleClick}
            />,
            <Modal
              css={css`
                ${tw([
                  'absolute',
                  'bg-white',
                  'pin-l',
                  'pin-r',
                  'pin-t',
                  'max-w-full',
                  'm-q24',
                  'p-q24',
                  'shadow-text',
                ])};
              `}
              key="modal"
            >
              {body.map(({ id, primary, items }) => {
                const historytitle = propPathOr(
                  null,
                  ['historytitle', 'text'],
                  primary
                )

                return (
                  <div key={id}>
                    <h2>{historytitle}</h2>
                    <Accordion data={items} />
                  </div>
                )
              })}
            </Modal>,
          ]}
        </PoseGroup>
      </>
    )
  }
}

Query.propTypes = {
  body: PropTypes.arrayOf(PropTypes.any).isRequired,
}

export default Query
