import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import posed, { PoseGroup } from 'react-pose'
import uuid from 'node-uuid'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

import RichContent from './rich-content'

const h3Styles = ({ isOpen }) => css`
  &::after {
    content: ${isOpen ? "'Закрыть'" : "'Открыть пример'"};
  }
`

const H3 = styled.h3`
  ${tw([
    'border-grey-lighter',
    'border-solid',
    'cursor-pointer',
    'font-medium',
    'm-0',
    'pl-q12',
    'py-q8',
    'relative',
    'text-lg',
  ])};
  border-width: 1px 0;
  box-sizing: border-box;
  &:not(:first-of-type) {
    margin-top: -1px;
  }
  &::after {
    ${tw([
      'absolute',
      'bg-yellow-lighter',
      'hidden',
      'mb-q8',
      'pin-b',
      'pin-r',
      'px-q8',
      'py-q4',
      'text-xs',
    ])};
    content: '';
  }
  &:hover::after {
    ${tw(['inline-block'])};
  }
  ${h3Styles};
`

const Content = posed.div({
  exit: { height: 0, delay: 400 },
  enter: { height: 'auto' },
})

const StyledContent = styled(Content)`
  ${tw(['bg-yellow-lighter', 'overflow-hidden'])};
`

class Accordion extends PureComponent {
  state = { open: false }

  render() {
    const { open } = this.state
    const { data } = this.props

    return (
      <>
        {data.map(({ sampletitle, sampletext }, i) => (
          <Fragment key={uuid()}>
            <H3
              isOpen={open === i}
              onClick={() => this.setState({ open: open === i ? false : i })}
            >
              {sampletitle.text}
            </H3>
            <PoseGroup animateOnMount>
              {open === i && [
                <StyledContent key={uuid()}>
                  <RichContent
                    css={css`
                      ${tw(['px-q24'])};
                    `}
                    content={sampletext.html}
                  />
                </StyledContent>,
              ]}
            </PoseGroup>
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
