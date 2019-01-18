import React, { memo } from 'react'
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
  & .slide-image {
    ${tw(['flex-no-shrink'])};
  }
`

const Slide = posed.div({
  transform: {
    x: ({ current, length }) => `-${(current * 100) / length}%`,
  },
})

const Images = memo(({ current, items }) => {
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
          & .slide-image {
            width: ${100 / items.length}%;
          }
        `}
        pose="transform"
        poseKey={current}
        current={current}
        length={items.length}
      >
        {items.map(({ images }) => (
          <img
            alt=""
            key={uuid()}
            src={getSrc(images)}
            className="slide-image"
          />
        ))}
      </Slide>
    </>
  )
})

export default Images
