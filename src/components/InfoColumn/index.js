import React from 'react';
import { globalSubHeader } from '../../constants';

const InfoColDiv = ({ statInfo, subHeader }) => (
  <div className="info-col">
    <div className="info-wrapper">
      <div className="stat-info"> {statInfo} </div>
      <div className="sub-header"> {subHeader} </div>
    </div>
  </div>
);

const InfoColumnHOC = ({ rangeType, currentPPM, ppmDiff, diffPPMSubHeader, ppmPercentDiff, diffPercentSubHeader }) => {
  if (rangeType !== 'all') {
    return (
      <div className="flex-grid">
        <InfoColDiv statInfo={`${currentPPM} PPM`} subHeader={globalSubHeader} />
        <InfoColDiv statInfo={ppmDiff} subHeader={diffPPMSubHeader} />
        <InfoColDiv statInfo={ppmPercentDiff} subHeader={diffPercentSubHeader} />
      </div>
    );
  }
  return (
    <div className="flex-grid">
      <InfoColDiv statInfo={`${currentPPM} PPM`} subHeader={globalSubHeader} />
    </div>
  );
};

export default InfoColumnHOC;
