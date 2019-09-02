import {
  createMuiTheme,
  PaletteColorOptions,
  lighten,
  fade,
} from '@material-ui/core/styles';
import baseTheme from './baseTheme';
import { ThemeOptions, Theme } from '@material-ui/core/styles/createMuiTheme';
import { mergeDeepRight } from 'ramda';
import * as colors from './colors';

export default (
  {
    main,
    contrast,
    mainText,
    type = 'light',
  }: {
    main: PaletteColorOptions;
    contrast: PaletteColorOptions;
    mainText: string;
    type?: 'light' | 'dark';
  },
  overrides?: ThemeOptions,
) => {
  const stylized = {
    palette: {
      type,
      primary: main,
      secondary: contrast,
      background: {
        paper:
          type === 'dark'
            ? colors.purple[500]
            : baseTheme.palette.background.paper,
        default:
          type === 'dark'
            ? colors.purple[900]
            : baseTheme.palette.background.default,
      },
      grey: colors.grey,
    },

    overrides: {
      MuiButton: {
        root: {
          color: mainText,
        },
        contained: {
          backgroundColor: lighten(main[500], 0.1),
          '&:hover': {
            backgroundColor: lighten(main[500], 0.3),
          },
          '&$focused': {
            backgroundColor: lighten(main[500], 0.2),
          },
        },
      },
    },
  };

  return createMuiTheme(
    [baseTheme, stylized, overrides].filter(Boolean).reduce(mergeDeepRight),
  );
};
