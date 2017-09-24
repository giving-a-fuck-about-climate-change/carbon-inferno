import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ROOT, TEAM_PAGE, ABOUT_PAGE, CONTRIBUTE_PAGE, DATASOURCES_PAGE } from './routes/index';
import App from './containers/App';
import Team from './containers/Team';
import About from './containers/About';
import Contribute from './containers/Contribute';
import DataSources from './containers/DataSources';
import loadScripts from './analytics';

import registerServiceWorker from './registerServiceWorker';

loadScripts();
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path={ROOT} component={App} />
      <Route path={TEAM_PAGE} component={Team} />
      <Route path={ABOUT_PAGE} component={About} />
      <Route path={CONTRIBUTE_PAGE} component={Contribute} />
      <Route path={DATASOURCES_PAGE} component={DataSources} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'),
);
registerServiceWorker();
