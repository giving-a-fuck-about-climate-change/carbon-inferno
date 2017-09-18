import React from 'react';
import PropTypes from 'prop-types';
import { globalSubHeader } from '../../constants';

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

const InfoColumnHOC = ({
  rangeType,
  currentPPM,
  ppmDiff,
  diffPPMSubHeader,
  ppmPercentDiff,
  diffPercentSubHeader,
}) => {
  if (rangeType !== 'all') {
    return (
      <div className="flex-grid">
        <InfoColDiv
          statInfo={`${currentPPM} PPM`}
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
      <InfoColDiv statInfo={`${currentPPM} PPM`} subHeader={globalSubHeader} />
    </div>
  );
};
InfoColumnHOC.propTypes = {
  rangeType: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), //eslint-disable-line
  currentPPM: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  ppmDiff: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  diffPPMSubHeader: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  ppmPercentDiff: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  diffPercentSubHeader: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default InfoColumnHOC;
