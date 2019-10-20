const path = require('path');

module.exports = {
  env: {},
  webpack: (config, { isServer, webpack }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      components: path.resolve(__dirname, 'components'),
      contexts: path.resolve(__dirname, 'contexts'),
      hooks: path.resolve(__dirname, 'hooks'),
      themes: path.resolve(__dirname, 'themes'),
      lib: path.resolve(__dirname, 'lib'),
      utils: path.resolve(__dirname, 'utils'),
    };
    return config;
  },
};
