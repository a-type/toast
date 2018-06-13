import { injectGlobal } from 'styled-components';

export const rhythmHeight = 24;

export const fontSizes = {
  sm: 14,
  md: 18,
  lg: 24,
  xl: 36,
};

export const capHeights = {
  sm: 0.7142857142857143,
  md: 0.7777777777777778,
  lg: 0.6,
  xl: 0.8666666666666666,
};

injectGlobal`
:root {
  --rhythm: ${rhythmHeight}px;

  --font-fancy: "Prata", serif;
  --font-default: "Noto Serif", serif;

  --font-size-md: ${fontSizes.md}px;
  --font-size-sm: ${fontSizes.sm}px;
  --font-size-lg: ${fontSizes.lg}px;
  --font-size-xl: ${fontSizes.xl}px;

  --normal: 400;
  --light: 200;
  --bold: 600;

  --color-white: #fff;
  --color-black: #161616;

  --color-gray-lightest: #eeeefe;
  --color-gray-light: #d8d8e8;
  --color-gray: #727282;
  --color-gray-dark: #323242;

  --color-disabled-background: #eeeefe80;
  --color-disabled: #727282;

  --color-brand: #f6c667;
  --color-brand-light: #ffe8bb;
  --color-brand-dark: #ab5f0f;

  --color-positive: #1ecbb4;
  --color-positive-light: #bff4ed;
  --color-positive-dark: #007985;

  --color-negative: #b30753;
  --color-negative-light: #f599c1;
  --color-negative-dark: #6d0043;

  --color-dark: #280f34;

  --spacing-md: ${rhythmHeight}px;
  --spacing-sm: ${Math.round(rhythmHeight / 2)}px;
  --spacing-lg: ${rhythmHeight * 2}px;
  --spacing-xs: ${Math.round(rhythmHeight / 4)}px;
  --spacing-xl: ${rhythmHeight * 4}px;
}

html, body {
  margin: 0;
  padding: 0;
  font-size: var(--font-size-md);
  font-family: var(--font-default);
  font-weight: var(--normal);
  line-height: ${rhythmHeight}px;
}

html, body, #main {
  height: 100%;
}

br {
  height: ${rhythmHeight}px;
  display: block;
}

* {
  box-sizing: border-box;
}
`;
