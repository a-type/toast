const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const config = require('../webpack.config.js');

const paths = {
  public: path.resolve(process.cwd(), 'public'),
  dist: path.resolve(process.cwd(), 'dist'),
};

fs.emptyDirSync(paths.dist);

fs.copySync(paths.public, paths.dist, {
  dereference: true,
  filter: file => file !== 'public/index.html',
});

const compiler = webpack(config);

compiler.run((err, stats) => {
  if (err) {
    throw err;
  }
  console.info('done');
  console.info(
    stats.toString({
      chunks: false,
      colors: true,
    }),
  );
});
