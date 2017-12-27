import React from 'react';
import { shallow } from 'enzyme';
import { LoadingWrapper } from '..';

const getComponent = (props = {}) => shallow(<LoadingWrapper {...props} />);

describe('LoadingWrapper', () => {
  test('should call renderLoading prop when loading is true', () => {
    const renderLoading = jest.fn();
    const renderDiv = jest.fn();
    getComponent({ renderLoading, renderDiv, loading: true });
    expect(renderLoading.mock.calls.length).toBe(1);
    expect(renderDiv.mock.calls.length).toBe(0);
  });
  test('should call renderDiv prop when loading is false', () => {
    const renderLoading = jest.fn();
    const renderDiv = jest.fn();
    getComponent({ renderLoading, renderDiv, loading: false });
    expect(renderDiv.mock.calls.length).toBe(1);
    expect(renderLoading.mock.calls.length).toBe(0);
  });
});
