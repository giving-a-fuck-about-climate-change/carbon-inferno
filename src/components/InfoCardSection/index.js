import React from 'react';
import { InfoCard, TeamItem } from '../../components';
import { missionContent, dataSourceContent } from '../../constants';

const InfoCardSection = () => (
  <div className="info-cards">
    <InfoCard title="Mission">
      <div
        dangerouslySetInnerHTML={{ __html: missionContent.text }}
        className="infocard-text"
      />
    </InfoCard>
    <InfoCard title="Data Sources">
      <div
        dangerouslySetInnerHTML={{ __html: dataSourceContent.text }}
        className="infocard-text"
      />
    </InfoCard>
    <InfoCard title="Team">
      <TeamItem />
    </InfoCard>
  </div>
);

export default InfoCardSection;
