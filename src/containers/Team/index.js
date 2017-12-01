import React from 'react';
import PropTypes from 'prop-types';

import TeamItem from '../../components/TeamItem/index';
import { teamItems } from '../../constants/index';

const Team = ({ items }) => (
  <div>
    <div>
      <div className="team-grid">
        {items.map(item => <TeamItem {...item} />)}
      </div>
    </div>
  </div>
);

Team.propTypes = {
  items: PropTypes.array, //eslint-disable-line
};

Team.defaultProps = {
  items: teamItems,
};

export default Team;
