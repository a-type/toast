export const ignoreIds = (json: any) => {
  if (json instanceof Array) {
    return json.map(ignoreIds);
  } else if (json instanceof Object) {
    const { id, cookActionId, ...rest } = json;
    return Object.keys(rest).reduce((transformed, key) => {
      transformed[key] = ignoreIds(rest[key]);
      return transformed;
    }, {});
  } else {
    return json;
  }
};
