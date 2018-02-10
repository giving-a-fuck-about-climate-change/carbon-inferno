import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ChartInfoDiv from '../ChartInfo';

import {
  Header,
  ActionCards,
  InfoCardSection,
  SectionTitle,
} from '../../components';

import '../../App.css';

const AppComponent = () => (
  <div className="page-background">
    <Header />
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/:time?" component={ChartInfoDiv} />
        </Switch>
      </BrowserRouter>
    </div>
    <SectionTitle text="Give a fuck about it" />
    <ActionCards />
    <SectionTitle text="About the project" />
    <InfoCardSection />
  </div>
);

export default AppComponent;
