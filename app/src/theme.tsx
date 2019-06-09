import { createMuiTheme } from '@material-ui/core/styles';
import { Global, css } from '@emotion/core';

const theme = createMuiTheme({
  typography: {
    fontFamily: '"PT Serif", "Noto Serif", serif',

    h1: {
      fontFamily: '"PlayFair Display", "PT Serif", "Noto Serif", serif',
      fontSize: '2.75rem',
    },
    h2: {
      fontFamily: '"PlayFair Display", "PT Serif", "Noto Serif", serif',
      fontSize: '2rem',
    },
    h3: {
      fontSize: '1.5rem',
    },
    h4: {
      fontSize: '1.25rem',
    },
  },

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
      default: '#fafaff',
    },
    text: {
      primary: '#290f34',
      secondary: '#7272af',
      disabled: '#d8d8fa',
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
        fontStyle: 'italic',
        color: '#290f34',
        fontSize: '1rem',
      },
      contained: {
        backgroundColor: '#e1e1ee',
      },
    },

    MuiTab: {
      root: {
        textTransform: 'none',
        fontStyle: 'italic',
      },
    },

    ...({
      MuiContainer: {
        root: {
          marginTop: '32px',
        },
      },
    } as any),
  },

  props: {
    MuiButton: {
      variant: 'outlined',
    },

    MuiTextField: {
      variant: 'outlined',
    },

    MuiTabs: {
      indicatorColor: 'primary',
    },

    MuiSelect: {
      variant: 'outlined',
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
