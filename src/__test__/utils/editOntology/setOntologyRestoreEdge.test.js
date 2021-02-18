/* eslint max-len:0 */
import setOntologyRestoreEdgeDeleteNode from '../../../utils/editOntology/setOntologyRestoreEdge'
import store from '../../../store'
import { OwlClasses } from '../../fixtures/test-ontology-classes.json'
import { OwlObjectProperties } from '../../fixtures/test-ontology-object-properties'
import { nodesConnections } from '../../fixtures/nodesConnections'
import { triplesPerNode } from '../../fixtures/triplesPerNode'
import { edgesConnections } from '../../fixtures/edgesConnections'
import {
  setStoreStateFixture
} from '../../fixtures/setOntologyRestoreEdge'
import setElementsStyle from '../../../utils/networkStyling/setElementsStyle'
import getEdgeObject from '../../../utils/graphVisualisation/getEdgeObject'
import getNode from '../../../utils/nodesEdgesUtils/getNode'
import addEdge from '../../../utils/nodesEdgesUtils/addEdge'

const selectedElement = Object.keys(OwlObjectProperties).slice(0, 2)
const deletedNodes = Object.keys(OwlClasses).slice(0, 4)
const deletedEdges = Object.keys(OwlObjectProperties).slice(0, 4)
const newClassesFromApi = JSON.parse(JSON.stringify(OwlClasses))
const objectPropertiesFromApi = JSON.parse(JSON.stringify(OwlObjectProperties))

deletedNodes.map((nodeId) => {
  delete newClassesFromApi[nodeId]
  return true
})

const setStoreState = jest.fn()
const addToObject = jest.fn()

jest.mock('../../../utils/networkStyling/setElementsStyle')
jest.mock('../../../utils/graphVisualisation/getEdgeObject')
jest.mock('../../../utils/nodesEdgesUtils/getNode')
jest.mock('../../../utils/nodesEdgesUtils/addEdge')

describe('setOntologyRestoreEdge', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const getState = jest.fn().mockImplementation(() => ({
      classesFromApi: newClassesFromApi,
      objectPropertiesFromApi,
      deletedEdges,
      nodesConnections,
      triplesPerNode,
      objectPropertiesFromApiBackup: objectPropertiesFromApi,
      classesFromApiBackup: newClassesFromApi,
      edgesConnections,
      deletedConnections: [],
      deletedNodes
    }))
    store.getState = getState

    getEdgeObject.mockImplementation(() => ({
      edge: { id: 'node-123' },
      edgeConnection: {
        to: 'node-123',
        from: 'node-234'
      }
    }))
    getNode.mockImplementation(() => ({ id: '123' }))

    await setOntologyRestoreEdgeDeleteNode({
      selectedElement,
      setStoreState,
      addToObject
    })

    expect(setElementsStyle).toHaveBeenCalledWith()
    expect(addEdge).toHaveBeenLastCalledWith({ id: 'node-123' })
    expect(setStoreState.mock.calls).toEqual(setStoreStateFixture)
  })
})
