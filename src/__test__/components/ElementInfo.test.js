import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ElementInfo from '../../components/ElementInfo';

const setup = () => {
  const props = {
    availableNodesNormalised: {
      abc: {
        id: 'id',
        label: 'label',
        rdfAbout: 'rdfAbout',
        skosComment: 'skosComment',
        skosDefinition: 'skosDefinition',
        skosExample: 'skosExample'
      }
    },
    selectedNode: 'abc'
  };

  const component = shallow(<ElementInfo {...props} />);

  return {
    component,
    props
  };
};

describe('ElementInfo', () => {
  it('should match snapshot ', () => {
    const {
      component
    } = setup();

    expect(toJson(component)).toMatchSnapshot();
  });
});
