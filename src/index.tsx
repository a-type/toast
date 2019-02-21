import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';

import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import { setConfig } from 'react-hot-loader';

setConfig({
  ignoreSFC: true,
  pureRender: true,
});

const renderApp = (AppComponent = App) => {
  ReactDOM.render(<AppComponent />, document.getElementById('main'));
};

renderApp();

OfflinePluginRuntime.install({
  onUpdateReady: () => OfflinePluginRuntime.applyUpdate(),
  // this isn't working right...
  //onUpdated: () => (window['swUpdate'] = true),
});

if (module.hot) {
  module.hot.accept('./App/index.tsx', () => {
    const NewApp = require('./App/index').default;
    renderApp(NewApp);
  });
}
