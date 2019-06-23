import Recognizer from '@microsoft/recognizers-text-number';

export default (numberString: string): number => {
  const recognized = Recognizer.recognizeNumber(
    numberString,
    Recognizer.Culture.English,
  );

  if (!recognized.length) {
    return null;
  }

  return parseFloat(recognized[0].resolution.value);
};
