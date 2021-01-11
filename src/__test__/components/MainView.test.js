import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import MainView from '../../components/MainView'

const setup = () => {
  const props = {
    isSidebarOpen: true,
    isSearchOpen: true,
    isNodeSelectable: true,
    selectedNodes: ['abc'],
    selectedEdges: ['123'],
    isEdgeSelectable: true,
    isSettingsOpen: true,
    isNetworkLoading: true,
    networkLoadingProgress: 10
  }

  const component = shallow(<MainView {...props} />)

  return {
    component,
    props
  }
}

describe('MainView', () => {
  it('should match snapshot ', () => {
    const {
      component
    } = setup()

    expect(toJson(component)).toMatchSnapshot()
  })
})
