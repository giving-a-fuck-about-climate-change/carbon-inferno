import loadScripts from './analytics';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

loadScripts();
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
