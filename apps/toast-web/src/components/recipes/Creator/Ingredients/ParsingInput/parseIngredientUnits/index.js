import numberParser from './numberParser';
import unitParser from './unitParser';

export default text => {
  const { number, remainingText } = numberParser(text);

  const { unit, remainingText: leftovers } = unitParser(remainingText);

  return {
    number,
    unit,
    leftovers,
  };
};
