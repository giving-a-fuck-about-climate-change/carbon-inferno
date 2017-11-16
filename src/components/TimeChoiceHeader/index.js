import React from 'react';
import PropTypes from 'prop-types';

import { ActiveListWrapper } from '../List/ListWrapper';

const TimeChoiceHeader = ({ timeHeaderLinks }) => (
  <ActiveListWrapper className="time-choice-header" items={timeHeaderLinks} />
);
TimeChoiceHeader.propTypes = {
	timeHeaderLinks: PropTypes.array.isRequired, //eslint-disable-line
};
export default TimeChoiceHeader;
