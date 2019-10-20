export default (obj: { [key: string]: any }) => {
  return Object.keys(obj).reduce((acc, key) => {
    if (obj[key] === undefined) {
      return acc;
    }
    return { ...acc, [key]: obj[key] };
  }, {});
};
