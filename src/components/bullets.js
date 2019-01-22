import React, { memo } from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import uuid from 'node-uuid'

const Active = ({ active }) => css`
  ${!active && tw(['bg-grey', 'cursor-pointer'])};
  background-color: ${active && '#f0c41b'};
`

const Bullet = styled.button`
  ${tw([
    'block',
    'border-none',
    'h-q16',
    'outline-none',
    'p-0',
    'rounded-full',
    'w-q16',
  ])};
  &:not(:last-of-type) {
    ${tw(['mr-q12'])};
  }
  ${Active};
`

function Bullets({ active, length, onClick }) {
  if (length < 2) return null

  return (
    <div
      css={css`
        ${tw([
          'flex',
          'flex-row',
          'flex-no-wrap',
          'justify-center',
          'mt-q12',
          'w-full',
        ])};
      `}
    >
      {Array(length)
        .fill(null)
        .map((_, idx) => (
          <Bullet
            active={idx === active}
            key={uuid()}
            onClick={() => (idx !== active ? onClick(idx) : null)}
            type="button"
          >
            &nbsp;
          </Bullet>
        ))}
    </div>
  )
}

Bullets.propTypes = {
  active: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default memo(Bullets)
