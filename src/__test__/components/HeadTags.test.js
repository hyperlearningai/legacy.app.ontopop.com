import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import HeadTags from '../../components/HeadTags';

const setup = () => {
  const props = {
    title: 'Test',
    description: 'Another test'
  };

  const component = shallow(<HeadTags {...props} />);

  return {
    component,
    props
  };
};

describe('HeadTags', () => {
  it('should match snapshot ', () => {
    const {
      component
    } = setup();

    expect(toJson(component)).toMatchSnapshot();
  });
});
