import React from 'react';
import { actionCardContent } from '../../constants';
import './actionCards.css';

const renderIcon = Icon => (
  <Icon size={50} color="grey" style={{ paddingRight: '10px' }} />
);

const ActionCards = () => (
  <div className="card-wrapper">
    {actionCardContent.map(item => (
      <div className="card-container">
        {renderIcon(item.icon)}
        <div className="card-content">
          <a href={item.href} className="card-title">
            {item.title}
          </a>
          <p className="card-subtitle">{item.subTitle}</p>
        </div>
      </div>
    ))}
  </div>
);

export default ActionCards;
