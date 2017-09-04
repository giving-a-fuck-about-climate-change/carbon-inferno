import React from 'react';

import { ActiveListWrapper } from '../List/ListWrapper';

const TimeChoiceHeader = ({ timeHeaderLinks }) => {
  return (<ActiveListWrapper className="time-choice-header" items={timeHeaderLinks}/>);
};

export default TimeChoiceHeader;
