import React from 'react';
import { shallow } from 'enzyme';
import ListItem from '../ListItem';

const getComponent = (props = {}) => shallow(<ListItem {...props} />);

describe('ListItem', () => {
  test('should render an anchor tag if passed an href prop', () => {
    const component = getComponent({ href: 'some href' });
    expect(component.find('a').length).toBe(1);
  });
  test('should render no anchor tag if href prop not defined', () => {
    const component = getComponent({ text: 'some text' });
    expect(component.find('a').length).toBe(0);
  });
});
