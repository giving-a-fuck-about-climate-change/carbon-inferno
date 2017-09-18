import React from 'react';
import ListWrapper from '../List/ListWrapper';
import {
  resourcesNewsLinks,
  resourcesLearnLinks,
  resourcesTakeActionLinks,
} from '../../constants';

const Resources = () => (
  <div className="resources-container">
    <ListWrapper className="resources-section" items={resourcesNewsLinks} />
    <ListWrapper className="resources-section" items={resourcesLearnLinks} />
    <ListWrapper className="resources-section" items={resourcesTakeActionLinks} />
  </div>
);

export default Resources;
