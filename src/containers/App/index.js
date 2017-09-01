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

import {
   timeHeaderLinks,
   globalSubHeader,
   graphConfig,
   datasets
} from '../../constants';

const datasetForRender = datasets[0];

// ENDPOINTS
const { apiEndpoint } = config;
const dateRangQuery = (time) => `${apiEndpoint}/api/co2/?date__range=${subDate(time)},${todaysDate()}`;
const currentUrl = `${apiEndpoint}/api/co2/?ordering=-date?&limit=1`;

// EXTENDED COMPONENT FUNCTIONALITY HELPERS

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

const populateWithClicks = (callApi, callApiWithCount) => (item) => {
  const { type } = item;
  switch (type) {
    case 'week':
      return { ...item, onClick: callApi(type) };
    case 'month':
      return { ...item, onClick: callApi(type) };
    case 'year':
      return { ...item, onClick: callApiWithCount(type) };
    default:
      return item;
  }
};

// API CALL'S

const makeApiRequest = (successMethod, errorMethod, url) => {
  return apiRequest(url)
  .then(successMethod)
  .catch(errorMethod);
}

const makeApiRequestWithCount = (successMethod, errorMethod, url) => ({ count }) => {
   return apiRequest(`${url}&limit=${count}`)
  .then(successMethod)
  .catch(errorMethod);
}

// METHODS USED TO UPDATE THE STATE

const setStateWithLoading = (url) => (prevState) => {
  return {
    loading: !prevState.loading,
    diffPPMSubHeader: calculateSubHeader(url).ppmDiff,
    diffPercentSubHeader: calculateSubHeader(url).percentDiff,
  };
}

const setStateWithApiResult = (apiResult) => (prevState) => {
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

const setStateWithCurrentPpm = (result) => () => {
  const { ppm } = result;
  return {
    currentPPM: ppm,
  };
}

const setStateWithApiError = (apiError) => () => {
  return {
    loading: false,
    error: apiError,
  }
}

// Component

class App extends Component {

  state = {
    loading: true,
    currentPPM: 0,
    ppms: [],
    dates: [],
    ppmDiff: '',
    ppmPercentDiff: '',
    error: '',
    diffPPMSubHeader: calculateSubHeader('month').ppmDiff,
    diffPercentSubHeader: calculateSubHeader('month').percentDiff,
  }

  componentDidMount() {
    // TODO Do Promise.all then update the state.
    makeApiRequest(this.updateWithApiCurrentSuccess, this.updateStateWithApiError, currentUrl)
    .then(makeApiRequest(this.updateStateWithApiSuccess, this.updateStateWithApiError, dateRangQuery('month')))
  }

  updateLoadingStateAndMakeApiRequest = (url) => (event) => {
    event.preventDefault();
    this.setState(setStateWithLoading(url), () => {
      return makeApiRequest(this.updateStateWithApiSuccess, this.updateStateWithApiError, dateRangQuery(url));
    });
  }
  /*
   The api does not return all entries for a given date range,
   if we want all entries we need to sepcify a count, here we query
   for the amount of entries for a date range and then make another query
   the specifying that we want all the entries for that date range by using
   the count param
  **/
  updateLoadingStateAndMakeApiCountRequest = (url) => (event) => {
    event.preventDefault();
    this.setState(setStateWithLoading(url), () => {
      const endpoint = dateRangQuery(url);
      // configure the request with count
      const requestWithCount = makeApiRequestWithCount(this.updateStateWithApiSuccess, this.updateStateWithApiError, endpoint);
      // when apiRequest is done requestWithCount is called with the res if sucess
      return makeApiRequest(requestWithCount, this.updateStateWithApiError, endpoint);
    });
  }
  // Only used to update state with current ppm. (TODO: Do not really need this could be handled in didMount func)
  updateWithApiCurrentSuccess = (apiResult) => {
    const { results } = apiResult;
    this.setState(setStateWithCurrentPpm(results[0]));
  }

  updateStateWithApiSuccess = (result) => this.setState(setStateWithApiResult(result));

  updateStateWithApiError = (error) => this.setState(setStateWithApiError(error));

  // Decorate links with click functionality depending on link type : year, month etc
  populateWithClickFuncs = () => {
    return populateWithClicks(this.updateLoadingStateAndMakeApiRequest, this.updateLoadingStateAndMakeApiCountRequest);
  };

  render() {
    const { currentPPM, ppmDiff, ppmPercentDiff, ppms, dates, diffPPMSubHeader, diffPercentSubHeader } = this.state;
    return (
    <div>
      <div className="page-background">
        <Header/>
        <div className="App">
          <div className="flex-grid-header">
            <TimeChoiceHeader timeHeaderLinks={timeHeaderLinks.map(this.populateWithClickFuncs())}/>
          </div>
          <div className="flex-grid">
            <InfoColumn statInfo={`${currentPPM} PPM`} subHeader={globalSubHeader}/>
            <InfoColumn statInfo={ppmDiff} subHeader={diffPPMSubHeader}/>
            <InfoColumn statInfo={ppmPercentDiff} subHeader={diffPercentSubHeader}/>
          </div>
          <div className="graph-container">
            <Line data={{...graphConfig, labels: dates, datasets: [{...datasetForRender, data: ppms}] }}/>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
  }
}

export default App;
