import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Sidebar from '../../components/Sidebar'
import {
  SIDEBAR_VIEW_GRAPHS,
  SIDEBAR_VIEW_GRAPH_OPTIONS,
  SIDEBAR_VIEW_FREE_TEXT_SEARCH,
  SIDEBAR_VIEW_EDGES_SELECTION,
  SIDEBAR_VIEW_NODES_SELECTION,
  SIDEBAR_VIEW_BOUNDING_BOX,
  SIDEBAR_VIEW_NEIGHBOURHOOD,
  SIDEBAR_VIEW_SHORTEST_PATH,
  SIDEBAR_VIEW_SETTINGS,
  SIDEBAR_VIEW_NODES_FILTER,
  SIDEBAR_VIEW_EDGES_FILTER,
  SIDEBAR_VIEW_CUSTOM_QUERY,
  SIDEBAR_VIEW_EXPORT,
  SIDEBAR_VIEW_EDIT_ONTOLOGY,
  SIDEBAR_VIEW_STYLING,
  SIDEBAR_VIEW_STRUCTURED_SEARCH,
  SIDEBAR_VIEW_ENTRY_SEARCH,
  SIDEBAR_VIEW_SYNONYMS
} from '../../constants/views'

const setup = ({
  isSidebarOpen,
  sidebarView
}) => {
  const props = {
    isSidebarOpen,
    sidebarView,
    updateStoreValue: jest.fn(),
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

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_ENTRY_SEARCH', () => {
    const {
      component
    } = setup({
      isSidebarOpen: true,
      sidebarView: SIDEBAR_VIEW_ENTRY_SEARCH
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_GRAPHS', () => {
    const {
      component
    } = setup({
      isSidebarOpen: true,
      sidebarView: SIDEBAR_VIEW_GRAPHS
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_GRAPH_OPTIONS', () => {
    const {
      component
    } = setup({
      isSidebarOpen: true,
      sidebarView: SIDEBAR_VIEW_GRAPH_OPTIONS
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_FREE_TEXT_SEARCH', () => {
    const {
      component
    } = setup({
      isSidebarOpen: true,
      sidebarView: SIDEBAR_VIEW_FREE_TEXT_SEARCH
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_BOUNDING_BOX', () => {
    const {
      component
    } = setup({
      isSidebarOpen: true,
      sidebarView: SIDEBAR_VIEW_BOUNDING_BOX
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_NEIGHBOURHOOD', () => {
    const {
      component
    } = setup({
      isSidebarOpen: true,
      sidebarView: SIDEBAR_VIEW_NEIGHBOURHOOD
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_NODES_SELECTION', () => {
    const {
      component
    } = setup({
      isSidebarOpen: true,
      sidebarView: SIDEBAR_VIEW_NODES_SELECTION
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_EDGES_SELECTION', () => {
    const {
      component
    } = setup({
      isSidebarOpen: true,
      sidebarView: SIDEBAR_VIEW_EDGES_SELECTION
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_SHORTEST_PATH', () => {
    const {
      component
    } = setup({
      isSidebarOpen: true,
      sidebarView: SIDEBAR_VIEW_SHORTEST_PATH
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_SETTINGS', () => {
    const {
      component
    } = setup({
      isSidebarOpen: true,
      sidebarView: SIDEBAR_VIEW_SETTINGS
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_NODES_FILTER', () => {
    const {
      component
    } = setup({
      isSidebarOpen: true,
      sidebarView: SIDEBAR_VIEW_NODES_FILTER
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_EDGES_FILTER', () => {
    const {
      component
    } = setup({
      isSidebarOpen: true,
      sidebarView: SIDEBAR_VIEW_EDGES_FILTER
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_CUSTOM_QUERY', () => {
    const {
      component
    } = setup({
      isSidebarOpen: true,
      sidebarView: SIDEBAR_VIEW_CUSTOM_QUERY
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_EXPORT', () => {
    const {
      component
    } = setup({
      isSidebarOpen: true,
      sidebarView: SIDEBAR_VIEW_EXPORT
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_STYLING', () => {
    const {
      component
    } = setup({
      isSidebarOpen: true,
      sidebarView: SIDEBAR_VIEW_STYLING
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_EDIT_ONTOLOGY', () => {
    const {
      component
    } = setup({
      isSidebarOpen: true,
      sidebarView: SIDEBAR_VIEW_EDIT_ONTOLOGY
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_STRUCTURED_SEARCH', () => {
    const {
      component
    } = setup({
      isSidebarOpen: true,
      sidebarView: SIDEBAR_VIEW_STRUCTURED_SEARCH
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_SYNONYMS', () => {
    const {
      component
    } = setup({
      isSidebarOpen: true,
      sidebarView: SIDEBAR_VIEW_SYNONYMS
    })

    expect(toJson(component)).toMatchSnapshot()
  })
})
