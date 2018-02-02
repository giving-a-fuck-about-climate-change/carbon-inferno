import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Contribute from '../Contribute';
import ChartInfoDiv from '../ChartInfo';

import { ROOT, CONTRIBUTE_PAGE } from '../../routes/index';

import {
  Footer,
  Header,
  ActionCards,
  InfoCardSection,
  SectionTitle,
} from '../../components';

import '../../App.css';

const AppComponent = () => (
  <div>
    <div className="page-background">
      <Header />
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path={ROOT} component={ChartInfoDiv} />
            <Route path={CONTRIBUTE_PAGE} component={Contribute} />
          </Switch>
        </BrowserRouter>
      </div>
      <SectionTitle text="Give a fuck about it" />
      <ActionCards />
      <SectionTitle text="About the project" />
      <InfoCardSection />
    </div>
    <Footer />
  </div>
);

export default AppComponent;
