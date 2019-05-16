import { createGlobalStyle, css } from 'styled-components';
import { generate } from 'grommet/themes';
import { deepMerge, normalizeColor } from 'grommet/utils';

export const rhythmHeight = 24;

export const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 26,
  xxl: 36,
};

export const fontSizeArray = [
  fontSizes.xs,
  fontSizes.sm,
  fontSizes.md,
  fontSizes.lg,
  fontSizes.xl,
  fontSizes.xxl,
];

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

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'auto' | '0';

export const getSize = (sizeName: Size | string = '0px'): string =>
  spaceSizes[sizeName] ? `${spaceSizes[sizeName]}px` : sizeName;

const baseFont = '"PT Serif"';

export const GlobalStyle = createGlobalStyle`
:root {
  --rhythm: ${rhythmHeight}px;

  --font-fancy: "Playfair Display", serif;
  --font-default: ${baseFont}, serif;
  --font-logo: "Pacifico", serif;

  --font-size-xs: ${fontSizes.xs}px;
  --font-size-md: ${fontSizes.md}px;
  --font-size-sm: ${fontSizes.sm}px;
  --font-size-lg: ${fontSizes.lg}px;
  --font-size-xl: ${fontSizes.xl}px;
  --font-size-xxl: ${fontSizes.xxl}px;

  --normal: 400;
  --light: 200;
  --bold: 700;

  --color-white: #fefeff;
  --color-black: #161626;

  --color-gray-lightest: #eaeaff;
  --color-gray-light: #d8d8fa;
  --color-gray: #7272af;
  --color-gray-dark: #323262;

  --color-disabled-background: #eeeefe80;
  --color-disabled: #727282;

  --color-brand: #f6c667;
  --color-brand-light: #ffe6bd;
  --color-brand-dark: #ab5f0f;
  --color-brand-highlighter: #ffe1bb32;


  --color-positive: #1ecbb4;
  --color-positive-light: #bff4ed;
  --color-positive-dark: #007985;
  --color-positive-highlighter: #adffef32;

  --color-negative: #b30753;
  --color-negative-light: #e9339a;
  --color-negative-dark: #6d0043;
  --color-negative-highlighter: #ff95b832;

  --color-dark: #280f34;
  --color-shadow: #280f3420;
  --color-shadow-dark: #280f3460;

  --color-field-background: var(--color-gray-light);
  --color-field-foreground: var(--color-dark);

  --color-control-background: var(--color-brand);
  --color-control-foreground: var(--color-dark);
  --color-control-background-active: var(--color-brand-light);
  --color-control-foreground-active: var(--color-dark);
  --color-control-primary-background: var(--color-positive);
  --color-control-primary-foreground: var(--color-white);

  --color-link-foreground: var(--color-brand);
  --color-link-active: var(--color-brand-dark);

  --color-content-background: var(--color-white);
  --color-content-foreground: var(--color-black);

  --color-popover-background: var(--color-white);
  --color-popover-foreground: var(--color-black);

  --color-heading: var(--color-gray-dark);

  --color-effect-hover: var(--color-brand);
  --color-effect-focus: var(--color-brand-light);

  --shadow-md: 0 4px 8px 0 #280f3420;

  --spacing-md: ${spaceSizes.md}px;
  --spacing-sm: ${spaceSizes.sm}px;
  --spacing-lg: ${spaceSizes.lg}px;
  --spacing-xs: ${spaceSizes.xs}px;
  --spacing-xl: ${spaceSizes.xl}px;

  --border-radius-sm: 4px;
  --border-radius-md: 12px;
  --border-radius-lg: 18px;

  --border-width-sm: 1px;
  --border-width-md: 2px;
  --border-width-lg: 4px;
}

.overlay-context {
  --color-content-foreground: var(--color-dark);
  --color-content-background: var(--color-brand);
  --color-heading: var(--color-dark);
  --color-field-background: var(--color-brand-dark);
  --color-field-foreground: var(--color-dark);
  --color-control-background: var(--color-brand-light);
  --color-control-foreground: var(--color-dark);
  --color-link-foreground: var(--color-brand-dark);
  --color-link-active: var(--color-dark);
}

.neutral-content {
  --color-control-background: var(--color-gray);
  --color-control-foreground: var(--color-gray-dark);
  --color-link-foreground: var(--color-brand-dark);
  --color-link-active: var(--color-dark);
  --color-field-background: var(--color-gray);
  --color-field-foreground: var(--color-black);
  --color-effect-hover: var(--color-gray-dark);
  --color-effect-focus: var(--color-dark);
}

.positive-content {
  --color-control-background: var(--color-positive-light);
  --color-control-foreground: var(--color-white);
  --color-control-primary-background: var(--color-positive-light);
  --color-control-primary-foreground: var(--color-dark);
  --color-link-foreground: var(--color-positive-light);
  --color-link-active: var(--color-positive-dark);
  --color-field-background: var(--color-positive-dark);
  --color-field-foreground: var(--color-white);
  --color-effect-hover: #ffffff60;
  --color-effect-focus: #ffffff80;
}

.negative-content {
  --color-control-background: var(--color-negative-light);
  --color-control-foreground: var(--color-white);
  --color-control-primary-background: var(--color-negative-light);
  --color-control-primary-foreground: var(--color-white);
  --color-link-foreground: var(--color-negative-light);
  --color-link-active: var(--color-negative-dark);
  --color-field-background: var(--color-negative-dark);
  --color-field-foreground: var(--color-white);
  --color-effect-hover: #ffffff60;
  --color-effect-focus: #ffffff80;
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
  height: 100vh;
}

body {
  overflow-y: hidden;
  position: relative;
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

const brandColor = 'var(--color-brand)';
const accentColors = [
  'var(--color-positive)',
  'var(--color-negative-light)',
  'var(--color-brand-light)',
  'var(--color-positive-light)',
];
const neutralColors = [
  'var(--color-dark)',
  'var(--color-positive-dark)',
  'var(--color-negative-dark)',
  'var(--color-brand-dark)',
];
const statusColors = {
  critical: 'var(--color-negative-light)',
  error: 'var(--color-negative)',
  warning: 'var(--color-brand-dark)',
  ok: 'var(--color-positive)',
  unknown: 'var(--color-gray-light)',
  disabled: 'var(--color-gray-lightest)',
};
const darkColors = [
  'var(--color-black)',
  'var(--color-dark)',
  'var(--color-gray-dark)',
  'var(--color-gray)',
  'var(--color-gray)',
];
const lightColors = [
  'var(--color-white)',
  'var(--color-gray-lightest)',
  'var(--color-gray-light)',
  'var(--color-gray-light)',
  'var(--color-gray-light)',
];

const colors = {
  black: darkColors[0],
  white: lightColors[0],
  active: 'light-2',
  border: 'var(--color-control-background)',
  brand: brandColor,
  control: {
    dark: 'neutral-1',
    light: 'brand',
  },
  focus: 'accent-3',
};

const colorArray = (array, prefix) =>
  array.forEach((color, index) => {
    colors[`${prefix}-${index + 1}`] = color;
  });

colorArray(accentColors, 'accent');
colorArray(darkColors, 'dark');
colorArray(lightColors, 'light');
colorArray(neutralColors, 'neutral');
Object.keys(statusColors).forEach(color => {
  colors[`status-${color}`] = statusColors[color];
});

export const hoverBorder = color =>
  css`
    &:hover {
      box-shadow: 0 0 0 2px ${color};
    }
  `;
hoverBorder.default = hoverBorder('var(--color-effect-hover)');

export const focusShadow = color =>
  css`
    &:focus {
      box-shadow: 0 0 0 4px ${color};
    }
  `;
focusShadow.default = focusShadow('var(--color-effect-focus)');

const base = generate(spaceSizes.lg, 12);

export const grommetTheme = deepMerge(base, {
  global: {
    colors,
    animation: {
      duration: '0.3s',
    },
    font: {
      face: `${baseFont}, serif`,
    },
    control: {
      border: {
        width: '2px',
        color: 'var(--color-field-background)',
        radius: 'var(--border-radius-md)',
      },
    },
    input: {
      weight: 'normal',
    },
    drop: {
      background: 'var(--color-popover-background)',
    },
  },

  button: {
    border: {
      radius: 'var(--border-radius-md)',
      //color: 'brand',
    },
    primary: {
      color: {
        dark: 'accent-5',
        light: 'accent-1',
      },
    },
    padding: {
      vertical: '5px',
      horizontal: '11px',
    },
    extend: ({ primary, colorValue, theme, plain }: any) => css`
      font-style: italic;
      word-wrap: normal;
      max-width: 240px;
      border-color: ${
        colorValue
          ? normalizeColor(colorValue, theme)
          : 'var(--color-control-background)'
      };

      ${primary &&
        `background: var(--color-control-primary-background); border-color: var(--color-control-primary-background); color: var(--color-control-primary-foreground);`}

        /* divider */

        ${
          plain
            ? ''
            : primary
            ? hoverBorder(normalizeColor('accent-1', theme))
            : colorValue
            ? hoverBorder(normalizeColor(colorValue, theme))
            : hoverBorder.default
        }

        ${
          plain
            ? ''
            : primary
            ? focusShadow(normalizeColor('accent-4', theme))
            : focusShadow.default
        };
    `,
  },

  textInput: {
    extend: ({ theme, plain }: any) => css`
      font-family: ${theme.global.font.face};
      color: var(--color-field-foreground);
      padding: 5px 11px;
      transition: 0.2s ease all;

      ${plain ? '' : focusShadow.default} /* divider */

      &:disabled {
        opacity: 0.5;
      }
    `,
  },

  textArea: {
    extend: () => ({ theme }: any) => css`
      font-family: ${theme.global.font.face};
    `,
  },

  heading: {
    font: {
      family: 'var(--font-fancy)',
    },
    weight: 700,
    extend: ({ level }: any) => css`
      opacity: ${level > 1 ? '0.93' : '1'};
      font-weight: ${level < 3 ? 'var(--bold)' : 'var(--normal)'};
      font-size: ${[
        'var(--font-size-xl)',
        'var(--font-size-lg)',
        'var(--font-size-md)',
        'var(--font-size-md)',
        'var(--font-size-md)',
        'var(--font-size-md)',
      ][level]};
      line-height: 1.5;
    `,
  },
});
