require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
const path = require('path')
const { htmlSerializer, linkResolver } = require('./src/utils/prismic')

// SEO configuration
const siteTitle = 'Elabuga'
const siteUrl = 'https://www.elabuga.ru'
const siteDescription = 'Boiler'
const siteKeywords = 'Gatsby, web'
const siteThemeColor = '#009688'

// Accounts & API keys
const twitter = 'your-twitter-account'
const fbAppId = 'your-fb-app-id'
// const gaId = 'your-ga-id'

// Used internally
const utilsTitleShort = 'Elabuga'
const utilsIcon = 'static/images/icon.png'
const utilsBackgroundColor = '#009688'

// Do not modify unless you know what you're doing
module.exports = {
  siteMetadata: {
    // SEO
    siteTitle,
    siteUrl,
    siteDescription,
    siteKeywords,
    siteThemeColor,
    social: {
      twitter,
      fbAppId,
    },
    // Utils
    utilsTitleShort,
    utilsIcon: path.resolve(__dirname, utilsIcon),
    utilsBackgroundColor,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-emotion`,
    },
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: 'elabuga',
        accessToken: process.env.PRICMIC_TOKEN,
        linkResolver,
        htmlSerializer,
      },
    },
    // {
    //   resolve: `gatsby-plugin-netlify-functions`,
    //   options: {
    //     functionsSrc: `${__dirname}/src/functions`,
    //     functionsOutput: `${__dirname}/functions`,
    //   },
    // },
    // {
    //   resolve: 'gatsby-plugin-google-analytics',
    //   options: {
    //     trackingId: gaId,
    //     head: false // put GA in the <head> for optimal tracking
    //   }
    // },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: siteTitle,
        short_name: utilsTitleShort,
        start_url: '/',
        theme_color: siteThemeColor,
        background_color: utilsBackgroundColor,
        display: 'minimal-ui',
        icon: utilsIcon, // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-robots-txt',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-offline',
    `gatsby-transformer-sharp`,
    'gatsby-plugin-webpack-size',
    `gatsby-plugin-sharp`,
    `gatsby-plugin-netlify-cache`,
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        mergeSecurityHeaders: true,
        mergeLinkHeaders: true,
        mergeCachingHeaders: true,
      },
    },
  ],
}
