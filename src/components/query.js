import React, { Component } from 'react'
import PropTypes from 'prop-types'
import propPathOr from 'crocks/helpers/propPathOr'
import posed, { PoseGroup } from 'react-pose'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

import Accordion from './accordion'
import Button from './button'
import Form from './form'
import { Heading4 } from './typography'

const Tab = posed.div({
  enter: {
    x: 0,
    opacity: 1,
    delay: 400,
    transition: {
      y: { ease: 'easeOut', duration: 300 },
      default: { duration: 200 },
    },
  },
  exit: {
    x: 50,
    opacity: 0,
    transition: { duration: 150 },
  },
})

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

const checkedStyles = ({ checked }) => css`
  &::before {
    background-color: ${checked && '#f0c41b'};
  }
`

export const Label = styled.label`
  ${tw([
    'cursor-pointer',
    'block',
    'font-bold',
    'mt-0',
    'mb-q8',
    'pl-q36',
    'relative',
    'text-3xl',
    'w-full',
  ])};
  box-sizing: border-box;
  &::before {
    ${tw(['absolute', 'block', 'pin-l', 'w-q16', 'h-q16', 'rounded-full'])};
    border: 2px solid #f0c41b;
    bottom: 0.5rem;
    content: '';
  }
  &::after {
    ${tw([
      'absolute',
      'bg-yellow-lighter',
      'hidden',
      'pin-r',
      'px-q8',
      'py-q4',
      'text-sm',
    ])};
    bottom: 0.35rem;
    content: 'Выбрать';
  }
  &:hover::after {
    ${tw(['inline-block'])};
  }
  ${checkedStyles};
`

class Query extends Component {
  static propTypes = {
    body: PropTypes.arrayOf(PropTypes.any).isRequired,
    success: PropTypes.string,
  }

  static defaultProps = {
    success: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      stage: 'type',
      tag: null,
    }
  }

  handleClick = e => {
    e.preventDefault()

    this.setState(state => ({
      isOpen: !state.isOpen,
    }))
  }

  handleRoot = value => {
    this.setState({ stage: value })
    if (window !== undefined) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  render() {
    const { isOpen, stage, tag } = this.state
    const { body, success } = this.props

    return (
      <>
        <Button
          css={css`
            ${tw(['mb-q24', 'mt-q24'])};
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
                  'z-10',
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
                  'z-20',
                ])};
              `}
              key="modal"
            >
              <h2
                css={css`
                  ${Heading4};
                  ${tw(['mb-q24'])};
                `}
              >
                {stage === 'type'
                  ? '1. Выберите тип вашей истории'
                  : '2. Заполните форму'}
              </h2>
              <React.Fragment>
                {stage === 'type'
                  ? [
                      <Tab key="type">
                        {body.map(({ id, primary, items }) => {
                          const historytitle = propPathOr(
                            null,
                            ['historytitle', 'text'],
                            primary
                          )

                          return (
                            <div
                              css={css`
                                ${tw(['mb-q16'])};
                              `}
                              key={id}
                            >
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
                                onClick={() =>
                                  this.setState({ tag: historytitle })
                                }
                                checked={tag === historytitle}
                              >
                                {historytitle}
                              </Label>
                              <Accordion data={items} />
                            </div>
                          )
                        })}
                        <Button
                          css={css`
                            ${tw(['mt-q36'])};
                          `}
                          onClick={() => this.handleRoot('form')}
                          size="lg"
                          type="button"
                          disabled={!tag}
                          data-disabled={!tag}
                        >
                          Продолжить
                        </Button>
                      </Tab>,
                    ]
                  : [
                      <Tab key="form">
                        <div
                          css={css`
                            ${tw(['mt-q36'])};
                          `}
                        >
                          <Form tag={tag} success={success} />
                          <Button
                            css={css`
                              ${tw(['bg-grey', 'mt-q36'])};
                            `}
                            onClick={() => this.handleRoot('type')}
                            size="lg"
                            type="button"
                          >
                            Назад
                          </Button>
                        </div>
                      </Tab>,
                    ]}
              </React.Fragment>
            </Modal>,
          ]}
        </PoseGroup>
      </>
    )
  }
}

export default Query
