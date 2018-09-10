process.env.NODE_ENV = 'production';
process.env.BABEL_ENV = 'production';

const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const config = require('../webpack.config.js');
const bookmarkletConfig = require('../bookmarklet/webpack.config');
const chalk = require('chalk');

const paths = {
  public: path.resolve(process.cwd(), 'public'),
  dist: path.resolve(process.cwd(), 'dist'),
  bookmarklet: path.resolve(process.cwd(), 'bookmarklet/dist'),
};

new Promise((resolve, reject) => {
  const bookmarkletCompiler = webpack(bookmarkletConfig);
  console.info(chalk.blue('compiling bookmarklet'));
  bookmarkletCompiler.run((err, stats) => {
    if (err) {
      return reject(err);
    }

    console.info(stats.toString({ chunks: false, colors: true }));
    console.info(chalk.green('bookmarklet done'));
    resolve();
  });
})
  .then(() => {
    console.info(chalk.blue('copying static files'));
    fs.emptyDirSync(paths.dist);

    fs.copySync(paths.public, paths.dist, {
      dereference: true,
      filter: file => file !== 'public/index.html',
    });
    fs.copySync(paths.bookmarklet, path.resolve(paths.dist, 'bookmarklet'), {
      dereference: true,
    });

    const compiler = webpack(config);

    console.info(chalk.blue('compiling main app'));
    compiler.run((err, stats) => {
      if (err) {
        throw err;
      }
      console.info(chalk.green('done'));
      console.info(
        stats.toString({
          chunks: false,
          colors: true,
        }),
      );

      process.exit(0);
    });
  })
  .catch(err => {
    console.error(err);
    process.exit(-1);
  });
