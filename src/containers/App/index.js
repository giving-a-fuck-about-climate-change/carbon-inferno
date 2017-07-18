import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import apiRequest from '../../utils/request';

import '../../App.css';
import {
  Footer,
  Header,
  InfoColumn,
  Resources,
  TimeChoiceHeader,
} from '../../components'
import {
  calculateAverage,
  calculateDiff,
  calculatePercentageDiff,
  getData,
} from '../../utils';

const globalSubHeader = 'GLOBAL CO₂ LEVEL';
const diffPPMSubHeader = 'SINCE LAST WEEK';
const diffPercentSubHeader = 'SINCE LAST WEEK (%)';

const dateRanger = 'http://127.0.0.1:8000/api/measurements/co2/?date__range=2017-07-10,2017-07-17';
const currentUrl = 'http://127.0.0.1:8000/api/measurements/co2/?ordering=-date?&limit=1';
const data = {
  datasets: [
    {
      label: 'PPM',
      fill: true,
      lineTension: 0.1,
      backgroundColor: 'rgba(240, 153, 159, 0.81)',
      borderColor: 'rgba(255, 107, 117, 0.81)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 8,
      pointHoverRadius: 2,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
    }
  ]
}

const makeApiRequest = (successMethod, errorMethod, url) => {
   return apiRequest(url)
  .then(successMethod)
  .catch(errorMethod);
}

const updateLoadingState = (prevState) => {
  return {
    loading: !prevState.loading,
  };
}

const updateUiWithApiResult = (apiResult) => (prevState) => {
  const { results } =  apiResult;
  const { currentPPM } = prevState;
  const average = calculateAverage(results);
  return {
    loading: false,
    ppms: getData('ppm', results),
    dates: getData('date', results),
    average,
    ppmDiff: `${calculateDiff(average, currentPPM)} PPM`,
    ppmPercentDiff: `${calculatePercentageDiff(average, currentPPM)} %`,

  }
};

const updateUiWithApiCurrentResult = (result) => () => {
  const { ppm } = result;
  return {
    currentPPM: ppm,
  };
}

const updateUiWithApiError = (apiError) => () => {
  return {
    loading: false,
    error: apiError,
  }
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      currentPPM: 0,
      ppms: [],
      dates: []
    };
  }

  componentDidMount() {
    makeApiRequest(this.updateWithApiCurrentSuccess, this.updateWithApiError, currentUrl)
    .then(makeApiRequest(this.updateWithApiSuccess, this.updateWithApiError, dateRanger))
  }

  updateUiAndMakeApiRequest = (url) => {
    this.setState(updateLoadingState, () => makeApiRequest(this.updateWithApiSuccess, this.updateWithApiError, url));
  }

  updateWithApiCurrentSuccess = (apiResult) => {
    const { results } = apiResult;
    this.setState(updateUiWithApiCurrentResult(results[0]));
  }

  updateWithApiSuccess = (result) => {
    this.setState(updateUiWithApiResult(result));
  }

  updateWithApiError = (error) => this.setState(updateUiWithApiError(error));

  render() {
    const { currentPPM, ppmDiff, ppmPercentDiff, ppms, dates } = this.state;
    const dataset = data.datasets[0];
    return (
    <div>
      <div className="page-background">
        <Header/>
        <div className="App">
          <div className="flex-grid-header">
            <TimeChoiceHeader/>
          </div>
          <div className="flex-grid">
            <InfoColumn statInfo={`${currentPPM} PPM`} subHeader={globalSubHeader}/>
            <InfoColumn statInfo={ppmDiff} subHeader={diffPPMSubHeader}/>
            <InfoColumn statInfo={ppmPercentDiff} subHeader={diffPercentSubHeader}/>
          </div>
          <div>
            <Line data={{...data, labels: dates, datasets: [{...dataset, data: ppms}] }} width={500} height={200}/>
          </div>
        </div>
        <Resources/>
      </div>
      <Footer/>
    </div>
    );
  }
}

export default App;
