import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';
import './theme';

import * as serviceWorker from './serviceWorker';

import { setConfig } from 'react-hot-loader';
setConfig({ pureSFC: true } as any);

ReactDOM.render(<App />, document.getElementById('main'));

serviceWorker.register({});
