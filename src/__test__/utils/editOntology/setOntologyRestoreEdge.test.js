/* eslint max-len:0 */
import { DataSet } from 'vis-data'
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
    const getState = jest.fn().mockImplementationOnce(() => ({
      graphVersions,
      classesFromApi: newClassesFromApi,
      availableEdges: new DataSet([]),
      availableNodes: new DataSet([]),
      deletedEdges,
      selectedGraphVersion: 'original',
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
