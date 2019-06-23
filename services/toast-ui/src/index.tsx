/// <reference types="@emotion/core"/>

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';

import { setConfig } from 'react-hot-loader';

import './workbox';

setConfig({
  reloadHooks: false,
} as any);

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