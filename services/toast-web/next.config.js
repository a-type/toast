const path = require('path');
const config = require('./config/config');

module.exports = {
  env: {
    STRIPE_PLAN_ID: config.stripe.planId,
    STRIPE_KEY: config.stripe.key,
    FIREBASE_API_KEY: config.firebase.apiKey,
    FIREBASE_AUTH_DOMAIN: config.firebase.authDomain,
    FIREBASE_DATABASE_URL: config.firebase.databaseURL,
    FIREBASE_PROJECT_ID: config.firebase.projectId,
    FIREBASE_STORAGE_BUCKET: config.firebase.storageBucket,
    FIREBASE_MESSAGING_SENDER_ID: config.firebase.messagingSenderId,
    ORIGIN: config.origin,
    API_HOST: config.apiHost,
    PUSH_CERT_PUBLIC_KEY: config.pushCertPublicKey,
  },
  distDir: 'build',
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
