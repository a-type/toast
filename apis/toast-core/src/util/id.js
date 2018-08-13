export default (name = '') =>
  name.toLowerCase().replace(/\s/g, '-') + '-' + shortid.generate();
