import React from 'react';
import { shallow } from 'enzyme';
import { ActiveListWrapper, updateItem } from '../ListWrapper';

const getComponent = (props = {}) => shallow(<ActiveListWrapper {...props} />);

describe('ActiveListWrapper', () => {
  describe('updateItem', () => {
    test('should update the item to selected if there is a match with rangeType', () => {
      expect(
        updateItem('works', [
          { className: '', type: 'works' },
          { className: 'selected', type: 'doesnt' },
        ]),
      ).toEqual([
        { className: 'selected', type: 'works' },
        { className: '', type: 'doesnt' },
      ]);
    });
  });
  describe('setSelected', () => {
    test('should call props click when selected', () => {
      const onClick = jest.fn();
      getComponent({
        onClick,
        data: [
          { className: '', type: 'works' },
          { className: 'selected', type: 'doesnt' },
        ],
      })
        .instance()
        .setSelected('value')({ preventDefault: () => {} });
      expect(onClick.mock.calls.length).toBe(1);
      expect(onClick.mock.calls[0][0]).toBe('value');
    });
  });
});
