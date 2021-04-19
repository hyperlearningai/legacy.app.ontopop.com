import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Navbar from '../../components/Navbar'
import {
  NETWORK_VIEW_DATATABLE, NETWORK_VIEW_GRAPH, SIDEBAR_VIEW_ENTRY_SEARCH, SIDEBAR_VIEW_GRAPHS
} from '../../constants/views'

const setup = ({
  sidebarView,
  networkVisualisation
}) => {
  const props = {
    availableEdgesCount: 333,
    availableNodesCount: 200,
    totalSearchCount: 100,
    sidebarView,
    searchPageSelected: 1,
    entrySearchResultsByPage: {
      0: [
        { id: '1' }
      ],
      1: [
        { id: '2' }
      ]
    },
    updateStoreValue: jest.fn(),
    networkVisualisation
  }

  const component = shallow(<Navbar {...props} />)

  return {
    component,
    props
  }
}

describe('Navbar', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot when SIDEBAR_VIEW_ENTRY_SEARCH', () => {
    const {
      component
    } = setup({
      sidebarView: SIDEBAR_VIEW_ENTRY_SEARCH,
      networkVisualisation: NETWORK_VIEW_GRAPH
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when SIDEBAR_VIEW_GRAPHS and NETWORK_VIEW_GRAPH', () => {
    const {
      component
    } = setup({
      sidebarView: SIDEBAR_VIEW_GRAPHS,
      networkVisualisation: NETWORK_VIEW_GRAPH
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when SIDEBAR_VIEW_GRAPHS and NETWORK_VIEW_DATATABLE', () => {
    const {
      component
    } = setup({
      sidebarView: SIDEBAR_VIEW_GRAPHS,
      networkVisualisation: NETWORK_VIEW_DATATABLE
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when any view', () => {
    const {
      component
    } = setup({
      sidebarView: 'any',
      networkVisualisation: NETWORK_VIEW_GRAPH
    })

    expect(toJson(component)).toMatchSnapshot()
  })
})
