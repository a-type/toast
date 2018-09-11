import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './theme';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('main'));

serviceWorker.register({});
