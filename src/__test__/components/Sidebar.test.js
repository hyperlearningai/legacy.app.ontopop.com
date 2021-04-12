import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { useRouter } from 'next/router'
import Sidebar from '../../components/Sidebar'
import {
  ROUTE_CUSTOM_QUERY,
  ROUTE_ELEMENTS_FILTER,
  ROUTE_ELEMENTS_SELECTION,
  ROUTE_EDIT_ONTOLOGY,
  ROUTE_EXPORT,
  ROUTE_FREE_TEXT_SEARCH,
  ROUTE_NETWORK_GRAPHS,
  ROUTE_NETWORK_GRAPH_OPTIONS,
  ROUTE_NODE_NEIGHBOURHOOD,
  ROUTE_SEARCH, ROUTE_SETTINGS,
  ROUTE_SHORTEST_PATH,
  ROUTE_STRUCTURED_SEARCH,
  ROUTE_STYLING,
  ROUTE_SYNONYMS
} from '../../constants/routes'

jest.mock('next/router')

const setup = ({
  isSidebarOpen,
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
      isSidebarOpen: false
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_ENTRY_SEARCH', () => {
    useRouter.mockImplementation(() => ({
      view: ROUTE_SEARCH
    }))

    const {
      component
    } = setup({
      isSidebarOpen: true,
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_GRAPHS', () => {
    useRouter.mockImplementation(() => ({
      view: ROUTE_NETWORK_GRAPHS
    }))

    const {
      component
    } = setup({
      isSidebarOpen: true,
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_GRAPH_OPTIONS', () => {
    useRouter.mockImplementation(() => ({
      view: ROUTE_NETWORK_GRAPH_OPTIONS
    }))

    const {
      component
    } = setup({
      isSidebarOpen: true,
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_FREE_TEXT_SEARCH', () => {
    useRouter.mockImplementation(() => ({
      view: ROUTE_FREE_TEXT_SEARCH
    }))

    const {
      component
    } = setup({
      isSidebarOpen: true,
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_BOUNDING_BOX', () => {
    useRouter.mockImplementation(() => ({
      view: ROUTE_STRUCTURED_SEARCH
    }))

    const {
      component
    } = setup({
      isSidebarOpen: true,
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_NEIGHBOURHOOD', () => {
    useRouter.mockImplementation(() => ({
      view: ROUTE_NODE_NEIGHBOURHOOD
    }))

    const {
      component
    } = setup({
      isSidebarOpen: true,
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_ELEMENTS_SELECTION', () => {
    useRouter.mockImplementation(() => ({
      view: ROUTE_ELEMENTS_SELECTION
    }))

    const {
      component
    } = setup({
      isSidebarOpen: true,
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_SHORTEST_PATH', () => {
    useRouter.mockImplementation(() => ({
      view: ROUTE_SHORTEST_PATH
    }))

    const {
      component
    } = setup({
      isSidebarOpen: true,
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_SETTINGS', () => {
    useRouter.mockImplementation(() => ({
      view: ROUTE_SETTINGS
    }))

    const {
      component
    } = setup({
      isSidebarOpen: true,
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and ROUTE_ELEMENTS_FILTER', () => {
    useRouter.mockImplementation(() => ({
      view: ROUTE_ELEMENTS_FILTER
    }))

    const {
      component
    } = setup({
      isSidebarOpen: true,
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_CUSTOM_QUERY', () => {
    useRouter.mockImplementation(() => ({
      view: ROUTE_CUSTOM_QUERY
    }))

    const {
      component
    } = setup({
      isSidebarOpen: true,
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_EXPORT', () => {
    useRouter.mockImplementation(() => ({
      view: ROUTE_EXPORT
    }))

    const {
      component
    } = setup({
      isSidebarOpen: true,
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_STYLING', () => {
    useRouter.mockImplementation(() => ({
      view: ROUTE_STYLING
    }))

    const {
      component
    } = setup({
      isSidebarOpen: true,
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_EDIT_ONTOLOGY', () => {
    useRouter.mockImplementation(() => ({
      view: ROUTE_EDIT_ONTOLOGY
    }))

    const {
      component
    } = setup({
      isSidebarOpen: true,
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_STRUCTURED_SEARCH', () => {
    useRouter.mockImplementation(() => ({
      view: ROUTE_STRUCTURED_SEARCH
    }))

    const {
      component
    } = setup({
      isSidebarOpen: true,
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when sidebar open and SIDEBAR_VIEW_SYNONYMS', () => {
    useRouter.mockImplementation(() => ({
      view: ROUTE_SYNONYMS
    }))

    const {
      component
    } = setup({
      isSidebarOpen: true,
    })

    expect(toJson(component)).toMatchSnapshot()
  })
})
