import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import GraphVisualisationWrapper from '../../components/GraphVisualisationWrapper'

const setup = () => {
  const props = {
    isSearchOpen: true,
    isNodeSelectable: true,
    selectedNodes: ['abc'],
    selectedEdges: ['123'],
    isEdgeSelectable: true,
    isSettingsOpen: true,
    isNetworkLoading: true,
    networkLoadingProgress: 10,
    setStoreState: jest.fn()
  }

  const component = shallow(<GraphVisualisationWrapper {...props} />)

  return {
    component,
    props
  }
}

describe('GraphVisualisationWrapper', () => {
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
