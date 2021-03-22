import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { DataSet } from 'vis-data'
import GraphVisualisation from '../../components/GraphVisualisation'
import {
  EDGE_COLOR,
  EDGE_COLOR_HIGHLIGHTED,
} from '../../constants/graph'

const setup = () => {
  const props = {
    currentGraph: 'graph-0',
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
    isBoundingBoxSelectable: true,
    isPhysicsOn: true,
    network: {},
    nodesIdsToDisplay: [],
    physicsHierarchicalView: true,
    physicsRepulsion: true,
    setStoreState: jest.fn(),
    showContextMenu: true,
    removeFromObject: jest.fn(),
    addNumber: jest.fn(),
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
    }
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
