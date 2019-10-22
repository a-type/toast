const local = require('./local');
const production = require('./production');

module.exports = process.env.NODE_ENV === 'production' ? production : local;
