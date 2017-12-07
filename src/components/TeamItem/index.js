import React from 'react';
import PropTypes from 'prop-types';
import './team.css';

const TeamItem = ({ name, location, position, src, alt }) => (
  <div>
    <img src={src} className="team-image" alt={alt} />
    <div className="team-content">
      <p className="team-name">{name}</p>
      <p className="team-position">{position}</p>
      <p className="team-location">{location}</p>
    </div>
  </div>
);

TeamItem.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
};

export default TeamItem;
