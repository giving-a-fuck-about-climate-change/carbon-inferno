import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
  todaysDate,
  subDate,
} from '../../utils';

import {
  fetchAllPpms,
  fetchMonthWeekPpms,
  fetchYearPpms,
} from './redux/actions';

import { ppmInfoAllSelector, ppmInfoSelector } from './redux/selectors';

import { timeHeaderLinks } from '../../constants';
import { WEEK, MONTH, YEAR, FIVE_YEAR, ALL } from './constants';

//  ----- ENDPOINTS -----

const { apiEndpoint } = config;

const ppmEndpoint = `${apiEndpoint}/api/co2`;

const dateRangQuery = timePeriod =>
  `${ppmEndpoint}/?ordering=+date&date__range=${subDate(
    timePeriod,
  )},${todaysDate()}`;

// ----- EXTENDED COMPONENT FUNCTIONALITY HELPERS -----

// const calculateSubHeader = (rangeType) => {
//   const getHeader = range => ({
//     ppmDiff: `SINCE LAST ${range}`,
//     percentDiff: `SINCE LAST ${range} (%)`,
//   });
//   switch (rangeType) {
//     case WEEK:
//       return getHeader(WEEK);
//     case MONTH:
//       return getHeader(MONTH);
//     case YEAR:
//       return getHeader(YEAR);
//     default:
//       return { ppmDiff: '', percentDiff: '' };
//   }
// };
//
// const setStateWithApiResult = results => (prevState) => {
//   const { currentPPM, rangeType } = prevState;
//   const average = calculateAverage(results);
//   return {
//     loading: false,
//     average,
//     ppmDiff: `${calculateDiff(average, currentPPM)} PPM`,
//     ppmPercentDiff: `${calculatePercentageDiff(average, currentPPM)} %`,
//   };
// };
//
// const setStateWithApiError = apiError => () => ({
//   loading: false,
//   error: apiError,
// });

const addClickFunctionality = clickFunc => (item) => {
  const { type } = item;
  return { ...item, onClick: clickFunc(type) };
};

class ChartInfo extends Component {
  state = {
    rangeType: ALL, // Intitial date range query type
  };
  componentDidMount() {
    this.props.fetchAllPpms();
    // this.fetchInitialData();
  }

  queryApi = () => {
    const { rangeType } = this.state;
    if (rangeType === WEEK || rangeType === MONTH) {
      this.props.fetchMonthWeekPpms({
        endpoint: dateRangQuery(rangeType),
        rangeType,
      });
    }
    if (rangeType === YEAR || rangeType === FIVE_YEAR) {
      this.props.fetchYearPpms({
        endpoint: dateRangQuery(rangeType),
        rangeType,
      });
    }
    if (this.props[ALL].length <= 0) {
      this.props.fetchAllPpms();
    }
  };

  handlePpmClick = rangeType => (event) => {
    event.preventDefault();
    if (rangeType !== this.state.rangeType) {
      // only call api when the rangeType has changed.
      this.setState({ rangeType }, this.queryApi);
    }
  };
  // TODO: get rid of clickFunctionality
  render() {
    const {
      currentPpm,
      ppmDiff,
      ppmPercentDiff,
      diffPPMSubHeader,
      diffPercentSubHeader,
      loading,
    } = this.props;
    const { rangeType } = this.state;
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
            currentPPM={currentPpm}
            ppmDiff={ppmDiff}
            ppmPercentDiff={ppmPercentDiff}
            diffPPMSubHeader={diffPPMSubHeader}
            diffPercentSubHeader={diffPercentSubHeader}
          />
          <div className="graph-container">
            <LoadingWrapper
              loading={loading}
              renderLoading={() => <Loading />}
              renderDiv={() =>
                (this.props[rangeType].length > 0 ? (
                  <PpmChart
                    data={this.props[rangeType]}
                    rangeType={rangeType}
                  />
                ) : null)
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.ppmInfo.loading,
  error: state.ppmInfo.error,
  [WEEK]: ppmInfoSelector(state, WEEK),
  [MONTH]: ppmInfoSelector(state, MONTH),
  [YEAR]: ppmInfoSelector(state, YEAR),
  [FIVE_YEAR]: ppmInfoSelector(state, FIVE_YEAR),
  [ALL]: ppmInfoAllSelector(state, ALL),
  currentPpm: state.ppmInfo.currentPpm,
  ppmDiff: '', // difference in numbers for ppm
  ppmPercentDiff: '', // difference in % for ppm
  diffPPMSubHeader: '', // string used for subHeader, eg: 'since last year'
  diffPercentSubHeader: '', // string used for subHeader, eg: 'since last month'
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchAllPpms,
      fetchMonthWeekPpms,
      fetchYearPpms,
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(ChartInfo);
