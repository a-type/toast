import React from 'react';
import { css, Global } from '@emotion/core';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#1ecbb4',
      light: '#bff4ed',
      dark: '#12b89c',
    },
    primary: {
      main: '#f6c667',
      light: '#fceed1',
      dark: '#f2b14a',
    },
    error: {
      main: '#b30753',
    },
    grey: {
      50: '#f3f3f8',
      100: '#e1e1ee',
      200: '#cecee3',
      300: '#babad8',
      400: '#ababcf',
      500: '#9c9cc7',
      600: '#9494c1',
      700: '#8a8aba',
      800: '#8080b3',
      900: '#6e6ea6',
      A100: '#ffffff',
      A200: '#eeeeff',
      A400: '#bbbbff',
      A700: '#a1a1ff',
    },
    background: {
      paper: '#fefeff',
      default: '#fefeff',
    },
    text: {
      primary: '#290f34',
      secondary: '#7272af',
      disabled: '#babad7',
      hint: '#d8d8fa',
    },
  },

  shape: {
    borderRadius: 8,
  },

  overrides: {
    MuiButton: {
      root: {
        textTransform: 'capitalize',
        color: '#290f34',
      },
      contained: {
        backgroundColor: '#e1e1ee',
      },
      outlinedPrimary: {
        color: '#e3a33d',
        borderColor: '#e3a33d',
      },
      outlinedSecondary: {
        color: '#12b89c',
        borderColor: '#12b89c',
      },
    },

    MuiTab: {
      root: {
        textTransform: 'none',
        fontStyle: 'italic',
        ['@media(min-width: 960px)']: {
          fontSize: '1rem',
        },
      },
    },

    ...({
      MuiContainer: {
        root: {
          marginTop: '32px',
          marginBottom: '64px',
        },
      },
    } as any),
  },

  props: {
    MuiTabs: {
      indicatorColor: 'primary',
    },
  },
});

export const GlobalCssVariables = () => (
  <Global
    styles={css`
      :root {
        --color-white: #fefeff;
        --color-black: #290f34;

        --color-primary: ${theme.palette.primary.main};
        --color-primary-dark: ${theme.palette.primary.dark};
        --color-primary-light: ${theme.palette.primary.light};

        --color-secondary: ${theme.palette.secondary.main};
        --color-secondary-dark: ${theme.palette.secondary.dark};
        --color-secondary-light: ${theme.palette.secondary.light};

        --color-error: ${theme.palette.error.main};
        --color-error-dark: ${theme.palette.error.dark};
        --color-error-light: ${theme.palette.error.light};

        ${Object.keys(theme.palette.grey).map(
          key => `--color-grey-${key}: ${theme.palette.grey[key]};`,
        )}

        --spacing-xs: ${theme.spacing(1)}px;
        --spacing-sm: ${theme.spacing(2)}px;
        --spacing-md: ${theme.spacing(3)}px;
        --spacing-lg: ${theme.spacing(4)}px;
        --spacing-xl: ${theme.spacing(5)}px;

        --border-radius-sm: 2px;
        --border-radius-md: 4px;
        --border-radius-lg: 8px;
      }
    `}
  />
);

export default theme;
