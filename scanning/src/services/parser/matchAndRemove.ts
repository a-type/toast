export default (text: string, matchers: RegExp[]) => {
  const matched = [];
  const withoutMatches = matchers.reduce((value: string, match) => {
    const matches = value.match(match);

    if (matches) {
      matches.forEach(m => {
        match.lastIndex = 0;
        const res = match.exec(m);
        if (res) {
          matched.push(res[1]);
        }
      });
    }

    return value.replace(match, '');
  }, text);

  return {
    withoutMatches,
    matched,
  };
};
