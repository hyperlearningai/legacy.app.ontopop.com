/* eslint max-len:0 */
import setOntologyRestoreNode from '../../../utils/editOntology/setOntologyRestoreNode'
import store from '../../../store'
import { classesFromApi } from '../../fixtures/classesFromApi'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import {
  setStoreStateFixture
} from '../../fixtures/setOntologyRestoreNode'
import { nodesEdges } from '../../fixtures/nodesEdgesNew'
import { totalEdgesPerNode } from '../../fixtures/totalEdgesPerNode'
import getNode from '../../../utils/nodesEdgesUtils/getNode'
import setElementsStyle from '../../../utils/networkStyling/setElementsStyle'
import getEdgeObject from '../../../utils/graphVisualisation/getEdgeObject'
import addNode from '../../../utils/nodesEdgesUtils/addNode'
import addEdge from '../../../utils/nodesEdgesUtils/addEdge'
import en from '../../../i18n/en'
import httpCall from '../../../utils/apiCalls/httpCall'
import showNotification from '../../../utils/notifications/showNotification'
import { EDGE_COLOR, EDGE_COLOR_HIGHLIGHTED, EDGE_LABEL_PROPERTY } from '../../../constants/graph'
import countEdges from '../../../utils/nodesEdgesUtils/countEdges'
import countNodes from '../../../utils/nodesEdgesUtils/countNodes'

const selectedElement = ['100', '40']
const deletedNodes = ['100', '33', '21', '40']
const deletedEdges = ['11', '33', '21', '40']

const setStoreState = jest.fn()
const t = (id) => en[id]
const addNumber = jest.fn()

jest.mock('../../../utils/nodesEdgesUtils/getNode')
jest.mock('../../../utils/networkStyling/setElementsStyle')
jest.mock('../../../utils/graphVisualisation/getEdgeObject')
jest.mock('../../../utils/nodesEdgesUtils/addNode')
jest.mock('../../../utils/nodesEdgesUtils/addEdge')
jest.mock('../../../utils/apiCalls/httpCall')
jest.mock('../../../utils/notifications/showNotification')
jest.mock('../../../utils/nodesEdgesUtils/countEdges')
jest.mock('../../../utils/nodesEdgesUtils/countNodes')

store.getState = jest.fn().mockImplementation(() => ({
  classesFromApiBackup: classesFromApi,
  classesFromApi,
  deletedNodes,
  deletedEdges,
  objectPropertiesFromApi,
  userDefinedNodeStyling: { stylingNodeCaptionProperty: 'rdfsLabel' },
  objectPropertiesFromApiBackup: objectPropertiesFromApi,
  nodesEdges,
  totalEdgesPerNode,
  totalEdgesPerNodeBackup: totalEdgesPerNode,
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

describe('setOntologyRestoreNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when error', async () => {
    httpCall.mockImplementation(() => ({ error: true }))

    await setOntologyRestoreNode({
      addNumber,
      selectedElement,
      setStoreState,
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
      addNumber,
      selectedElement,
      setStoreState,
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
        40: { id: '40' }
      }
    }))

    getNode.mockImplementation(() => ({ id: '123' }))

    getEdgeObject.mockImplementation(() => ({
      rdfAbout: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
      rdfsLabel: 'Provided to',
      label: 'Provided to',
      predicate: '11',
      id: '11',
      from: '1',
      to: '141',
    }))

    await setOntologyRestoreNode({
      addNumber,
      selectedElement,
      setStoreState,
      t
    })

    expect(setElementsStyle).toHaveBeenCalledWith()
    expect(addNode).toHaveBeenLastCalledWith(
      {
        'Business Area': 'Maintain Operate',
        Synonym: 'Point, Feature',
        borderWidth: undefined,
        borderWidthSelected: undefined,
        color: {
          background: undefined,
          border: undefined,
          highlight: {
            background: undefined,
            border: undefined,
          },
          hover: {
            background: undefined,
            border: undefined,
          },
        },
        font: {
          align: undefined,
          bold: '700',
          color: undefined,
          face: 'Montserrat',
          size: undefined,
        },
        id: '40',
        label: 'Node',
        nodeId: 100,
        rdfAbout: 'http://webprotege.stanford.edu/RBGK1EZogKmTJUyW3HfCU5t',
        rdfsLabel: 'Node',
        shape: undefined,
        size: undefined,
        skosComment: 'A Node can also be defined as a point in a network or diagram at which lines or pathways intersect or branch.',
        skosDefinition: 'A zero dimensional Entity with a position but no volume that is usually represented by a small round dot.',
        userDefined: false,
      }
    )
    expect(addEdge).toHaveBeenLastCalledWith(
      {
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
        font: {
          align: 'horizontal',
          color: '#070b11',
          size: 12,
        },
        from: '1',
        id: '11',
        label: 'Provided to',
        labelHighlightBold: true,
        predicate: '11',
        rdfAbout: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
        rdfsLabel: 'Provided to',
        selectionWidth: 3,
        smooth: {
          forceDirection: 'none',
          roundness: 0.45,
          type: 'cubicBezier',
        },
        to: '141',
        width: 1,
      }
    )
    expect(setStoreState.mock.calls).toEqual(setStoreStateFixture)
  })
})
