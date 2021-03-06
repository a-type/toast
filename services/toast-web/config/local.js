module.exports = {
  origin: 'http://localhost:8080',
  apiHost: 'http://localhost:4000',
  firebase: {
    apiKey: 'AIzaSyAbrvRJYypD2xxu8L9Xm91ijElOtBfpiGc',
    authDomain: 'toast-cooking-dev.firebaseapp.com',
    databaseURL: 'https://toast-cooking-dev.firebaseio.com',
    projectId: 'toast-cooking-dev',
    storageBucket: 'toast-cooking-dev.appspot.com',
    messagingSenderId: '380160839947',
  },
  pushCertPublicKey:
    'BPesS8Hxjh_5S6bo4wXPae5uDaviR8i1KOGf89ikse-QwaH5ILXT7VdlyYx5ie2XHY9wpkownOTvHwHBFhzL5KY',
  mock: process.env.TOAST_MOCK,

  stripe: {
    key: 'pk_test_OgHpoAwXJ6IwsSsoYtWufP1x',
    planId: 'plan_FHo8ETWYeopwEv',
  },
};
