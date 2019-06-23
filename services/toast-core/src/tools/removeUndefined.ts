const removeUndefined = object => {
  if (object instanceof Array) {
    return object.filter(value => value !== undefined).map(removeUndefined);
  }
  if (object instanceof Object) {
    return Object.keys(object).reduce((result, key) => {
      if (object[key] === undefined) {
        return result;
      }
      {
        return { ...result, [key]: removeUndefined(object[key]) };
      }
    }, {});
  }
  return object;
};

export default removeUndefined;
