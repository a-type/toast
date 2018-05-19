import { injectGlobal } from 'styled-components';

injectGlobal`
:root {
  --font-fancy: "Prata", serif;
  --font-default: "Noto Serif", serif;

  --font-size-default: 18px;

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
}

html, body {
  margin: 0;
  padding: 0;
  font-size: var(--font-size-default);
  font-family: var(--font-default);
  font-weight: var(--normal);

  @media screen only and (max-device-width: 600px) {
    font-size: 24px;
  }
}

html, body, #main {
  height: 100%;
}

* {
  box-sizing: border-box;
}
`;
