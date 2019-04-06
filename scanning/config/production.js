module.exports = {
  chromeArgs: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-notifications',
    '--disable-offer-store-unmasked-wallet-cards',
    '--disable-offer-upload-credit-cards',
    '--enable-async-dns',
    '--enable-simple-cache-backend',
    '--enable-tcp-fast-open',
    '--no-default-browser-check',
    '--no-pings',
    '--prerender-from-omnibox=disabled',
  ],
  timeout: 60000,
  secret: process.env.API_SECRET,
};
