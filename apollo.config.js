module.exports = {
  client: {
    service: {
      name: 'toast-core',
      url: 'http://localhost:4000/graphql',
    },
    includes: ['./apps/toast-web/src/**/*.ts'],
    excludes: ['**/__tests__/**'],
  },
};
