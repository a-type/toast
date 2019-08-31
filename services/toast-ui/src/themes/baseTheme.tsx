import { createMuiTheme } from '@material-ui/core/styles';
import * as colors from './colors';

const dummyTheme = createMuiTheme();

const theme = createMuiTheme({
  palette: {
    primary: colors.yellow,
    secondary: colors.darkGreen,
    error: colors.red,
    background: {
      paper: colors.grey[50],
      default: colors.grey[100],
    },
    text: {
      primary: colors.purple[500],
      secondary: colors.grey[900],
      disabled: colors.grey[500],
      hint: colors.grey[700],
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
    MuiButton: {
      // root: {
      //   //textTransform: 'capitalize',
      //   color: colors.purple[500],
      // },
      // contained: {
      //   backgroundColor: colors.grey[100],
      // },
      // outlinedPrimary: {
      //   color: colors.yellow[800],
      //   borderColor: colors.yellow[800],
      // },
      // outlinedSecondary: {
      //   color: colors.green[900],
      //   borderColor: colors.green[900],
      // },
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

export default theme;
