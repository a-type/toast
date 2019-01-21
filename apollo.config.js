module.exports = {
  client: {
    service: {
      name: 'toast-core',
      localSchemaFile: './apps/toast-web/src/generated/schema.json',
    },
    includes: [
      './apps/toast-web/src/**/*.ts',
      './apps/toast-web/src/**/*.js',
      './apps/toast-web/src/**/*.graphql',
    ],
    excludes: ['**/__tests__/**'],
  },
};
