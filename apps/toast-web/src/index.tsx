import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';

import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import { setConfig } from 'react-hot-loader';

setConfig({
  ignoreSFC: true,
  pureRender: true,
});

ReactDOM.render(<App />, document.getElementById('main'));

OfflinePluginRuntime.install({
  onUpdateReady: () => OfflinePluginRuntime.applyUpdate(),
  // this isn't working right...
  //onUpdated: () => (window['swUpdate'] = true),
});

if (module.hot) {
  module.hot.accept();
}
