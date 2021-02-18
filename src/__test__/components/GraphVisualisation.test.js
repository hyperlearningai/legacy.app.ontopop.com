import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { DataSet } from 'vis-data'
import GraphVisualisation from '../../components/GraphVisualisation'
import { ALGO_TYPE_FULL } from '../../constants/algorithms'
import {
  CLICK_NODE_BACKGROUND, EDGE_COLOR, EDGE_COLOR_HIGHLIGHTED, HIGHLIGHT_NODE_BORDER, HOVER_NODE_BACKGROUND, HOVER_NODE_BORDER, NODE_BACKGROUND, NODE_BORDER, NODE_DEFAULT_SHAPE, NODE_TEXT_COLOR
} from '../../constants/graph'

const setup = () => {
  const props = {
    addToObject: jest.fn(),
    availableEdges: new DataSet([]),
    availableNodes: new DataSet([]),
    boundingBoxGeometry: {
      fixedPointX: 100,
      fixedPointY: 100,
      boundingBoxPosX: 100,
      boundingBoxPosY: 100,
      boundingBoxWidth: 200,
      boundingBoxHeight: 200
    },
    currentGraph: 'graph-0',
    graphData: {
      'graph-0': {
        label: 'Main',
        noDelete: true,
        type: ALGO_TYPE_FULL
      }
    },
    isBoundingBoxSelectable: true,
    isPhysicsOn: true,
    network: {},
    nodesIdsToDisplay: [],
    physicsHierarchicalView: true,
    physicsRepulsion: true,
    setStoreState: jest.fn(),
    showContextMenu: true,
    stylingEdgeLineColor: EDGE_COLOR,
    stylingEdgeLineColorHover: EDGE_COLOR,
    stylingEdgeLineColorHighlight: EDGE_COLOR_HIGHLIGHTED,
    stylingEdgeLineStyle: false,
    stylingEdgeTextColor: EDGE_COLOR,
    stylingEdgeTextSize: 12,
    stylingEdgeTextAlign: 'horizontal',
    stylingEdgeWidth: 1,
    stylingEdgeLength: 250,
    stylingNodeSize: 25,
    stylingNodeBorder: 1,
    stylingNodeTextColor: NODE_TEXT_COLOR,
    stylingNodeBorderSelected: 2,
    stylingNodeBorderColor: NODE_BORDER,
    stylingNodeBackgroundColor: NODE_BACKGROUND,
    stylingNodeHighlightBorderColor: HIGHLIGHT_NODE_BORDER,
    stylingNodeHighlightBackgroundColor: CLICK_NODE_BACKGROUND,
    stylingNodeHoverBackgroundColor: HOVER_NODE_BACKGROUND,
    stylingNodeHoverBorderColor: HOVER_NODE_BORDER,
    stylingNodeShape: NODE_DEFAULT_SHAPE,
    stylingNodeTextFontSize: 12,
    stylingNodeTextFontAlign: 'center',
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

  it('should match snapshot ', () => {
    const {
      component
    } = setup()

    expect(toJson(component)).toMatchSnapshot()
  })
})
