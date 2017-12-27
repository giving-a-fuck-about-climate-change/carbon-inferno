import React from 'react';
import { shallow } from 'enzyme';

import ShouldShow from '..';

const TestComponent = () => <div> testing </div>;
TestComponent.displayName = 'TestComponent';
const OptionalTest = ShouldShow(TestComponent);

describe('ShouldShow Component', () => {
  test('Should not show children if prop "shouldShow" is false', () => {
    const comp = shallow(<OptionalTest shouldShow={false} />);
    expect(comp.find(TestComponent).length).toBe(0);
  });
  test('Should show children if prop "shouldShow" is true', () => {
    const comp = shallow(<OptionalTest shouldShow />);
    expect(comp.find(TestComponent).length).toBe(1);
  });
});
