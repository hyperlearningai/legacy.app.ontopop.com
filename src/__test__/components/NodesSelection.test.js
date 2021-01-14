import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import NodesSelection from '../../components/NodesSelection'

const setup = () => {
  const props = {
    setStoreState: jest.fn(),
    removeFromArray: jest.fn(),
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
    selectedNodes: ['abc']
  }

  const component = shallow(<NodesSelection {...props} />)

  return {
    component,
    props
  }
}

describe('NodesSelection', () => {
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
