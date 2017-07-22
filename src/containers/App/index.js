import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import apiRequest from '../../utils/request';

import config from '../../config';

import '../../App.css';
import {
  Footer,
  Header,
  InfoColumn,
  TimeChoiceHeader,
} from '../../components'
import {
  calculateAverage,
  calculateDiff,
  calculatePercentageDiff,
  getData,
  todaysDate,
  subDate,
  reverseArray
} from '../../utils';
import { timeHeaderLinks } from '../../constants';


const globalSubHeader = 'GLOBAL CO₂ LEVEL';

const calculateSubHeader = (timePeriod) => {
  const getHeader = (period) => {
    return { ppmDiff: `SINCE LAST ${period}`, percentDiff: `SINCE LAST ${period} (%)` }
  };
  switch (timePeriod) {
    case 'week':
      return getHeader('week');
    case 'month':
      return getHeader('month');
    case 'year':
      return getHeader('year');
    default:
    return { ppmDiff: '', percentDiff: '' };
  }
};

const { apiEndpoint } = config;

const dateRangQuery = (time) => `${apiEndpoint}/api/co2/?date__range=${subDate(time)},${todaysDate()}`;
const currentUrl = `${apiEndpoint}/api/co2/?ordering=-date?&limit=1`;
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
    }
  ]
}

const populateWithClicks = (weekFunc, monthFunc, yearFunc) => (item) => {
  const { text } = item;
  const contains = (time) => {
    return text.toLowerCase().indexOf(time) !== -1;
  };
  if (contains('week')) {
    return { ...item, onClick: weekFunc};
  }
  if (contains('month')) {
    return { ...item, onClick: monthFunc};
  }
  if (contains('year')) {
    return { ...item, onClick: yearFunc};
  }
  return item;
};

const makeApiRequest = (successMethod, errorMethod, url) => {
   return apiRequest(url)
  .then(successMethod)
  .catch(errorMethod);
}

const makeApiRequestWithCount = (successMethod, errorMethod, url) => (result) => {
   return apiRequest(`${url}&limit=${result.count}`)
  .then(successMethod)
  .catch(errorMethod);
}

const updateLoadingState = (url) => (prevState) => {
  return {
    loading: !prevState.loading,
    diffPPMSubHeader: calculateSubHeader(url).ppmDiff,
    diffPercentSubHeader: calculateSubHeader(url).percentDiff,

  };
}

const updateUiWithApiResult = (apiResult) => (prevState) => {
  const { results } =  apiResult;
  const { currentPPM } = prevState;
  const average = calculateAverage(results);
  return {
    loading: false,
    ppms: reverseArray(getData('ppm', results)),
    dates: reverseArray(getData('date', results)),
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
      dates: [],
      ppmDiff: '',
      ppmPercentDiff: '',
      error: '',
      diffPPMSubHeader: calculateSubHeader('month').ppmDiff,
      diffPercentSubHeader: calculateSubHeader('month').percentDiff,
    };
  }

  componentDidMount() {
    makeApiRequest(this.updateWithApiCurrentSuccess, this.updateWithApiError, currentUrl)
    .then(makeApiRequest(this.updateWithApiSuccess, this.updateWithApiError, dateRangQuery('month')))
  }

  updateUiAndMakeApiRequest = (url) => (event) => {
    event.preventDefault();
    this.setState(updateLoadingState(url), () => makeApiRequest(this.updateWithApiSuccess, this.updateWithApiError, dateRangQuery(url)));
  }

  updateUiAndMakeApiCountRequest = (url) => (event) => {
    event.preventDefault();
    this.setState(updateLoadingState(url), () => {
      const urlEndpoint = dateRangQuery(url);
      const successMethod = makeApiRequestWithCount(this.updateWithApiSuccess, this.updateWithApiError, urlEndpoint);
      return makeApiRequest(successMethod, this.updateWithApiError, urlEndpoint);
    });
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
    const { currentPPM, ppmDiff, ppmPercentDiff, ppms, dates, diffPPMSubHeader, diffPercentSubHeader } = this.state;
    const dataset = data.datasets[0];
    return (
    <div>
      <div className="page-background">
        <Header/>
        <div className="App">
          <div className="flex-grid-header">
            <TimeChoiceHeader
              timeHeaderLinks={timeHeaderLinks.map(populateWithClicks(this.updateUiAndMakeApiRequest('week'), this.updateUiAndMakeApiRequest('month'), this.updateUiAndMakeApiCountRequest('year')))}/>
          </div>
          <div className="flex-grid">
            <InfoColumn statInfo={`${currentPPM} PPM`} subHeader={globalSubHeader}/>
            <InfoColumn statInfo={ppmDiff} subHeader={diffPPMSubHeader}/>
            <InfoColumn statInfo={ppmPercentDiff} subHeader={diffPercentSubHeader}/>
          </div>
          <div className="graph-container">
            <Line data={{...data, labels: dates, datasets: [{...dataset, data: ppms}] }}/>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
  }
}

export default App;
