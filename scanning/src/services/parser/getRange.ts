export default (sourceText: string, subtext: string): [number, number] | [] => {
  if (subtext.length === 0) {
    return [];
  }

  const idx = sourceText.indexOf(subtext);
  if (idx < 0) {
    return [];
  }
  return [idx, idx + subtext.length];
};
