/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const alias = require('./webpack-alias');

exports.createPages = ({ actions, graphql }) => {
  const { createRedirect } = actions;

  createRedirect({
    fromPath: '/posts',
    toPath: '/',
    isPermanent: true,
    redirectInBrowser: true,
  });
  createRedirect({
    fromPath: '/posts/',
    toPath: '/',
    isPermanent: true,
    redirectInBrowser: true,
  });
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.example$/,
          use: 'raw-loader',
        },
      ],
    },
  });
};
