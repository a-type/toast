import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';

import { setConfig } from 'react-hot-loader';

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

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
