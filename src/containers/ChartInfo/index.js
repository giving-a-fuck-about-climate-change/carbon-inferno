import React, { Component } from 'react';
import 'whatwg-fetch';
import fetchData from '../../utils/request';

import config from '../../config';

import {
  InfoColumnHOC,
  LoadingWrapper,
  TimeChoiceHeader,
  PpmChart,
  Loading,
} from '../../components';

import {
  calculateAverage,
  calculateDiff,
  calculatePercentageDiff,
  createGraphData,
  todaysDate,
  subDate,
} from '../../utils';

import { timeHeaderLinks, WEEK, MONTH, YEAR, ALL } from '../../constants';

//  ----- ENDPOINTS -----

const { apiEndpoint } = config;

const ppmEndpoint = `${apiEndpoint}/api/co2`;

const dateRangQuery = timePeriod =>
  `${ppmEndpoint}/?ordering=+date&date__range=${subDate(
    timePeriod,
  )},${todaysDate()}`;

const currentPpmEndpoint = `${ppmEndpoint}/?ordering=-date?&limit=1`;

const getEndpointForAll = count =>
  `${ppmEndpoint}/?ordering=+date&limit=${count}`;

// ----- EXTENDED COMPONENT FUNCTIONALITY HELPERS -----

const calculateSubHeader = (rangeType) => {
  const getHeader = range => ({
    ppmDiff: `SINCE LAST ${range}`,
    percentDiff: `SINCE LAST ${range} (%)`,
  });
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
/**
  Each item needs to be configured differently when using
  their corresponding click function
* */
const addClickFunctionality = clickFunc => (item) => {
  const { type } = item;
  return type === YEAR
    ? { ...item, onClick: clickFunc(type, true) }
    : { ...item, onClick: clickFunc(type) };
};

// ----- METHODS USED TO UPDATE THE STATE -----

const setStateWithLoading = rangeType => (prevState) => {
  const { ppmDiff, percentDiff } = calculateSubHeader(rangeType);
  return {
    loading: !prevState.loading,
    diffPPMSubHeader: ppmDiff,
    diffPercentSubHeader: percentDiff,
    rangeType,
  };
};

const setStateWithApiResult = results => (prevState) => {
  const { currentPPM, rangeType } = prevState;
  const average = calculateAverage(results);
  return {
    loading: false,
    average,
    ppmDiff: `${calculateDiff(average, currentPPM)} PPM`,
    ppmPercentDiff: `${calculatePercentageDiff(average, currentPPM)} %`,
    data: createGraphData(results, rangeType === ALL),
  };
};

const setStateWithApiError = apiError => () => ({
  loading: false,
  error: apiError,
});

class ChartInfo extends Component {
 state = {
   loading: true,
   currentPPM: 0,
   ppmDiff: '', // difference in numbers for ppm
   ppmPercentDiff: '', // difference in % for ppm
   error: '',
   diffPPMSubHeader: '', // string used for subHeader, eg: 'since last year'
   diffPercentSubHeader: '', // string used for subHeader, eg: 'since last month'
   count: 0, // total recorded ppms for 'all' query
   rangeType: ALL, // Intitial date range query type
   data: [],
 };
 componentDidMount() {
   this.fetchInitialData();
 }
  /*
   When the component mounts we want to make two queries
    - Req1: Returns the current ppm and total amount of ppms ever recorded (used for the query to get all ppms).
    - Req2: Returns ALL ppms ever recorded.
  */
 async fetchInitialData() {
   try {
     const currentPPM = await fetchData(currentPpmEndpoint);
     const { count, results } = currentPPM;
     const { ppm } = results[0];
     this.setState({ currentPPM: ppm, count }, this.fetchPpms);
   } catch (err) {
     this.setState(setStateWithApiError(err));
   }
 }

 fetchPpms = async () => {
   const { rangeType, count } = this.state;
   const isReqForAll = rangeType === ALL;
   const endpoint = isReqForAll
     ? getEndpointForAll(count)
     : dateRangQuery(rangeType); // endpoint differs between All and others
   try {
     const { results } = await fetchData(endpoint);
     this.setState(setStateWithApiResult(results));
   } catch (err) {
     this.setState(setStateWithApiError(err));
   }
 };

  /*
   The api does not return all entries for a given time period,
   if we want all entries for a time period we need to sepcify a count, here we query
   for the amount of entries for a time period and then make another query
   specifying that we want all the entries for that date range by using
   the count param.
  */
 fetchPpmsForRangeBasedOnCount = async () => {
   // only call api when the rangeType has changed.
   const { rangeType } = this.state;
   try {
     const endpoint = dateRangQuery(rangeType);
     const { count } = await fetchData(endpoint); // get total amount of ppms for specified date range
     const { results } = await fetchData(`${endpoint}&limit=${count}`); // query for ppms limiting to count result
     this.setState(setStateWithApiResult(results));
   } catch (err) {
     this.setState(setStateWithApiError(err));
   }
 };

 handlePpmClick = (rangeType, basedOnCount = false) => (event) => {
   event.preventDefault();
   if (rangeType !== this.state.rangeType) {
     // only call api when the rangeType has changed.
     this.setState(
       setStateWithLoading(rangeType),
       basedOnCount ? this.fetchPpmsForRangeBasedOnCount : this.fetchPpms,
     );
   }
 };

 render() {
   const {
     currentPPM,
     ppmDiff,
     ppmPercentDiff,
     diffPPMSubHeader,
     diffPercentSubHeader,
     rangeType,
     loading,
     data,
   } = this.state;
   return (
     <div>
       <div className="flex-grid-header">
         <TimeChoiceHeader
           timeHeaderLinks={timeHeaderLinks.map(
             addClickFunctionality(this.handlePpmClick),
           )}
         />
       </div>
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
           <LoadingWrapper
             loading
             renderLoading={() => <Loading />}
             renderDiv={() =>
               (data.length > 0 ? (
                 <PpmChart data={data} rangeType={rangeType} />
               ) : null)}
           />
         </div>
       </div>
     </div>
   );
 }
}

export default ChartInfo;
