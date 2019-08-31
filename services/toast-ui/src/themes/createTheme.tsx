import {
  createMuiTheme,
  PaletteColorOptions,
  lighten,
  fade,
} from '@material-ui/core/styles';
import baseTheme from './baseTheme';
import { ThemeOptions, Theme } from '@material-ui/core/styles/createMuiTheme';
import { mergeDeepRight } from 'ramda';

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
  const stylized = createMuiTheme({
    palette: {
      type,
      primary: contrast,
      secondary: main,
      background: {
        paper: main[500],
        default: main[900],
      },
      text: {
        primary: mainText,
        secondary: lighten(mainText, 0.2),
        disabled: fade(mainText, 0.2),
        hint: lighten(mainText, 0.1),
      },
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
  });

  return [baseTheme, stylized, overrides]
    .filter(Boolean)
    .reduce(mergeDeepRight) as Theme;
};
