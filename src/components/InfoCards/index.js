import React from 'react';
import './infoCards.css';

const InfoCard = props => (
  <div className="card-wrapper">
    <div className="infocard-container">
      <p className="infocard-title">{props.title}</p>
      <div>{props.children}</div>
    </div>
  </div>
);

export default InfoCard;
