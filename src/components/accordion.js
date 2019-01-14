import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import posed from 'react-pose'
import uuid from 'node-uuid'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

import RichContent from './rich-content'

const H3 = styled.h3`
  ${tw(['pl-q8'])};
`

const Content = posed.div({
  closed: { height: 0 },
  open: { height: 'auto' },
})

class Accordion extends React.Component {
  state = { open: false }

  render() {
    const { open } = this.state
    const { data } = this.props

    return (
      <>
        {data.map(({ sampletitle, sampletext }, i) => (
          <Fragment key={uuid()}>
            <H3 onClick={() => this.setState({ open: open === i ? false : i })}>
              {sampletitle.text}
            </H3>
            <Content
              css={css`
                ${tw(['bg-yellow-lighter', 'overflow-hidden'])};
              `}
              pose={open === i ? 'open' : 'closed'}
            >
              <RichContent
                css={css`
                  ${tw(['px-q12'])};
                `}
                content={sampletext.html}
              />
            </Content>
          </Fragment>
        ))}
      </>
    )
  }
}

Accordion.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
}

export default Accordion
