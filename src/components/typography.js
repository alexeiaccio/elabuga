import { css } from '@emotion/core'

export const Body = css`
  ${tw(['font-medium', 'leading-body', 'text-base', 'tracking-normal'])};
`

export const BodySemibold = css`
  ${tw(['font-semibold', 'leading-body', 'text-base', 'tracking-normal'])};
`

export const ButtonSmallText = css`
  ${tw(['font-source', 'font-semibold', 'text-xs', 'tracking-button'])};
  font-variant-caps: all-small-caps;
`

export const ButtonText = css`
  ${tw(['font-source', 'font-semibold', 'text-sm', 'tracking-button'])};
  font-variant-caps: all-small-caps;
`

export const Description = css`
  ${tw(['font-cormorant', 'text', 'text-description', 'tracking-normal'])};
`

export const DescriptionSemibold = css`
  ${Description};
  ${tw(['font-semibold'])};
`

export const Heading = css`
  ${tw(['font-bold', 'leading-heading', 'm-0', 'tracking-normal'])};
`

export const Heading0 = css`
  ${Heading};
  ${tw(['text-heading0'])};
`

export const Heading1 = css`
  ${Heading};
  ${tw(['text-heading1'])};
`

export const Heading2 = css`
  ${Heading};
  ${tw(['text-heading2'])};
`

export const Heading3 = css`
  ${Heading};
  ${tw(['text-heading3'])};
`

export const Heading4 = css`
  ${Heading};
  ${tw(['text-heading4'])};
`

export const Heading5 = css`
  ${Heading};
  ${tw(['text-heading5'])};
`

export const Heading6 = css`
  ${Heading};
  ${tw(['text-heading6'])};
`

export const LeadText = css`
  ${tw(['leading-normal', 'text-heading5', 'font-medium'])};
`

export const List = css`
  ${tw([
    'font-source',
    'font-medium',
    'leading-loose',
    'text-list',
    'tracking-normal',
    'list-reset',
  ])};
`
