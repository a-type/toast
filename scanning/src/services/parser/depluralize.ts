import pluralize from 'pluralize';

pluralize.addIrregularRule('slice', 'slices');

export default (text: string) => pluralize.singular(text);
