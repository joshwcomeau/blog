/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.createPages = ({ boundActionCreators, graphql }) => {
  // need createRedirect action in boundActionCreators collection
  // to make the redirection magic happen.
  // https://www.gatsbyjs.org/docs/bound-action-creators/
  const { createRedirect } = boundActionCreators;

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

exports.modifyWebpackConfig = ({ config }) => {
  config.loader('example', { test: /\.example$/, loader: 'raw' });
}
