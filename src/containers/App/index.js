import React from 'react';

import '../../App.css';

import { Footer, Header } from '../../components';

import ChartInfo from '../ChartInfo';

export const App = () => (
  <div>
    <div className="page-background">
      <Header />
      <div className="App">
        <ChartInfo />
      </div>
      <Footer />
    </div>
  </div>
);

export default App;
