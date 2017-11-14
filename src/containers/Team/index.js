import React from 'react';
import PropTypes from 'prop-types';

import { Footer, Header } from '../../components';

import TeamItem from '../../components/TeamItem/index';
import { teamItems } from '../../constants/index';

const Team = ({ items }) => (
  <div>
    <div className="page-background">
      <Header />
      <div>
        <div className="team-grid">
          {items.map(item => <TeamItem {...item} />)}
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

Team.propTypes = {
	items: PropTypes.array, //eslint-disable-line
};

Team.defaultProps = {
  items: teamItems,
};

export default Team;
