import React, { Component } from "react";
import "whatwg-fetch";
import { Line } from "react-chartjs-2";

import fetchData from "../../utils/request";

import config from "../../config";

import {
  InfoColumnHOC,
  LoadingWrapper,
  TimeChoiceHeader
} from "../../components";

import {
  calculateAverage,
  calculateDiff,
  calculatePercentageDiff,
  getData,
  todaysDate,
  subDate
} from "../../utils";

import {
  timeHeaderLinks,
  graphConfig,
  datasets,
  WEEK,
  MONTH,
  YEAR,
  ALL
} from "../../constants";

const datasetForRender = datasets[0];

// ENDPOINTS

const { apiEndpoint } = config;
const ppmEndpoint = `${apiEndpoint}/api/co2`;

const dateRangQuery = timePeriod =>
  `${ppmEndpoint}/?ordering=+date&date__range=${subDate(
    timePeriod
  )},${todaysDate()}`;
const currentPpmEndpoint = `${ppmEndpoint}/?ordering=-date?&limit=1`;
const getEndpointForAll = ({ count }) =>
  `${ppmEndpoint}/?ordering=+date&limit=${count}`;
const monthEndpoint = dateRangQuery(MONTH);

// EXTENDED COMPONENT FUNCTIONALITY HELPERS

const rangeTypeHasChanged = (updatedRangeType, currentRangeType) =>
  updatedRangeType !== currentRangeType;

const calculateSubHeader = rangeType => {
  const getHeader = range => ({
    ppmDiff: `SINCE LAST ${range}`,
    percentDiff: `SINCE LAST ${range} (%)`
  });
  switch (rangeType) {
    case WEEK:
      return getHeader(WEEK);
    case MONTH:
      return getHeader(MONTH);
    case YEAR:
      return getHeader(YEAR);
    default:
      return { ppmDiff: "", percentDiff: "" };
  }
};

const initalSubHeader = calculateSubHeader(MONTH);

const populateWithClicks = (callApi, callApiWithCount) => item => {
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

// METHODS USED TO UPDATE THE STATE

const setStateWithLoading = rangeType => prevState => {
  const { ppmDiff, percentDiff } = calculateSubHeader(rangeType);
  return {
    loading: !prevState.loading,
    diffPPMSubHeader: ppmDiff,
    diffPercentSubHeader: percentDiff,
    rangeType
  };
};

const setStateWithApiResult = (rangeType, results) => prevState => {
  const { currentPPM } = prevState;
  const average = calculateAverage(results);
  return {
    loading: false,
    ppms: getData("ppm", results),
    dates: getData("date", results),
    average,
    ppmDiff: `${calculateDiff(average, currentPPM)} PPM`,
    ppmPercentDiff: `${calculatePercentageDiff(average, currentPPM)} %`,
    rangeType
  };
};

const setStateWithInitialPpmReq = apiResponse => () => {
  const { currentPPM, ppmsForMonth, totalPPMCount, rangeType } = apiResponse;
  const average = calculateAverage(ppmsForMonth);
  return {
    loading: false,
    currentPPM,
    count: totalPPMCount,
    ppms: getData("ppm", ppmsForMonth),
    dates: getData("date", ppmsForMonth),
    average,
    ppmDiff: `${calculateDiff(average, currentPPM)} PPM`,
    ppmPercentDiff: `${calculatePercentageDiff(average, currentPPM)} %`,
    rangeType
  };
};

const setStateWithApiError = (rangeType, apiError) => () => ({
  loading: false,
  error: apiError,
  rangeType
});

// Component
class ChartInfo extends Component {
  state = {
    loading: true,
    currentPPM: 0,
    ppms: [],
    dates: [],
    ppmDiff: "",
    ppmPercentDiff: "",
    error: "",
    diffPPMSubHeader: initalSubHeader.ppmDiff,
    diffPercentSubHeader: initalSubHeader.percentDiff,
    count: 0, // total recorded ppms for 'all' query
    rangeType: MONTH // Intitial date range query
  };
  /*
   When the component mounts we want to make two queries
    - Get the current ppm and total amount of ppms ever (used for the query to get all ppms).
    - The amount of ppms for this month
  */
  async componentDidMount() {
    try {
      const [currentPPM, ppmsForMonth] = await Promise.all([
        fetchData(currentPpmEndpoint),
        fetchData(monthEndpoint)
      ]);
      const totalPPMCount = currentPPM.count;
      const { ppm } = currentPPM.results[0];
      const { results } = ppmsForMonth;
      this.setState(
        setStateWithInitialPpmReq({
          currentPPM: ppm,
          ppmsForMonth: results,
          totalPPMCount
        })
      );
    } catch (err) {
      this.setState(setStateWithApiError(MONTH, err)); // eslint-disable-line
    }
  }

  fetchPpmsForRange = rangeType => event => {
    event.preventDefault();
    if (rangeTypeHasChanged(rangeType, this.state.rangeType)) {
      // only call api when the rangeType has changed.
      this.setState(setStateWithLoading(rangeType), async () => {
        const isReqForAll = rangeType === ALL;
        const endpoint = isReqForAll
          ? getEndpointForAll(this.state)
          : dateRangQuery(rangeType);
        try {
          const { results } = await fetchData(endpoint);
          this.setState(setStateWithApiResult(rangeType, results));
        } catch (err) {
          this.setState(setStateWithApiError(rangeType, err));
        }
      });
    }
  };
  /*
   The api does not return all entries for a given date range,
   if we want all entries we need to sepcify a count, here we query
   for the amount of entries for a date range and then make another query
   the specifying that we want all the entries for that date range by using
   the count param
  */
  fetchPpmsForRangeBasedOnCount = rangeType => event => {
    event.preventDefault();
    if (rangeTypeHasChanged(rangeType, this.state.rangeType)) {
      // only call api when the rangeType has changed.
      this.setState(setStateWithLoading(rangeType), async () => {
        try {
          const endpoint = dateRangQuery(rangeType);
          const { count } = await fetchData(endpoint); // get total amount of ppms for specified date range
          const { results } = await fetchData(`${endpoint}&limit=${count}`); // query for ppms limiting to count result
          this.setState(setStateWithApiResult(rangeType, results));
        } catch (err) {
          this.setState(setStateWithApiError(rangeType, err));
        }
      });
    }
  };

  // Decorate links with click functionality depending on link type : year, month etc
  populateWithClickFuncs = () =>
    populateWithClicks(
      this.fetchPpmsForRange,
      this.fetchPpmsForRangeBasedOnCount
    );

  render() {
    const {
      currentPPM,
      ppmDiff,
      ppmPercentDiff,
      ppms,
      dates,
      diffPPMSubHeader,
      diffPercentSubHeader,
      rangeType,
      loading
    } = this.state;
    return (
      <div>
        <div className="flex-grid-header">
          <TimeChoiceHeader
            timeHeaderLinks={timeHeaderLinks.map(this.populateWithClickFuncs())}
          />
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
              <Line
                data={{
                  ...graphConfig,
                  labels: dates,
                  datasets: [{ ...datasetForRender, data: ppms }]
                }}
              />
            </div>
          </div>
        </LoadingWrapper>
      </div>
    );
  }
}

export default ChartInfo;
