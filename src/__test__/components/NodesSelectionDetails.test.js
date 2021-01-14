import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import NodesSelectionDetails from '../../components/NodesSelectionDetails'

const setup = () => {
  const props = {
    nodeId: 'abc',
    availableNodesNormalised: {
      abc: {
        id: 'id',
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
  }

  const component = shallow(<NodesSelectionDetails {...props} />)

  return {
    component,
    props
  }
}

describe('NodesSelectionDetails', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot ', () => {
    const {
      component
    } = setup()

    expect(toJson(component)).toMatchSnapshot()
  })
})
