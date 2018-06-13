import { fontSizes, capHeights, rhythmHeight } from 'theme';
import { isNumber } from 'util';

const getCapFromSize = sizeName => {
  if (isNumber(sizeName)) {
    return sizeName;
  }
  return fontSizes[sizeName] * capHeights[sizeName];
};

export const getOffset = (sizeName = 'md') => {
  const availableHeight = smallestMultiple(sizeName);

  const offset = (availableHeight - getCapFromSize(sizeName)) / 2;
  return Math.round(offset + (availableHeight - rhythmHeight) / 4);
};

export const smallestMultiple = (sizeName = 'md') => {
  const computedCap = getCapFromSize(sizeName);
  let size = rhythmHeight;
  while (size < computedCap) {
    size = size + rhythmHeight;
  }
  return size;
};

const defaultSpacings = { top: 0, bottom: 0, left: 0, right: 0 };

export const getCss = (sizeName, { top = 0, bottom = 0 } = defaultSpacings) =>
  `margin-top: ${getOffset(sizeName) + top * rhythmHeight}px;
   margin-bottom: ${-getOffset(sizeName)}px;
   padding-bottom: ${bottom * rhythmHeight}px;
   padding-top: 0.001px;
   line-height: ${smallestMultiple(sizeName)}px;
  `;
