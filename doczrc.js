import path from 'path';

import { createPlugin } from 'docz-core';

import alias from './webpack-alias';

export default {
  files: 'src/components/**/*.mdx',
  modifyBundlerConfig: config => {
    config.resolve.alias = alias;

    return config;
  },
};
