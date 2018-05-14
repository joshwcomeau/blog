module.exports = {
  siteMetadata: {
    title: "Josh W. Comeau's Blog",
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-119170920-1',
      },
    },
  ],
};
