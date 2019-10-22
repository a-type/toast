import React, { FC } from 'react';
import yellowTheme from './yellowTheme';
import { ThemeProvider } from '@material-ui/styles';

export type DynamicThemeProviderProps = {};

export const DynamicThemeProvider: FC<DynamicThemeProviderProps> = ({
  children,
}) => {
  return <ThemeProvider theme={yellowTheme}>{children}</ThemeProvider>;
};
