import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';

import { setConfig } from 'react-hot-loader';

import './workbox';

setConfig({
  ignoreSFC: true,
  pureRender: true,
});

const renderApp = (AppComponent = App) => {
  ReactDOM.render(<AppComponent />, document.getElementById('main'));
};

renderApp();

if (module.hot) {
  module.hot.accept('./App/index.tsx', () => {
    const NewApp = require('./App/index').default;
    renderApp(NewApp);
  });
}
