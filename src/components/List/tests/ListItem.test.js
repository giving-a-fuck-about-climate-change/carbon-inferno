import React from 'react';
import { Link } from 'react-router-dom';
import { shallow } from 'enzyme';
import ListItem from '../ListItem';

const getComponent = (props = {}) => shallow(<ListItem {...props} />);

describe('ListItem', () => {
  test('should render a Link component if passed an href prop', () => {
    const component = getComponent({ href: 'some href' });
    expect(component.find(Link).length).toBe(1);
  });
  test('should render no Link component if href prop not defined', () => {
    const component = getComponent({ text: 'some text' });
    expect(component.find(Link).length).toBe(0);
  });
});
