import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Team from '../Team';
import About from '../About';
import Contribute from '../Contribute';
import DataSources from '../DataSources';
import ChartInfo from '../ChartInfo';

import {
  ROOT,
  TEAM_PAGE,
  ABOUT_PAGE,
  CONTRIBUTE_PAGE,
  DATASOURCES_PAGE,
} from '../../routes/index';

import { Footer, Header } from '../../components';

import '../../App.css';

const AppComponent = () => (
  <div>
    <div className="page-background">
      <Header />
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path={ROOT} component={ChartInfo} />
            <Route path={TEAM_PAGE} component={Team} />
            <Route path={ABOUT_PAGE} component={About} />
            <Route path={CONTRIBUTE_PAGE} component={Contribute} />
            <Route path={DATASOURCES_PAGE} component={DataSources} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
    <Footer />
  </div>
);

export default AppComponent;
