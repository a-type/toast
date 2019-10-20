import { createMuiTheme, fade, darken } from '@material-ui/core/styles';
import * as colors from './colors';

const shadowRgb = [0, 0, 10];
const shadowKeyUmbraOpacity = 0.15;
const shadowKeyPenumbraOpacity = 0.12;
const shadowAmbientShadowOpacity = 0.08;

const createShadow = (
  ...[umbra, penumbra, ambient]: [number, number, number, number][]
) =>
  [
    `${umbra[0]}px ${umbra[1]}px ${umbra[2]}px ${umbra[3]}px rgba(${shadowRgb[0]}, ${shadowRgb[1]}, ${shadowRgb[2]}, ${shadowKeyUmbraOpacity})`,
    `${penumbra[0]}px ${penumbra[1]}px ${penumbra[2]}px ${penumbra[3]}px rgba(${shadowRgb[0]}, ${shadowRgb[1]}, ${shadowRgb[2]}, ${shadowKeyPenumbraOpacity})`,
    `${ambient[0]}px ${ambient[1]}px ${ambient[2]}px ${ambient[3]}px rgba(${shadowRgb[0]}, ${shadowRgb[1]}, ${shadowRgb[2]}, ${shadowAmbientShadowOpacity})`,
  ].join(',');

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

  shadows: [
    'none',
    ...new Array(24)
      .fill(null)
      .map((_, idx) =>
        createShadow(
          [
            0,
            1 + Math.round(idx),
            3 + Math.round(idx),
            0 - Math.round(idx / 2),
          ],
          [
            0,
            1 + Math.round((idx * 3) / 2),
            1 + Math.round((idx * 8) / 3),
            0 + Math.round(idx / 8),
          ],
          [0, 2 + Math.round(idx / 3), 1 + idx * 3, -2 + Math.round(idx / 2)],
        ),
      ),
  ] as any,

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
