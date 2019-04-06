import matchAndRemove from './matchAndRemove';

const commentMatches: RegExp[] = [/\((.*?)\)/g, /,\s+(to season)/g];

export default (text: string) => {
  const { withoutMatches, matched } = matchAndRemove(text, commentMatches);
  return {
    text: withoutMatches,
    comments: matched,
  };
};
