import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import NodeInfo from '../../components/NodeInfo'

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
    selectedNodes: ['abc'],
    setStoreState: jest.fn(),
    deletedNodes: []
  }

  const component = shallow(<NodeInfo {...props} />)

  return {
    component,
    props
  }
}

describe('NodeInfo', () => {
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
