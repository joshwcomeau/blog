module.exports = {
  siteMetadata: {
    title: "Josh W. Comeau's Blog",
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-flow',
    'gatsby-plugin-styled-components',
    {
      resolve: `gatsby-mdx`,
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
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-119170920-1',
      },
    },
  ],
};
