import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { GlobalStyle, grommetTheme } from '../src/theme';
import { Grommet } from 'grommet';
import { HashRouter } from 'react-router-dom';

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /\.stories\.tsx?$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(storyFn => (
  <React.Fragment>
    <HashRouter>
      <Grommet theme={grommetTheme}>
        {storyFn()}
      </Grommet>
    </HashRouter>
    <GlobalStyle />
  </React.Fragment>
));

configure(loadStories, module);
