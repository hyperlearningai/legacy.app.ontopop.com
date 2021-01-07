import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Index from '../../pages/index';

const setup = () => {
  const component = shallow(<Index />);

  return {
    component
  };
};

describe('Index page', () => {
  it('should match snapshot', () => {
    const { component } = setup();
    expect(toJson(component)).toMatchSnapshot();
  });
});
