import React from 'react';
import PropTypes from 'prop-types';
import { actionCardContent } from '../../constants';
import './actionCards.css';

const renderIcon = Icon => (
  <Icon size={50} color="grey" className="card-icon" />
);

const ActionCards = ({ actionCardItems }) => (
  <div className="card-wrapper">
    {actionCardItems.map(item => (
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

ActionCards.propTypes = {
  actionCardItems: PropTypes.object, //eslint-disable-line
};

ActionCards.defaultProps = { actionCardItems: actionCardContent };

export default ActionCards;
