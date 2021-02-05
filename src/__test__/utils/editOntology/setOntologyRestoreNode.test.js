/* eslint max-len:0 */
import setOntologyRestoreNodeDeleteNode from '../../../utils/editOntology/setOntologyRestoreNode'
import store from '../../../store'
import { OwlClasses } from '../../fixtures/test-ontology-classes.json'
import { graphVersions } from '../../fixtures/graphVersions'
import {
  addToObjectFixture,
  setStoreStateFixture
} from '../../fixtures/setOntologyRestoreNode'

const selectedElement = Object.keys(OwlClasses).slice(0, 2)
const deletedNodes = Object.keys(OwlClasses).slice(0, 4)
const newClassesFromApi = JSON.parse(JSON.stringify(OwlClasses))
const newClassesFromApiBackup = JSON.parse(JSON.stringify(OwlClasses))

deletedNodes.map((nodeId) => {
  delete newClassesFromApi[nodeId]
  return true
})

const setStoreState = jest.fn()
const addToObject = jest.fn()

describe('setOntologyRestoreNode', () => {
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
      selectedGraphVersion: 'original',
      currentGraph
    }))
    store.getState = getState

    await setOntologyRestoreNodeDeleteNode({
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
