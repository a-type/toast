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

export const spaceSizes = {
  md: 12,
  sm: 6,
  lg: 24,
  xs: 3,
  xl: 48,
};

export const getSize = (sizeName = '0px') =>
  spaceSizes[sizeName] ? `${spaceSizes[sizeName]}px` : sizeName;

injectGlobal`
:root {
  --rhythm: ${rhythmHeight}px;

  --font-fancy: "Prata", serif;
  --font-default: "Noto Serif", serif;
  --font-logo: "Pacifico", serif;

  --font-size-md: ${fontSizes.md}px;
  --font-size-sm: ${fontSizes.sm}px;
  --font-size-lg: ${fontSizes.lg}px;
  --font-size-xl: ${fontSizes.xl}px;

  --normal: 400;
  --light: 200;
  --bold: 600;

  --color-white: #fefeff;
  --color-black: #161616;

  --color-gray-lightest: #eaeaff;
  --color-gray-light: #d8d8fa;
  --color-gray: #7272af;
  --color-gray-dark: #323262;

  --color-disabled-background: #eeeefe80;
  --color-disabled: #727282;

  --color-brand: #f6c667;
  --color-brand-light: #ffe1bb;
  --color-brand-dark: #ab5f0f;
  --color-brand-highlighter: #ffe1bb32;


  --color-positive: #1ecbb4;
  --color-positive-light: #adffef;
  --color-positive-dark: #007985;
  --color-positive-highlighter: #adffef32;

  --color-negative: #b30753;
  --color-negative-light: #ff95b8;
  --color-negative-dark: #6d0043;
  --color-negative-highlighter: #ff95b832;

  --color-dark: #280f34;

  --color-shadow: #280f3420;

  --shadow-md: 0 4px 8px 0 #280f3420;

  --spacing-md: ${spaceSizes.md}px;
  --spacing-sm: ${spaceSizes.sm}px;
  --spacing-lg: ${spaceSizes.lg}px;
  --spacing-xs: ${spaceSizes.xs}px;
  --spacing-xl: ${spaceSizes.xl}px;

  --border-radius-md: 8px;
}

html, body {
  margin: 0;
  padding: 0;
  font-size: var(--font-size-md);
  font-family: var(--font-default);
  font-weight: var(--normal);
  line-height: 1.5;
  color: var(--color-black);
}

html, body, #main {
  height: 100%;
}

body {
  overflow-y: auto;
}

br {
  height: ${rhythmHeight}px;
  display: block;
}

* {
  box-sizing: border-box;
}

::selection {
  background: var(--color-brand-light);
}
::-moz-selection {
  background: var(--color-brand-light);
}
`;
