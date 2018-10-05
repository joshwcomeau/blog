/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');

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
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components'),
        constants: path.resolve(__dirname, 'src/constants'),
        helpers: path.resolve(__dirname, 'src/helpers'),
        pages: path.resolve(__dirname, 'src/pages'),
        templates: path.resolve(__dirname, 'src/templates'),
        utils: path.resolve(__dirname, 'src/utils'),
      },
    },
  });
};
