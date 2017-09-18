import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ROOT, TEAM_PAGE } from './routes/index';
import App from './containers/App';
import Team from './containers/Team';
import loadScripts from './analytics';

import registerServiceWorker from './registerServiceWorker';

loadScripts();
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path={ROOT} component={App} />
      <Route path={TEAM_PAGE} component={Team} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'),
);
registerServiceWorker();
