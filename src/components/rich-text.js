import { css } from '@emotion/core'

import {
  Body,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  List,
} from './typography'

export const Headers = css`
  & h2 {
    ${Heading2};
  }
  & h3 {
    ${Heading3};
  }
  & h4 {
    ${Heading4};
  }
  & h5 {
    ${Heading5};
  }
  & h6 {
    ${Heading6};
  }
`

export const RichText = css`
  ${Body};
  & h2 {
    ${Heading2};
    ${tw(['mb-q24'])};
  }
  & h3 {
    ${Heading3};
    ${tw(['mb-q24'])};
  }
  & h4 {
    ${Heading4};
    ${tw(['mb-q20'])};
  }
  & h5 {
    ${Heading5};
    ${tw(['mb-q16'])};
  }
  & h6 {
    ${Heading6};
    ${tw(['mb-q12'])};
  }
  & p {
    ${tw(['leading-normal', 'mb-q16', 'md:mb-q24'])};
  }
  & strong {
    ${tw(['font-bold', 'tracking-wide'])};
  }
  & ul,
  & ol {
    ${List};
    ${tw(['mb-q36'])};
    counter-reset: li;
  }
  & li {
    ${tw(['mb-q6'])};
  }
  & ul > li::before {
    content: '';
    ${tw([
      'bg-teal',
      'inline-block',
      'h-q8',
      'mr-q16',
      'pin-l',
      'pin-t',
      'rounded-full',
      'w-q8',
    ])};
    top: 0.65rem;
  }
  & ol > li::before {
    content: counter(li);
    counter-increment: li;
    ${tw(['inline-block', 'mr-q16'])};
  }
  & a {
    ${tw(['text-teal'])};
  }
  & .block-img {
    ${tw(['inline-block', 'mr-q12'])};
    width: calc(1 / 3 * 100% - 1.5rem);
  }
  & .caption {
    ${tw(['align-top', 'inline-block', 'mr-q12', 'text-center'])};
    width: calc(1 / 3 * 100% - 1.5rem);
  }
  & img {
    ${tw(['w-full'])};
    object-fit: cover;
  }
`

export const RichTextSmall = css`
  ${List};
  & h2 {
    ${Heading3};
    ${tw(['mt-q48', 'mb-q24'])};
  }
  & h3 {
    ${Heading4};
    ${tw(['mt-q36', 'mb-q24'])};
  }
  & h4 {
    ${Heading5};
    ${tw(['mt-q32', 'mb-q20'])};
  }
  & h5 {
    ${Heading5};
    ${tw(['mt-q24', 'mb-q16'])};
  }
  & h6 {
    ${Body};
    ${tw(['mt-q20', 'mb-q12'])};
  }
  & p {
    ${tw(['leading-normal', 'mb-q16', 'md:mb-q24'])};
  }
  & strong {
    ${tw(['font-bold', 'tracking-wide'])};
  }
  & ul,
  & ol {
    ${List};
    ${tw(['mb-q36'])};
    counter-reset: li;
  }
  & li {
    ${tw(['mb-q4'])};
  }
  & ul > li::before {
    content: '';
    ${tw([
      'bg-teal',
      'inline-block',
      'h-q8',
      'mr-q12',
      'pin-l',
      'pin-t',
      'rounded-full',
      'w-q8',
    ])};
    top: 0.65rem;
  }
  & ol > li::before {
    content: counter(li);
    counter-increment: li;
    ${tw(['inline-block', 'mr-q12'])};
  }
  & a {
    ${tw(['text-teal'])};
  }
`
