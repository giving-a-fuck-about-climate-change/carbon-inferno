import React from 'react';

import ListWrapper from '../List/ListWrapper';
import { timeHeaderLinks } from '../../constants';

const TimeChoiceHeader = () => (<ListWrapper className="time-choice-header" items={timeHeaderLinks}/>);

export default TimeChoiceHeader;
