/* eslint max-len:0 */
import setOntologyRestoreNode from '../../../utils/editOntology/setOntologyRestoreNode'
import store from '../../../store'
import { classesFromApi } from '../../fixtures/classesFromApi'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import {
  updateStoreValueFixture
} from '../../fixtures/setOntologyRestoreNode'
import { nodesEdges } from '../../fixtures/nodesEdges'
import { totalEdgesPerNode } from '../../fixtures/totalEdgesPerNode'
import getNode from '../../../utils/nodesEdgesUtils/getNode'
import setElementsStyle from '../../../utils/networkStyling/setElementsStyle'
import getElementLabel from '../../../utils/networkStyling/getElementLabel'
import addNode from '../../../utils/nodesEdgesUtils/addNode'
import addEdge from '../../../utils/nodesEdgesUtils/addEdge'
import en from '../../../i18n/en'
import httpCall from '../../../utils/apiCalls/httpCall'
import showNotification from '../../../utils/notifications/showNotification'
import {
  CLICK_NODE_BACKGROUND, EDGE_COLOR, EDGE_COLOR_HIGHLIGHTED,
  EDGE_LABEL_PROPERTY, HIGHLIGHT_NODE_BORDER, HOVER_NODE_BACKGROUND,
  HOVER_NODE_BORDER, LABEL_PROPERTY, NODE_BACKGROUND, NODE_BORDER,
  NODE_DEFAULT_SHAPE, NODE_TEXT_COLOR
} from '../../../constants/graph'
import countEdges from '../../../utils/nodesEdgesUtils/countEdges'
import countNodes from '../../../utils/nodesEdgesUtils/countNodes'
import checkNodeVisibility from '../../../utils/networkGraphOptions/checkNodeVisibility'
import checkEdgeVisibility from '../../../utils/networkGraphOptions/checkEdgeVisibility'

const selectedElement = ['100', '40']
const deletedNodes = ['100', '33', '21', '40']
const deletedEdges = ['11', '33', '21', '40']

const updateStoreValue = jest.fn()
const t = (id) => en[id]

jest.mock('../../../utils/nodesEdgesUtils/getNode')
jest.mock('../../../utils/networkStyling/setElementsStyle')
jest.mock('../../../utils/networkStyling/getElementLabel')
jest.mock('../../../utils/nodesEdgesUtils/addNode')
jest.mock('../../../utils/nodesEdgesUtils/addEdge')
jest.mock('../../../utils/apiCalls/httpCall')
jest.mock('../../../utils/notifications/showNotification')
jest.mock('../../../utils/nodesEdgesUtils/countEdges')
jest.mock('../../../utils/nodesEdgesUtils/countNodes')
jest.mock('../../../utils/networkGraphOptions/checkNodeVisibility')
jest.mock('../../../utils/networkGraphOptions/checkEdgeVisibility')

store.getState = jest.fn().mockImplementation(() => ({
  classesFromApiBackup: classesFromApi,
  classesFromApi,
  deletedNodes,
  deletedEdges,
  objectPropertiesFromApi,
  objectPropertiesFromApiBackup: objectPropertiesFromApi,
  nodesEdges,
  totalEdgesPerNode,
  totalEdgesPerNodeBackup: totalEdgesPerNode,
  userDefinedNodeStyling: {
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
    stylingNodeCaptionProperty: LABEL_PROPERTY,
  },
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
    stylingEdgeCaptionProperty: EDGE_LABEL_PROPERTY,
  },
  userDefinedEdgeStyling: {
    stylingEdgeLineColor: EDGE_COLOR,
    stylingEdgeLineColorHover: EDGE_COLOR,
    stylingEdgeLineColorHighlight: EDGE_COLOR_HIGHLIGHTED,
    stylingEdgeLineStyle: false,
    stylingEdgeTextColor: EDGE_COLOR,
    stylingEdgeTextSize: 12,
    stylingEdgeTextAlign: 'horizontal',
    stylingEdgeWidth: 1,
    stylingEdgeLength: 250,
    stylingEdgeCaptionProperty: EDGE_LABEL_PROPERTY,
  },
}))

countEdges.mockImplementation(() => 1)
countNodes.mockImplementation(() => 1)
checkNodeVisibility.mockImplementation(() => true)
checkEdgeVisibility.mockImplementation(() => true)

describe('setOntologyRestoreNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when error', async () => {
    httpCall.mockImplementation(() => ({ error: true }))

    await setOntologyRestoreNode({
      updateStoreValue,
      selectedElement,
      t
    })

    expect(showNotification).toHaveBeenLastCalledWith(
      {
        message: 'Could not restore node: 40',
        type: 'warning'
      }
    )
  })

  it('should work correctly when no data', async () => {
    httpCall.mockImplementation(() => ({ data: {} }))

    await setOntologyRestoreNode({
      updateStoreValue,
      selectedElement,
      t
    })

    expect(showNotification).toHaveBeenLastCalledWith(
      {
        message: 'Could not restore node: 40',
        type: 'warning'
      }
    )
  })

  it('should work correctly', async () => {
    const classesFromApiLatest = JSON.parse(JSON.stringify(classesFromApi))
    deletedNodes.map((nodeId) => delete classesFromApiLatest[nodeId])

    httpCall.mockImplementation(() => ({
      data: {
        12: { id: '12' }
      }
    }))

    getNode.mockImplementation(() => ({ id: '123' }))

    getElementLabel.mockImplementation(() => 'Provided to')

    await setOntologyRestoreNode({
      updateStoreValue,
      selectedElement,
      t
    })

    expect(setElementsStyle).toHaveBeenCalledWith()
    expect(addNode).toHaveBeenLastCalledWith(
      {
        updateStoreValue,
        node: {
          Type: 'Sketch',
          borderWidth: 1,
          borderWidthSelected: 2,
          color: {
            background: '#adefd1',
            border: '#011e41',
            highlight: {
              background: '#ffed00',
              border: '#009688',
            },
            hover: {
              background: '#f2f2f2',
              border: '#607d8b',
            },
          },
          font: {
            align: 'center',
            bold: '700',
            color: '#000000',
            face: 'Montserrat',
            size: 12,
          },
          id: '12',
          label: 'Provided to',
          title: 'Provided to',
          name: 'Drawing',
          nodeId: 40,
          nodeType: 'class',
          rdfAbout: 'http://webprotege.stanford.edu/R7ziZlwBCU3dDShTGeoBjYR',
          rdfsLabel: 'Drawing',
          shape: 'circle',
          size: 25,
          skosDefinition: 'A Design Representation intended to visually communicate the properties of an Asset or system of Assets.',
          upperOntology: false,
          userDefined: false,
        },
      }
    )
    expect(addEdge).toHaveBeenLastCalledWith(
      {
        updateStoreValue,
        edge: {
          arrows: {
            to: true,
          },
          color: {
            color: '#070b11',
            highlight: '#9c27b0',
            hover: '#070b11',
            inherit: 'from',
            opacity: 1,
          },
          dashes: false,
          edgeId: 401,
          font: {
            align: 'horizontal',
            color: '#070b11',
            size: 12,
          },
          from: '12',
          id: '401',
          label: 'Provided to',
          labelHighlightBold: true,
          rdfsLabel: 'Subclass of',
          role: 'Subclass of',
          selectionWidth: 3,
          smooth: {
            forceDirection: 'none',
            roundness: 0.45,
            type: 'cubicBezier',
          },
          to: '162',
          userDefined: false,
          width: 1,
        }
      }
    )
    expect(updateStoreValue.mock.calls).toEqual(updateStoreValueFixture)
  })
})
