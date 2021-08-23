const path = require('path');

const alias = require('./webpack-alias');
const rssConfig = require('./rss-plugin-config');

module.exports = {
  siteMetadata: {
    title: "Josh Comeau's Blog",
    author: 'Josh Comeau',
    description:
      'Personal blog of Josh Comeau, a front-end software engineer. Focuses on teaching important concepts about web development and React.js, through dynamic interactions.',
    siteUrl: 'https://www.joshwcomeau.com',
    social: {
      twitter: '@joshwcomeau',
    },
  },
  plugins: [
    rssConfig,

    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias,
        extensions: [],
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-flow',
    'gatsby-plugin-styled-components',
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          posts: require.resolve('./src/components/BlogPost/BlogPost.js'),
        },
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/src/pages/posts`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'src', 'assets', 'images'),
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: '',
        cookieExpires: 63072000, // two years
      },
    },
  ],
};
