import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { HashRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../src/theme';

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /\.stories\.tsx?$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(storyFn => (
  <React.Fragment>
    <MuiThemeProvider theme={theme}>
      <HashRouter>{storyFn()}</HashRouter>
    </MuiThemeProvider>
  </React.Fragment>
));

configure(loadStories, module);
