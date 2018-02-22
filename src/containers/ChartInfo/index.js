import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import windowSize from 'react-window-size';

import './ChartInfo.css';

import {
  InfoColumnHOC,
  LoadingWrapper,
  PpmChart,
  Loading,
  ActiveListWrapper,
  Navigation,
} from '../../components';

import { queryDateRange } from './utils';

import {
  fetchCurrentPpms,
  fetchMonthWeekPpms,
  fetchYearPpms,
  fetchAllPpms,
} from './redux/actions';

import { ppmInfoAllSelector, ppmInfoSelector } from './redux/selectors';

import {
  timeHeaderLinks,
  WEEK,
  MONTH,
  YEAR,
  FIVE_YEAR,
  ALL,
} from '../../constants';

const todaysDate = moment().format('YYYY-MM-DD');

const PpmResizedChart = windowSize(PpmChart);

export class ChartInfo extends Component {
  state = {
    rangeType:
      this.props.match.params && this.props.match.params.time
        ? this.props.match.params.time
        : FIVE_YEAR, // Intitial date range query type
  };

  componentDidMount() {
    // Wait for the total number of records to load
    // before requesting ALL records from the API.
    if (this.state.rangeType === ALL) {
      // query for current ppm and wait for limit
      this.props.fetchCurrentPpms().then(() => {
        // Query for current time period.
        this.queryApi(this.state.rangeType);
      });
    } else {
      // query for current ppm
      this.props.fetchCurrentPpms();
      // Query for current time period.
      this.queryApi(this.state.rangeType);
    }
  }

  queryApi = (rangeType) => {
    // Need to check if data exists
    const shouldUpdate = this.props[rangeType].length <= 0;
    // Only get query the api if no data exists
    switch (rangeType) {
      case WEEK: {
        if (shouldUpdate) {
          const endpoint = queryDateRange(todaysDate, WEEK, 1);
          this.props.fetchMonthWeekPpms({ rangeType, endpoint });
        }
        break;
      }
      case MONTH: {
        if (shouldUpdate) {
          const endpoint = queryDateRange(todaysDate, MONTH, 1);
          this.props.fetchMonthWeekPpms({ rangeType, endpoint });
        }
        break;
      }
      case YEAR: {
        if (shouldUpdate) {
          const endpoint = queryDateRange(todaysDate, YEAR, 1);
          this.props.fetchYearPpms({ rangeType, endpoint });
        }
        break;
      }
      case FIVE_YEAR: {
        if (shouldUpdate) {
          const endpoint = queryDateRange(todaysDate, YEAR, 5);
          this.props.fetchYearPpms({ rangeType, endpoint });
        }
        break;
      }
      default: {
        if (shouldUpdate) {
          this.props.fetchAllPpms();
        }
      }
    }
  };

  handlePpmClick = (rangeType) => {
    // only call api when the rangeType has changed.
    if (rangeType !== this.state.rangeType) {
      this.setState({ rangeType }, () => {
        this.queryApi(this.state.rangeType);
      });
    }
  };

  render() {
    const { currentPpm, loading } = this.props;
    const { rangeType } = this.state;
    return (
      <div>
        <div className="menu-container">
          <Navigation
            menu={
              <ActiveListWrapper
                className="time-choice-header"
                items={timeHeaderLinks}
                onClick={this.handlePpmClick}
                defaultSelected={this.state.rangeType}
              />
            }
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
                  <PpmResizedChart
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
      fetchCurrentPpms,
      fetchMonthWeekPpms,
      fetchYearPpms,
      fetchAllPpms,
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(ChartInfo);
ChartInfo.propTypes = {
  loading: PropTypes.bool.isRequired,
  currentPpm: PropTypes.number.isRequired,
  fetchCurrentPpms: PropTypes.func.isRequired,
  fetchMonthWeekPpms: PropTypes.func.isRequired,
  fetchYearPpms: PropTypes.func.isRequired,
  fetchAllPpms: PropTypes.func.isRequired,
  error: PropTypes.string, // eslint-disable-line
  match: PropTypes.object, // eslint-disable-line
}; // TODO: Update the above create error handling issue
ChartInfo.defaultProps = {
  error: '',
  loading: true,
  currentPpm: 0,
  [WEEK]: [],
  [MONTH]: [],
  [YEAR]: [],
  [FIVE_YEAR]: [],
  [ALL]: [],
  queryApi: () => {},
  fetchCurrentPpms: () => {},
  fetchMonthWeekPpms: () => {},
  fetchYearPpms: () => {},
  fetchAllPpms: () => {},
  match: { params: null },
};
