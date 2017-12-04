import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { globalSubHeader } from '../../constants';

import {
  calculateAverage,
  calculatePercentageDiff,
  calculateDiff,
} from '../../utils';

const calculateSubHeader = (rangeType) => {
  const formatStr = str => str.replace('_', ' ');
  return {
    diffPPMSubHeader: `SINCE LAST ${rangeType ? formatStr(rangeType) : ''}`,
    diffPercentSubHeader: `SINCE LAST ${
      rangeType ? formatStr(rangeType) : ''
    } (%)`,
  };
};

const InfoColDiv = ({ statInfo, subHeader }) => (
  <div className="info-col">
    <div className="info-wrapper">
      <div className="stat-info"> {statInfo} </div>
      <div className="sub-header"> {subHeader} </div>
    </div>
  </div>
);
InfoColDiv.propTypes = {
  statInfo: PropTypes.any.isRequired, //eslint-disable-line
  subHeader: PropTypes.any.isRequired, //eslint-disable-line
};

class InfoColumnHOC extends Component {
  constructor(props) {
    super(props);
    const { diffPPMSubHeader, diffPercentSubHeader } = calculateSubHeader();
    this.state = {
      ppmDiff: 0,
      diffPPMSubHeader,
      ppmPercentDiff: 0,
      diffPercentSubHeader,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.rangeType !== 'all') {
      this.updatePpmDiffInfo(nextProps.data, nextProps.rangeType);
    }
  }

  updatePpmDiffInfo = (data, rangeType) => {
    const average = calculateAverage(data);
    const { currentPpm } = this.props;
    const { diffPPMSubHeader, diffPercentSubHeader } = calculateSubHeader(
      rangeType,
    );
    this.setState({
      ppmDiff: `${calculateDiff(average, currentPpm)} PPM`,
      ppmPercentDiff: `${calculatePercentageDiff(
        average,
        this.props.currentPpm,
      )} %`,
      diffPPMSubHeader,
      diffPercentSubHeader,
    });
  };

  render() {
    const { rangeType, currentPpm } = this.props;
    const {
      ppmDiff,
      diffPPMSubHeader,
      ppmPercentDiff,
      diffPercentSubHeader,
    } = this.state;
    if (rangeType !== 'all') {
      return (
        <div className="flex-grid">
          <InfoColDiv
            statInfo={`${currentPpm} PPM`}
            subHeader={globalSubHeader}
          />
          <InfoColDiv statInfo={ppmDiff} subHeader={diffPPMSubHeader} />
          <InfoColDiv
            statInfo={ppmPercentDiff}
            subHeader={diffPercentSubHeader}
          />
        </div>
      );
    }
    return (
      <div className="flex-grid">
        <InfoColDiv
          statInfo={`${currentPpm} PPM`}
          subHeader={globalSubHeader}
        />
      </div>
    );
  }
}
InfoColumnHOC.propTypes = {
  rangeType: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), //eslint-disable-line
  currentPpm: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default InfoColumnHOC;
