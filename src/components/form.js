import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Button from './button'

const DEFAULT_STATE = {
  contact: '',
  msg: '',
  name: '',
  left: 1200,
}

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = DEFAULT_STATE
  }

  handleUpdate = e => {
    const { id, value } = e.target

    this.setState(({ left }) => ({
      [id]: value,
      left: id === 'msg' ? 1200 - value.length : left,
    }))
  }

  handleSubmit = e => {
    e.preventDefault()
    const { name, contact, msg } = this.state
    const { tag } = this.props

    fetch(
      `https://v66qfxaz26.execute-api.us-east-1.amazonaws.com/dev/send?tag=${tag}&name=${name}&contact=${contact}&msg=${msg}`
    )
      .then(console.log) // eslint-disable-line
      .catch(console.error) // eslint-disable-line

    this.setState(DEFAULT_STATE)
  }

  render() {
    const { name, contact, msg, left } = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          id="name"
          onChange={this.handleUpdate}
          minLength="2"
          placeholder="Напишете ваше имя"
          type="text"
          value={name}
          required
        />
        <input
          id="contact"
          onChange={this.handleUpdate}
          placeholder="Напишите ваше емеил или телефонный номер"
          type={contact.search(/[a-zA-Z@]/) >= 0 ? 'email' : 'tel'}
          value={contact}
          required
        />
        <textarea
          id="msg"
          onChange={this.handleUpdate}
          maxLength="1280"
          placeholder="История длиной до 1200 символов"
          value={msg}
          required
        />
        <p>Осталось: {left} знаков.</p>
        <Button size="sm" type="submit">
          Отправить
        </Button>
      </form>
    )
  }
}

Form.propTypes = {
  tag: PropTypes.string.isRequired,
}

export default Form
