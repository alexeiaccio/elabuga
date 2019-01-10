import React from 'react'
import Layout from './src/components/layout'

// eslint-disable-next-line import/prefer-default-export
export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
)
