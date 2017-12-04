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

import { todaysDate, subDate } from '../../utils';

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

const dateRangQuery = (timePeriod, amount) =>
  `${ppmEndpoint}/?ordering=+date&date__range=${subDate(
    timePeriod,
    amount,
  )},${todaysDate()}`;

const addClickFunctionality = clickFunc => (item) => {
  const { type } = item;
  return { ...item, onClick: clickFunc(type) };
};

const shouldQuery = (currentType, newType, data = []) =>
  !!(currentType === newType && data.length <= 0);

class ChartInfo extends Component {
  state = {
    rangeType: ALL, // Intitial date range query type
  };

  componentDidMount() {
    this.props.fetchAllPpms();
  }

  queryApi = () => {
    // TODO: Maybe do this in thunk or switch
    const { rangeType } = this.state;
    switch (rangeType) {
      case WEEK: {
        if (shouldQuery(WEEK, rangeType, this.props[WEEK])) {
          this.props.fetchMonthWeekPpms({
            endpoint: dateRangQuery(rangeType),
            rangeType,
          });
        }
        break;
      }
      case MONTH: {
        if (shouldQuery(MONTH, rangeType, this.props[MONTH])) {
          this.props.fetchMonthWeekPpms({
            endpoint: dateRangQuery(rangeType),
            rangeType,
          });
        }
        break;
      }
      case YEAR: {
        if (shouldQuery(YEAR, rangeType, this.props[YEAR])) {
          this.props.fetchYearPpms({
            endpoint: dateRangQuery('year', 1),
            rangeType,
          });
        }
        break;
      }
      case FIVE_YEAR: {
        if (shouldQuery(FIVE_YEAR, rangeType, this.props[FIVE_YEAR])) {
          this.props.fetchYearPpms({
            endpoint: dateRangQuery('year', 5),
            rangeType,
          });
        }
        break;
      }
      default: {
        if (this.props[ALL].length <= 0) {
          this.props.fetchAllPpms();
        }
        break;
      }
    }
  };

  handlePpmClick = rangeType => (event) => {
    event.preventDefault();
    // only call api when the rangeType has changed.
    if (rangeType !== this.state.rangeType) {
      this.setState({ rangeType }, this.queryApi);
    }
  };
  // TODO: get rid of clickFunctionality
  render() {
    const { currentPpm, loading } = this.props;
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
            data={this.props[rangeType]}
            rangeType={rangeType}
            currentPpm={currentPpm}
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
