import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Sidebar from '../../components/Sidebar'
import { SIDEBAR_VIEW_GRAPHS, SIDEBAR_VIEW_NEIGHBOURHOOD } from '../../constants/views'

const setup = ({
  isSidebarOpen,
  sidebarView
}) => {
  const props = {
    isSidebarOpen,
    sidebarView,
    setStoreState: jest.fn(),
  }

  const component = shallow(<Sidebar {...props} />)

  return {
    component,
    props
  }
}

describe('Sidebar', () => {
  it('should match snapshot when sidebar closed', () => {
    const {
      component
    } = setup({
      isSidebarOpen: false,
      sidebarView: SIDEBAR_VIEW_GRAPHS
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_GRAPHS', () => {
    const {
      component
    } = setup({
      isSidebarOpen: false,
      sidebarView: SIDEBAR_VIEW_GRAPHS
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_NEIGHBOURHOOD', () => {
    const {
      component
    } = setup({
      isSidebarOpen: false,
      sidebarView: SIDEBAR_VIEW_NEIGHBOURHOOD
    })

    expect(toJson(component)).toMatchSnapshot()
  })
})
