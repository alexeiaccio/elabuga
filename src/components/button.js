import styled from '@emotion/styled'
import { css } from '@emotion/core'

import { ButtonText, ButtonSmallText } from './typography'

const buttonStyles = ({ size }) => css`
  ${size === 'lg' ? ButtonText : ButtonSmallText};
  ${size === 'lg' ? tw(['py-q24']) : tw(['py-q12'])};
`

export default styled.button`
  ${tw([
    'border-none',
    'cursor-pointer',
    'outline-none',
    'px-q24',
    'rounded-sm',
    'shadow-elevate0',
    'hover:shadow-elevate1',
  ])};
  ${buttonStyles};
  background-color: #f0c41b;
  transition: all 200ms ease-in-out;
`
