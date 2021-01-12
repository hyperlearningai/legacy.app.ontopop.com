import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import NodeInfoDetails from '../../components/NodeInfoDetails'

const setup = () => {
  const props = {
    availableNodesNormalised: {
      abc: {
        id: 'abc',
        label: 'label',
        rdfAbout: 'rdfAbout',
        skosComment: 'skosComment',
        skosDefinition: 'skosDefinition',
        skosExample: 'skosExample'
      },
      cde: {
        id: 'cde',
        label: 'label2',
        rdfAbout: 'rdfAbout',
        skosComment: 'skosComment',
        skosDefinition: 'skosDefinition',
        skosExample: 'skosExample'
      }
    },
    nodesConnections: [{
      from: 'abc',
      fromLabel: 'label',
      to: 'cde',
      toLabel: 'label2',
      label: 'is child of',
      edgeId: 'abc'
    }],
    nodeId: 'abc'
  }

  const component = shallow(<NodeInfoDetails {...props} />)

  return {
    component,
    props
  }
}

describe('NodeInfoDetails', () => {
  it('should match snapshot ', () => {
    const {
      component
    } = setup()

    expect(toJson(component)).toMatchSnapshot()
  })
})
