import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { DataSet } from 'vis-data'
import GraphVisualisation from '../../components/GraphVisualisation'
import {
  EDGE_COLOR,
  EDGE_COLOR_HIGHLIGHTED,
} from '../../constants/graph'
import { SIDEBAR_VIEW_ENTRY_SEARCH, SIDEBAR_VIEW_GRAPHS } from '../../constants/views'

const setup = ({
  sidebarView,
  networkVisualisation
}) => {
  const props = {
    currentGraph: 'graph-0',
    showContextMenu: true,
    isBoundingBoxSelectable: true,
    boundingBoxGeometry: {
      fixedPointX: 100,
      fixedPointY: 100,
      boundingBoxPosX: 100,
      boundingBoxPosY: 100,
      boundingBoxWidth: 200,
      boundingBoxHeight: 200
    },
    availableEdges: new DataSet([]),
    availableNodes: new DataSet([]),
    network: {},
    nodesIdsToDisplay: [],
    physicsHierarchicalView: true,
    physicsRepulsion: true,
    isPhysicsOn: true,
    updateStoreValue: jest.fn(),
    globalEdgeStyling: {
      stylingEdgeLineColor: EDGE_COLOR,
      stylingEdgeLineColorHover: EDGE_COLOR,
      stylingEdgeLineColorHighlight: EDGE_COLOR_HIGHLIGHTED,
      stylingEdgeLineStyle: false,
      stylingEdgeTextColor: EDGE_COLOR,
      stylingEdgeTextSize: 12,
      stylingEdgeTextAlign: 'horizontal',
      stylingEdgeWidth: 1,
      stylingEdgeLength: 250,
    },
    sidebarView,
    networkVisualisation
  }

  const component = shallow(<GraphVisualisation {...props} />)

  return {
    component,
    props
  }
}

describe('GraphVisualisation', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot when sidebarView is not SIDEBAR_VIEW_ENTRY_SEARCH and networkVisualisation is SIDEBAR_VIEW_GRAPHS', () => {
    const {
      component
    } = setup({
      sidebarView: 'any',
      networkVisualisation: SIDEBAR_VIEW_GRAPHS
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('should match snapshot ', () => {
    const {
      component
    } = setup({
      sidebarView: SIDEBAR_VIEW_ENTRY_SEARCH,
      networkVisualisation: SIDEBAR_VIEW_GRAPHS
    })

    expect(toJson(component)).toMatchSnapshot()
  })
})
