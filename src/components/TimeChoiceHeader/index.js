import React from 'react';

import ListWrapper from '../List/ListWrapper';

const TimeChoiceHeader = ({ timeHeaderLinks }) => {
  return (<ListWrapper className="time-choice-header" items={timeHeaderLinks}/>);
};

export default TimeChoiceHeader;
