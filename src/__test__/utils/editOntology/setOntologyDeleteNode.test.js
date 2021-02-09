/* eslint max-len:0 */
import { DataSet } from 'vis-data'
import setOntologyDeleteNode from '../../../utils/editOntology/setOntologyDeleteNode'
import store from '../../../store'
import { OwlClasses } from '../../fixtures/test-ontology-classes.json'
import { graphVersions } from '../../fixtures/graphVersions'
import {
  addToObjectFixture,
  setStoreStateFixture
} from '../../fixtures/setOntologyDeleteNode'
import { OwlObjectProperties } from '../../fixtures/test-ontology-object-properties.json'

const selectedElement = Object.keys(OwlClasses).slice(0, Object.keys(OwlClasses).length - 2)

const setStoreState = jest.fn()
const addToObject = jest.fn()

describe('setOntologyDeleteNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const getState = jest.fn().mockImplementationOnce(() => ({
      graphVersions,
      classesFromApi: OwlClasses,
      deletedNodes: [],
      selectedGraphVersion: 'original',
      availableEdges: new DataSet(
        Object.keys(OwlObjectProperties).map((property) => ({
          id: property,
          label: OwlObjectProperties[property].rdfsLabel
        }))
      ),
      availableNodes: new DataSet(
        Object.keys(OwlClasses).map((classId) => ({
          id: classId,
          label: OwlClasses[classId].rdfsLabel
        }))
      ),
    }))
    store.getState = getState

    await setOntologyDeleteNode({
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
