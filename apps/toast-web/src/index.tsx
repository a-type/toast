import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';
import './theme';

import * as OfflinePluginRuntime from 'offline-plugin/runtime';

import { setConfig } from 'react-hot-loader';
setConfig({ pureSFC: true } as any);

ReactDOM.render(<App />, document.getElementById('main'));

OfflinePluginRuntime.install({
  onUpdateReady: () => OfflinePluginRuntime.applyUpdate(),
  onUpdated: () => (window['swUpdate'] = true),
});
