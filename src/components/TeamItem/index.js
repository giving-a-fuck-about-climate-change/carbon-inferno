import React from 'react';

const TeamItem = ({ name, location, position, src, alt }) => (
    <div>
        <img src={src} className="team-image" alt={alt} />
        <p className="team-name">{name}</p>
        <p className="team-position">{position}</p>
        <p className="team-location">{location}</p>
    </div>
);

export default TeamItem;
