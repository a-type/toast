import matchAndRemove from './matchAndRemove';

const prepMatches: RegExp[] = [
  /,\s+(chopped)/g,
  /,\s+(cleaned)/g,
  /,\s+(cubed)/g,
  /,\s+(divided)/g,
  /,\s+(drained( and rinsed)?)/g,
  /,\s+(finely chopped)/g,
  /,\s+(halved)/g,
  /,\s+(rinsed)/g,
  /,\s+(separated)/g,
  /,\s+(sliced)/g,
  /,\s+(stripped)/g,
  /,\s+(quartered)/g,
];

export default (text: string) => {
  const { withoutMatches, matched } = matchAndRemove(text, prepMatches);
  return { text: withoutMatches, preparations: matched };
};
