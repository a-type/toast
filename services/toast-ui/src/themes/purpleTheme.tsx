import * as colors from './colors';
import createTheme from './createTheme';

export default createTheme({
  main: colors.purple,
  contrast: colors.yellow,
  mainText: colors.white[500],
  type: 'dark',
});
