/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import posed, { PoseGroup } from 'react-pose'

import Button from './button'
import Textarea from '../utils/textarea'
import RichContent from './rich-content'
import { RichText } from './rich-text'

const wrapperStyles = css`
  ${tw(['relative'])};
`

const labelStyles = css`
  ${tw(['absolute', 'bg-white', 'ml-q16', 'px-q8', 'pin-l', 'pin-t'])};
  margin-top: -0.75rem;
`

const Success = posed.div({
  exit: {
    applyAtEnd: { display: 'none' },
    height: 0,
  },
  enter: {
    applyAtStart: { display: 'block' },
    height: 'calc(100% + 1rem)',
    delay: 200,
    transition: {
      height: { ease: 'easeOut', duration: 300 },
    },
  },
})

const captionStyles = css`
  ${tw([
    'absolute',
    'bg-white',
    'mr-q16',
    'px-q8',
    'pin-r',
    'pin-b',
    'text-grey',
  ])};
  margin-bottom: 1.75rem;
`

const inputStyles = css`
  ${tw([
    'border-2',
    'border-solid',
    'font-opensans',
    'mb-q36',
    'outline-none',
    'p-q12',
    'rounded-lg',
    'shadow-none',
    'text-lg',
  ])};
  border-color: #f0c41b;
  box-sizing: border-box;
  width: 100% !important;
`

const DEFAULT_STATE = {
  contact: '',
  disabled: true,
  error: null,
  msg: '',
  name: '',
  left: 700,
}

class Form extends Component {
  static propTypes = {
    success: PropTypes.string,
    tag: PropTypes.string,
  }

  static defaultProps = {
    success: false,
    tag: '',
  }

  constructor(props) {
    super(props)
    this.state = {
      ...DEFAULT_STATE,
      isSuccess: false,
    }
  }

  handleUpdate = e => {
    const { id, value } = e.target

    this.setState(({ contact, msg, left, name }) => ({
      [id]: value,
      disabled: !(name.length > 1 && contact.length > 5 && msg.length > 20),
      error: null,
      left: id === 'msg' ? 700 - value.length : left,
    }))
  }

  handleClick = () => {
    this.setState(({ disabled }) => ({
      error: disabled ? 'Пожалуйста, заполните все поля формы.' : null,
    }))
  }

  handleSubmit = e => {
    e.preventDefault()
    const { contact, disabled, name, msg } = this.state
    if (disabled) return
    const { tag } = this.props

    fetch(
      `https://v66qfxaz26.execute-api.us-east-1.amazonaws.com/dev/send?tag=${tag}&name=${name}&contact=${contact}&msg=${msg}`
    )
      .then(() => {
        this.setState({ ...DEFAULT_STATE, isSuccess: true })
      })
      .catch(() => {
        this.setState({ error: 'Ошибка отправки. Попробуйте позже.' })
      })
  }

  render() {
    const { contact, disabled, error, name, left, msg, isSuccess } = this.state
    const { success } = this.props

    return (
      <form
        css={css`
          ${tw(['relative'])};
        `}
        onSubmit={this.handleSubmit}
      >
        <fieldset
          css={css`
            ${tw(['border-none', 'outline-none', 'm-0', 'p-0', 'shadow-none'])};
          `}
        >
          <p hidden>
            <label htmlFor="bot">
              Don’t fill this out: <input id="bot" name="bot-field" />
            </label>
          </p>
          <div css={wrapperStyles}>
            <label css={labelStyles} htmlFor="name">
              Имя
            </label>
            <input
              css={inputStyles}
              id="name"
              onChange={this.handleUpdate}
              minLength="2"
              placeholder="Напишете ваше имя"
              type="text"
              value={name}
              required
            />
          </div>
          <div css={wrapperStyles}>
            <label css={labelStyles} htmlFor="contact">
              Контакты
            </label>
            <input
              css={inputStyles}
              id="contact"
              onChange={this.handleUpdate}
              placeholder="Напишите ваше емеил или телефонный номер"
              type={contact.search(/[a-zA-Z@]/) >= 0 ? 'email' : 'tel'}
              value={contact}
              required
            />
          </div>
          <div css={wrapperStyles}>
            <label css={labelStyles} htmlFor="msg">
              История
            </label>
            <Textarea
              css={inputStyles}
              id="msg"
              onChange={this.handleUpdate}
              maxLength="720"
              minRows={3}
              placeholder="История длиной до 700 знаков"
              value={msg}
              required
            />
            <div css={captionStyles}>Осталось: {left} знаков.</div>
          </div>
        </fieldset>
        <Button
          data-disabled={disabled}
          onClick={this.handleClick}
          size="lg"
          type="submit"
        >
          Отправить
        </Button>
        {error && (
          <span
            css={css`
              ${tw(['pl-q24', 'text-red-dark'])};
            `}
          >
            {error}
          </span>
        )}
        <PoseGroup>
          {isSuccess && [
            <Success
              css={css`
                ${tw(['absolute', 'overflow-hidden', 'pin-l', 'w-full'])};
                top: -0.5rem;
              `}
              key="success"
            >
              <RichContent
                css={css`
                  ${tw([
                    'flex',
                    'flex-col',
                    'h-full',
                    'items-center',
                    'justify-center',
                    'p-q24',
                    'text-center',
                  ])};
                  ${RichText};
                  background-color: #f0c41b;
                  box-sizing: border-box;
                  & p {
                    ${tw(['text-lg'])};
                  }
                `}
                content={success}
              />
            </Success>,
          ]}
        </PoseGroup>
      </form>
    )
  }
}

export default Form
