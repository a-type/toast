import React, { FC } from 'react';
import useRouter from 'use-react-router';
import yellowTheme from './yellowTheme';
import greenTheme from './greenTheme';
import redTheme from './redTheme';
import { Theme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

export type DynamicThemeProviderProps = {};

const themeMappings: [RegExp, Theme][] = [
  [/^\/home.*/, yellowTheme],
  [/^\/explore.*/, greenTheme],
  [/^\/collections.*/, redTheme],
];

export const DynamicThemeProvider: FC<DynamicThemeProviderProps> = ({
  children,
}) => {
  const { location } = useRouter();

  const matchedTheme = themeMappings.reduce<Theme | null>(
    (match, [regex, theme]) => {
      if (match) return match;
      if (regex.test(location.pathname)) return theme;
      return match;
    },
    null,
  );

  return (
    <ThemeProvider theme={matchedTheme || yellowTheme}>
      {children}
    </ThemeProvider>
  );
};
