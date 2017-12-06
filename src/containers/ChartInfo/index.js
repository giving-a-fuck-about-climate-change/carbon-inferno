import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  InfoColumnHOC,
  LoadingWrapper,
  PpmChart,
  Loading,
  ActiveListWrapper,
} from '../../components';

import { queryApi } from './redux/actions';

import { ppmInfoAllSelector, ppmInfoSelector } from './redux/selectors';

import {
  timeHeaderLinks,
  WEEK,
  MONTH,
  YEAR,
  FIVE_YEAR,
  ALL,
} from '../../constants';

class ChartInfo extends Component {
  state = {
    rangeType: ALL, // Intitial date range query type
  };

  componentDidMount() {
    this.props.queryApi(this.state.rangeType);
  }

  handlePpmClick = (rangeType) => {
    // only call api when the rangeType has changed.
    if (rangeType !== this.state.rangeType) {
      this.setState({ rangeType }, () => {
        this.props.queryApi(this.state.rangeType);
      });
    }
  };

  render() {
    const { currentPpm, loading } = this.props;
    const { rangeType } = this.state;
    return (
      <div>
        <div className="flex-grid-header">
          <ActiveListWrapper
            className="time-choice-header"
            items={timeHeaderLinks}
            onClick={this.handlePpmClick}
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
      queryApi,
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(ChartInfo);
