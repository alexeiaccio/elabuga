import React from 'react'
import { css } from '@emotion/core'
import { Link } from 'gatsby'

import Button from '../components/button'
import Layout from '../components/layout'
import { Heading2 } from '../components/typography'

const cardStyles = css`
  ${tw(['bg-white', 'my-q48', 'px-q24', 'py-q36', 'shadow-text'])};
`

const LinkButton = Button.withComponent(Link)

const NotFoundPage = () => (
  <Layout>
    <div css={cardStyles}>
      <h2 css={Heading2}>404</h2>
      <div
        css={css`
          ${tw(['my-q36', 'text-lg'])};
        `}
      >
        Страница не найдена
      </div>
      <LinkButton
        css={css`
          ${tw(['inline-block', 'no-underline', 'text-black'])};
        `}
        size="lg"
        to="/"
      >
        На главную
      </LinkButton>
    </div>
  </Layout>
)

export default NotFoundPage
