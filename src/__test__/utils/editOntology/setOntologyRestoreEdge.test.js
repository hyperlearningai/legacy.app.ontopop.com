/* eslint max-len:0 */
import setOntologyRestoreEdgeDeleteNode from '../../../utils/editOntology/setOntologyRestoreEdge'
import store from '../../../store'
import { OwlClasses } from '../../fixtures/test-ontology-classes.json'
import { graphVersions } from '../../fixtures/graphVersions'
import { OwlObjectProperties } from '../../fixtures/test-ontology-object-properties'

import {
  addToObjectFixture,
  setStoreStateFixture
} from '../../fixtures/setOntologyRestoreEdge'

const selectedElement = Object.keys(OwlObjectProperties).slice(0, 2)
const deletedNodes = Object.keys(OwlClasses).slice(0, 4)
const deletedEdges = Object.keys(OwlObjectProperties).slice(0, 4)
const newClassesFromApi = JSON.parse(JSON.stringify(OwlClasses))
const newClassesFromApiBackup = JSON.parse(JSON.stringify(OwlClasses))
const objectPropertiesFromApi = JSON.parse(JSON.stringify(OwlObjectProperties))

deletedNodes.map((nodeId) => {
  delete newClassesFromApi[nodeId]
  return true
})

const setStoreState = jest.fn()
const addToObject = jest.fn()

describe('setOntologyRestoreEdge', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const currentGraph = 'graph-0'

    const getState = jest.fn().mockImplementationOnce(() => ({
      graphVersions,
      classesFromApi: newClassesFromApi,
      classesFromApiBackup: newClassesFromApiBackup, // OwlClasses,
      deletedNodes,
      deletedEdges,
      selectedGraphVersion: 'original',
      currentGraph,
      objectPropertiesFromApi
    }))
    store.getState = getState

    await setOntologyRestoreEdgeDeleteNode({
      selectedElement,
      setStoreState,
      addToObject
    })

    expect(addToObject).toHaveBeenCalledWith(
      'graphVersions',
      'original',
      addToObjectFixture
    )

    expect(setStoreState.mock.calls).toEqual(setStoreStateFixture)
  })
})
