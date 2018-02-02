import React from 'react';
import { teamItems } from '../../constants';
import './team.css';

const TeamItem = () => (
  <div>
    {teamItems.map(item => (
      <div className="team-container">
        <img src={item.src} className="team-image" alt={item.alt} />
        <div className="team-content">
          <p className="team-name">{item.name}</p>
          <p className="team-position">{item.position}</p>
          <p className="team-location">{item.location}</p>
        </div>
      </div>
    ))}
  </div>
);

export default TeamItem;
