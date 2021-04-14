import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import NetworkGraphOptions from '../../components/NetworkGraphOptions'

const setup = () => {
  const props = {
    currentGraph: 'graph-0',
    graphData: {
      'graph-0': {
        label: 'Main',
        noDelete: true,
        isOrphanNodeVisible: true,
        isUpperOntologyVisible: true,
        isSubClassEdgeVisible: true,
        isDatasetVisible: true,
        hiddenNodesProperties: [],
        hiddenEdgesProperties: []
      },
      'graph-1': {
        label: 'Search',
      }
    },
    updateStoreValue: jest.fn(),
  }

  const component = shallow(<NetworkGraphOptions {...props} />)

  return {
    component,
    props
  }
}

describe('NetworkGraphOptions', () => {
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
