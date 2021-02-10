/* eslint max-len:0 */
import { DataSet } from 'vis-data'
import setOntologyRestoreNode from '../../../utils/editOntology/setOntologyRestoreNode'
import store from '../../../store'
import { OwlClasses } from '../../fixtures/test-ontology-classes.json'
import { OwlObjectProperties } from '../../fixtures/test-ontology-object-properties.json'
import { graphVersions } from '../../fixtures/graphVersions'
import {
  addToObjectFixture,
  setStoreStateFixture
} from '../../fixtures/setOntologyRestoreNode'

const selectedElement = Object.keys(OwlClasses).slice(0, 2)
const deletedNodes = Object.keys(OwlClasses).slice(0, 4)

const setStoreState = jest.fn()
const addToObject = jest.fn()

describe('setOntologyRestoreNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const getState = jest.fn().mockImplementation(() => ({
      graphVersions,
      classesFromApi: OwlClasses,
      objectPropertiesFromApi: OwlObjectProperties,
      deletedNodes,
      selectedGraphVersion: 'original',
      availableNodes: new DataSet(),
      availableEdges: new DataSet()
    }))
    store.getState = getState

    await setOntologyRestoreNode({
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
