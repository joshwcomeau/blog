/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const generateBabelConfig = require('gatsby/dist/utils/babel-config');

exports.modifyWebpackConfig = ({ config, stage }) => {
  switch (stage) {
    case 'develop':
    case 'build-javascript': {
      config._loaders.md = {
        config: {
          test: /\.md$/,
          loaders: ['babel-loader', '@mdx-js/loader'],
        },
      };

      console.log(config._loaders);
      return config;
    }

    default:
      return config;
  }
};
