import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MyDocument from '../../pages/_document';

const setup = () => {
  const props = {};

  const component = shallow(<MyDocument {...props} />);

  return {
    component,
    props
  };
};

describe('_document', () => {
  it('should match snapshot ', () => {
    const {
      component
    } = setup();

    expect(toJson(component)).toMatchSnapshot();
  });
});
