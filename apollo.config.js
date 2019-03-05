module.exports = {
  client: {
    service: {
      name: 'toast-core',
      localSchemaFile: './src/generated/schema.json',
    },
    includes: ['./src/**/*.ts', './src/**/*.js', './src/**/*.graphql'],
    excludes: ['**/__tests__/**'],
  },
};
