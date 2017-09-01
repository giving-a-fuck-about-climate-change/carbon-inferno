import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

import apiRequest from '../../utils/request';

import config from '../../config';

import '../../App.css';

import {
  Footer,
  Header,
  InfoColumnHOC,
  TimeChoiceHeader,
  LoadingWrapper
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
   graphConfig,
   datasets,
   WEEK,
   MONTH,
   YEAR,
   ALL
} from '../../constants';

const datasetForRender = datasets[0];

// ENDPOINTS

const { apiEndpoint } = config;
const ppmEndpoint = `${apiEndpoint}/api/co2`;
const dateRangQuery = (timePeriod) => `${ppmEndpoint}/?date__range=${subDate(timePeriod)},${todaysDate()}`;
const currentPpmEndpoint= `${ppmEndpoint}/?ordering=-date?&limit=1`;
const getEndpointForAll = ({ count }) => `${ppmEndpoint}/?limit=${count}`;

// EXTENDED COMPONENT FUNCTIONALITY HELPERS

const rangeTypeHasChanged = (updatedRangeType, currentRangeType) => {
  return updatedRangeType !== currentRangeType
};

const calculateSubHeader = (rangeType) => {
  const getHeader = (range) => {
    return { ppmDiff: `SINCE LAST ${range}`, percentDiff: `SINCE LAST ${range} (%)` }
  };
  switch (rangeType) {
    case WEEK:
      return getHeader(WEEK);
    case MONTH:
      return getHeader(MONTH);
    case YEAR:
      return getHeader(YEAR);
    default:
    return { ppmDiff: '', percentDiff: '' };
  }
};

const initalSubHeader = calculateSubHeader(MONTH);

const populateWithClicks = (callApi, callApiWithCount) => (item) => {
  const { type } = item;
  switch (type) {
    case WEEK:
      return { ...item, onClick: callApi(type) };
    case MONTH:
      return { ...item, onClick: callApi(type) };
    case YEAR:
      return { ...item, onClick: callApiWithCount(type) };
    case ALL:
      return { ...item, onClick: callApi(type) };
    default:
      return item;
  }
};

// API CALL'S

const makeApiReq = (successMethod, errorMethod, url) => {
  return apiRequest(url)
  .then(successMethod)
  .catch(errorMethod);
}

const makeApiReqWithCount = (successMethod, errorMethod, url) => ({ count }) => {
   return apiRequest(`${url}&limit=${count}`)
  .then(successMethod)
  .catch(errorMethod);
}

// METHODS USED TO UPDATE THE STATE

const setStateWithLoading = (rangeType) => (prevState) => {
  const { ppmDiff, percentDiff} = calculateSubHeader(rangeType);
  return {
    loading: !prevState.loading,
    diffPPMSubHeader: ppmDiff,
    diffPercentSubHeader: percentDiff,
    rangeType,
  };
}

const setStateWithApiResult = (rangeType, apiResponse) => (prevState) => {
  const { results } =  apiResponse;
  const { currentPPM } = prevState;
  const average = calculateAverage(results);
  return {
    loading: false,
    ppms: reverseArray(getData('ppm', results)),
    dates: reverseArray(getData('date', results)),
    average,
    ppmDiff: `${calculateDiff(average, currentPPM)} PPM`,
    ppmPercentDiff: `${calculatePercentageDiff(average, currentPPM)} %`,
    rangeType,
  }
};

const setStateWithCurrentPpm = (apiResponse) => () => {
  const { count, results } = apiResponse;
  const { ppm } = results[0];
  return {
    currentPPM: ppm,
    count,
  };
}

const setStateWithApiError = (rangeType, apiError) => () => {
  return {
    loading: false,
    error: apiError,
    rangeType,
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
    diffPPMSubHeader: initalSubHeader.ppmDiff,
    diffPercentSubHeader: initalSubHeader.percentDiff,
    count: 0, // total recorded ppms for 'all' query
    rangeType: MONTH, // Intitial date range query
  }
  /**
   When the component mounts we want to make two queries
    - Get the current ppm and total amount of ppms ever (used for all).
    - The amount of ppms for this month
  **/
  componentDidMount() {
    // TODO Do Promise.all then update the state (avoids two renders :D ).
    makeApiReq(this.updateWithApiCurrentSuccess, this.updateStateWithApiError(MONTH), currentPpmEndpoint)
    .then(makeApiReq(this.updateStateWithApiSuccess(MONTH), this.updateStateWithApiError(MONTH), dateRangQuery(MONTH)))
  }

  updateLoadingStateAndMakeApiReq = (rangeType) => (event) => {
    event.preventDefault();
    if (rangeTypeHasChanged(rangeType, this.state.rangeType)) { // only call api when the rangeType has changed.
      this.setState(setStateWithLoading(rangeType), () => {
        const isReqForAll = rangeType === ALL
        const endpoint = isReqForAll ? getEndpointForAll(this.state) : dateRangQuery(rangeType);
        return makeApiReq(this.updateStateWithApiSuccess(rangeType), this.updateStateWithApiError(rangeType), endpoint);
      });
    }
  }
  /*
   The api does not return all entries for a given date range,
   if we want all entries we need to sepcify a count, here we query
   for the amount of entries for a date range and then make another query
   the specifying that we want all the entries for that date range by using
   the count param
  **/
  updateLoadingStateAndMakeApiCountReq = (rangeType) => (event) => {
    event.preventDefault();
    if (rangeTypeHasChanged(rangeType, this.state.rangeType)) { // only call api when the rangeType has changed.
      this.setState(setStateWithLoading(rangeType), () => {
        const endpoint = dateRangQuery(rangeType);
        // configure the request with count
        const reqWithCount = makeApiReqWithCount(this.updateStateWithApiSuccess(rangeType), this.updateStateWithApiError(rangeType), endpoint);
        // when the below is done, requestWithCount is called with the res if successful
        return makeApiReq(reqWithCount, this.updateStateWithApiError(rangeType), endpoint);
      });
    }
  }
  // Only used to update state with current ppm and total count of entries (needed for 'all' query)
  updateWithApiCurrentSuccess = (apiResult) => this.setState(setStateWithCurrentPpm(apiResult));

  updateStateWithApiSuccess = (rangeType) => (result) => this.setState(setStateWithApiResult(rangeType, result));

  updateStateWithApiError = (rangeType) => (error) => this.setState(setStateWithApiError(rangeType, error));

  // Decorate links with click functionality depending on link type : year, month etc
  populateWithClickFuncs = () => {
    return populateWithClicks(this.updateLoadingStateAndMakeApiReq, this.updateLoadingStateAndMakeApiCountReq);
  };

  render() {
    const { currentPPM, ppmDiff, ppmPercentDiff, ppms, dates, diffPPMSubHeader, diffPercentSubHeader, rangeType, loading } = this.state;
    return (
    <div>
      <div className="page-background">
        <Header/>
        <div className="App">
          <div className="flex-grid-header">
            <div> test div </div>
            <TimeChoiceHeader timeHeaderLinks={timeHeaderLinks.map(this.populateWithClickFuncs())}/>
          </div>
          <LoadingWrapper loading={loading}>
            <div>
              <InfoColumnHOC
                rangeType={rangeType}
                currentPPM={currentPPM}
                ppmDiff={ppmDiff}
                ppmPercentDiff={ppmPercentDiff}
                diffPPMSubHeader={diffPPMSubHeader}
                diffPercentSubHeader={diffPercentSubHeader}
              />
              <div className="graph-container">
                <Line data={{...graphConfig, labels: dates, datasets: [{...datasetForRender, data: ppms}] }}/>
              </div>
            </div>
         </LoadingWrapper>
        </div>
      </div>
      <Footer/>
    </div>
  );
  }
}

export default App;
