import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import MainView from '../../components/MainView'

const setup = () => {
  const props = {
    isSidebarOpen: true,
    isSearchOpen: true,
    isInfoOpen: true,
    isEdgeFilterOpen: true,
    isSettingsOpen: true,
    selectedNodes: ['abc'],
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
