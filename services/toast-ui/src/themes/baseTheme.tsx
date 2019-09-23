import { createMuiTheme, fade, darken } from '@material-ui/core/styles';
import * as colors from './colors';

const dummyTheme = createMuiTheme();

const theme = createMuiTheme({
  palette: {
    primary: colors.yellow,
    secondary: colors.green,
    error: colors.red,
    background: {
      paper: colors.white[50],
      default: colors.grey[50],
    },
    text: {
      primary: colors.black[500],
      secondary: colors.black[300],
      disabled: colors.grey[500],
      hint: colors.grey[700],
    },
    grey: colors.grey,
    action: {
      active: fade(colors.black[500], 0.54),
      hover: fade(colors.black[500], 0.08),
      selected: fade(colors.black[500], 0.14),
      disabled: fade(colors.black[500], 0.26),
      disabledBackground: fade(colors.black[500], 0.12),
    },
  },

  typography: {
    h1: {
      fontSize: '3.5rem',
    },
    h2: {
      fontSize: '2.75rem',
    },
    h3: {
      fontSize: '2.25rem',
    },
    h4: {
      fontSize: '2rem',
    },
    h5: {
      fontSize: '1.5rem',
    },
    h6: {
      fontSize: '1.25rem',
    },
  },

  shape: {
    borderRadius: 8,
  },

  overrides: {
    MuiTextField: {
      variant: 'filled',
    },

    MuiFilledInput: {
      root: {
        backgroundColor: fade(colors.purple[500], 0.1),
      },
    },

    MuiButton: {
      contained: {
        backgroundColor: colors.grey[100],
        '&$disabled': {
          backgroundColor: fade(colors.purple[500], 0.1),
        },
        '&:hover': {
          backgroundColor: colors.grey[50],
        },
        boxShadow: 'none',
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
    MuiTextField: {
      variant: 'outlined',
    },
    MuiPaper: {
      elevation: 0,
    },
  },
});

export default theme;
