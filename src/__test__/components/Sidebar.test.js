import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Sidebar from '../../components/Sidebar'

import {
  SIDEBAR_VIEW_CUSTOM_QUERY,
  SIDEBAR_VIEW_EDIT_ONTOLOGY,
  SIDEBAR_VIEW_ELEMENTS_FILTER,
  SIDEBAR_VIEW_ELEMENTS_SELECTION,
  SIDEBAR_VIEW_ENTRY_SEARCH, SIDEBAR_VIEW_EXPORT,
  SIDEBAR_VIEW_GRAPHS, SIDEBAR_VIEW_GRAPH_OPTIONS,
  SIDEBAR_VIEW_NEIGHBOURHOOD, SIDEBAR_VIEW_SHORTEST_PATH,
  SIDEBAR_VIEW_STYLING, SIDEBAR_VIEW_SYNONYMS
} from '../../constants/views'

const setup = ({
  isSidebarOpen,
  sidebarView,
  user
}) => {
  const props = {
    isSidebarOpen,
    currentGraph: 'graph-0',
    graphData: {
      'graph-0': {
        label: 'Main',
        noDelete: true
      },
      'graph-1': {
        label: 'Search',
      }
    },
    sidebarView,
    updateStoreValue: jest.fn(),
  }

  if (user) {
    props.user = user
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
      sidebarView: SIDEBAR_VIEW_ENTRY_SEARCH,
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_ENTRY_SEARCH and isGuest', () => {
    const {
      component
    } = setup({
      isSidebarOpen: false,
      sidebarView: SIDEBAR_VIEW_ENTRY_SEARCH,
      user: { isGuest: true }
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_ENTRY_SEARCH', () => {
    const {
      component
    } = setup({
      isSidebarOpen: true,
      sidebarView: SIDEBAR_VIEW_ENTRY_SEARCH,
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_GRAPHS', () => {
    const {
      component
    } = setup({
      isSidebarOpen: true,
      sidebarView: SIDEBAR_VIEW_GRAPHS,
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_GRAPH_OPTIONS', () => {
    const {
      component
    } = setup({
      isSidebarOpen: true,
      sidebarView: SIDEBAR_VIEW_GRAPH_OPTIONS,
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_NEIGHBOURHOOD', () => {
    const {
      component
    } = setup({
      isSidebarOpen: true,
      sidebarView: SIDEBAR_VIEW_NEIGHBOURHOOD,
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_ELEMENTS_SELECTION', () => {
    const {
      component
    } = setup({
      isSidebarOpen: true,
      sidebarView: SIDEBAR_VIEW_ELEMENTS_SELECTION,
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_SHORTEST_PATH', () => {
    const {
      component
    } = setup({
      isSidebarOpen: true,
      sidebarView: SIDEBAR_VIEW_SHORTEST_PATH,
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and ROUTE_ELEMENTS_FILTER', () => {
    const {
      component
    } = setup({
      isSidebarOpen: true,
      sidebarView: SIDEBAR_VIEW_ELEMENTS_FILTER,
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_CUSTOM_QUERY', () => {
    const {
      component
    } = setup({
      isSidebarOpen: true,
      sidebarView: SIDEBAR_VIEW_CUSTOM_QUERY,
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_EXPORT', () => {
    const {
      component
    } = setup({
      isSidebarOpen: true,
      sidebarView: SIDEBAR_VIEW_EXPORT,
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_STYLING', () => {
    const {
      component
    } = setup({
      isSidebarOpen: true,
      sidebarView: SIDEBAR_VIEW_STYLING,
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_EDIT_ONTOLOGY', () => {
    const {
      component
    } = setup({
      isSidebarOpen: true,
      sidebarView: SIDEBAR_VIEW_EDIT_ONTOLOGY,
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_SYNONYMS', () => {
    const {
      component
    } = setup({
      isSidebarOpen: true,
      sidebarView: SIDEBAR_VIEW_SYNONYMS,
    })

    expect(toJson(component)).toMatchSnapshot()
  })
})
