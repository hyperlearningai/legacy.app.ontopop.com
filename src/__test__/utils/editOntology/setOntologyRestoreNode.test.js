/* eslint max-len:0 */
import setOntologyRestoreNode from '../../../utils/editOntology/setOntologyRestoreNode'
import store from '../../../store'
import { classesFromApi } from '../../fixtures/classesFromApi'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import {
  setStoreStateFixture
} from '../../fixtures/setOntologyRestoreNode'
import { nodesEdges } from '../../fixtures/nodesEdgesNew'
import { edgesPerNode } from '../../fixtures/edgesPerNodeNew'
import getNode from '../../../utils/nodesEdgesUtils/getNode'
import setElementsStyle from '../../../utils/networkStyling/setElementsStyle'
import getEdgeObject from '../../../utils/graphVisualisation/getEdgeObject'
import addNode from '../../../utils/nodesEdgesUtils/addNode'
import addEdge from '../../../utils/nodesEdgesUtils/addEdge'
import en from '../../../i18n/en'
import httpCall from '../../../utils/apiCalls/httpCall'
import showNotification from '../../../utils/notifications/showNotification'

const selectedElement = ['100', '40']
const deletedNodes = ['100', '33', '21', '40']
const deletedEdges = ['11', '33', '21', '40']

const setStoreState = jest.fn()
const t = (id) => en[id]

jest.mock('../../../utils/nodesEdgesUtils/getNode')
jest.mock('../../../utils/networkStyling/setElementsStyle')
jest.mock('../../../utils/graphVisualisation/getEdgeObject')
jest.mock('../../../utils/nodesEdgesUtils/addNode')
jest.mock('../../../utils/nodesEdgesUtils/addEdge')
jest.mock('../../../utils/apiCalls/httpCall')
jest.mock('../../../utils/notifications/showNotification')

store.getState = jest.fn().mockImplementation(() => ({
  classesFromApiBackup: classesFromApi,
  classesFromApi,
  deletedNodes,
  deletedEdges,
  objectPropertiesFromApi,
  stylingNodeCaptionProperty: 'rdfsLabel',
  objectPropertiesFromApiBackup: objectPropertiesFromApi,
  nodesEdges,
  edgesPerNode,
  edgesPerNodeBackup: edgesPerNode
}))

describe('setOntologyRestoreNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when error', async () => {
    httpCall.mockImplementation(() => ({ error: true }))

    await setOntologyRestoreNode({
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
      selectedElement,
      setStoreState,
      t
    })

    expect(setElementsStyle).toHaveBeenCalledWith()
    expect(addNode).toHaveBeenLastCalledWith(
      {
        'Business Area': 'Maintain Operate',
        Synonym: 'Point, Feature',
        id: '40',
        label: 'Node',
        nodeId: 100,
        rdfAbout: 'http://webprotege.stanford.edu/RBGK1EZogKmTJUyW3HfCU5t',
        rdfsLabel: 'Node',
        skosComment: 'A Node can also be defined as a point in a network or diagram at which lines or pathways intersect or branch.',
        skosDefinition: 'A zero dimensional Entity with a position but no volume that is usually represented by a small round dot.',
        userDefined: false,
      }
    )
    expect(addEdge).toHaveBeenLastCalledWith(
      {
        from: '1',
        id: '11',
        label: 'Provided to',
        predicate: '11',
        rdfAbout: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
        rdfsLabel: 'Provided to',
        to: '141'
      }
    )
    expect(setStoreState.mock.calls).toEqual(setStoreStateFixture)
  })
})
