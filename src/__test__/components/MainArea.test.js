import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import MainArea from '../../components/MainArea'
import { NETWORK_VIEW_DATATABLE, NETWORK_VIEW_GRAPH, SIDEBAR_VIEW_GRAPHS } from '../../constants/views'

const setup = ({
  currentGraph,
  networkVisualisation,
  sidebarView
}) => {
  const props = {
    graphData: {
      'graph-0': {
        label: 'Main',
        noDelete: true
      }
    },
    currentGraph,
    networkVisualisation,
    sidebarView
  }

  const component = shallow(<MainArea {...props} />)

  return {
    component,
    props
  }
}

describe('MainArea', () => {
  it('should match snapshot when currentGraph does not exists', () => {
    const {
      component
    } = setup({
      currentGraph: 'graph-1',
      networkVisualisation: NETWORK_VIEW_DATATABLE,
      sidebarView: SIDEBAR_VIEW_GRAPHS
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when currentGraph exists', () => {
    const {
      component
    } = setup({
      currentGraph: 'graph-0',
      networkVisualisation: NETWORK_VIEW_GRAPH,
      sidebarView: SIDEBAR_VIEW_GRAPHS
    })
    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot when currentGraph exists and datatable to be shown', () => {
    const {
      component
    } = setup({
      currentGraph: 'graph-0',
      networkVisualisation: NETWORK_VIEW_DATATABLE,
      sidebarView: SIDEBAR_VIEW_GRAPHS
    })
    expect(toJson(component)).toMatchSnapshot()
  })
})
