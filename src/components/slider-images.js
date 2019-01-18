import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { Helmet } from 'react-helmet'
import propPathOr from 'crocks/helpers/propPathOr'
import uuid from 'node-uuid'
import posed from 'react-pose'

const slideStyles = css`
  ${tw([
    'absolute',
    'flex',
    'flex-no-wrap',
    'flex-row',
    'h-full',
    'pin-l',
    'pin-t',
  ])};
`

const Slide = posed.div({
  transform: {
    x: ({ current, length }) => `-${(current * 100) / length}%`,
  },
})

const Images = ({ current, items }) => {
  const getSrc = images =>
    propPathOr(
      propPathOr(null, ['url'], images),
      ['localFile', 'childImageSharp', 'fluid', 'src'],
      images
    )

  return (
    <>
      <Helmet>
        {items.map(({ images }) => (
          <link key={uuid()} rel="preload" href={getSrc(images)} as="image" />
        ))}
      </Helmet>
      <Slide
        css={css`
          ${slideStyles};
          width: ${items.length * 100}%;
        `}
        pose="transform"
        poseKey={current}
        current={current}
        length={items.length}
      >
        {items.map(({ images }) => (
          <div
            key={uuid()}
            css={css`
              ${tw(['bg-contain', 'bg-no-repeat', 'flex-no-shrink', 'h-full'])};
              background-image: url(${getSrc(images)});
              width: ${100 / items.length}%;
            `}
            Ï
          />
        ))}
      </Slide>
    </>
  )
}

Images.propTypes = {
  current: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default memo(Images)
