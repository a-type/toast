module.exports = {
  // schemas: {
  //   'toast-core': {
  //     schema: './src/generated/schema.json',
  //   },
  //   default: {
  //     clientSide: true,
  //     extends: 'toast-core',
  //     schema: './src/apolloClient/resolvers/clientSchema.graphql',
  //   },
  // },
  queries: [
    {
      schema: 'default',
      includes: ['./src/**/*.tsx', './src/**/*.js'],
      excludes: ['**/node_modules/**'],
    },
  ],
};
