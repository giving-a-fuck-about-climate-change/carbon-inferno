import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { globalSubHeader, ALL } from '../../constants';
import './infoColumn.css';

import { calculatePercentageDiff, calculateDiff } from './utils';

const calculateSubHeader = (rangeType = '') => {
  const formatStr = str => str.replace('_', ' ');
  return {
    diffPPMSubHeader: `SINCE LAST ${rangeType ? formatStr(rangeType) : ''}`,
    diffPercentSubHeader: `SINCE LAST ${
      rangeType ? formatStr(rangeType) : ''
    } (%)`,
  };
};

export const InfoColDiv = ({ statInfo, subHeader }) => (
  <div className="info-col">
    <div className="info-wrapper">
      <div className="stat-info"> {statInfo} </div>
      <div className="sub-header"> {subHeader} </div>
    </div>
  </div>
);
InfoColDiv.propTypes = {
  statInfo: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  subHeader: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
};
InfoColDiv.defaultProps = {
  statInfo: '',
  subHeader: '',
};
// TODO: Should we be passing data or just first item ????
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
    if (nextProps.rangeType !== ALL) {
      this.updatePpmDiffInfo(nextProps.data, nextProps.rangeType);
    }
  }

  updatePpmDiffInfo = (data = [], rangeType) => {
    const previous = data[0] ? data[0].ppm : 0;
    const { currentPpm } = this.props;
    const { diffPPMSubHeader, diffPercentSubHeader } = calculateSubHeader(
      rangeType,
    );
    this.setState({
      ppmDiff: `${calculateDiff(previous, previous ? currentPpm : 0)} PPM`,
      ppmPercentDiff: `${calculatePercentageDiff(
        previous,
        previous ? currentPpm : 0,
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
    if (rangeType !== ALL) {
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
  rangeType: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  currentPpm: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default InfoColumnHOC;
