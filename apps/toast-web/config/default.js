module.exports = {
  origin: 'https://localhost:8080',
  auth0: {
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENTID,
    audience: process.env.AUTH0_AUDIENCE,
    requestedScopes: [
      'read:drafts',
      'create:linkedRecipe',
      'create:fullRecipe',
      'update:linkedRecipe',
      'update:fullRecipe',
    ],
  },
  mock: process.env.TOAST_MOCK,
};
