/* eslint max-len:0 */
import { DataSet } from 'vis-data'
import setOntologyDeleteEdge from '../../../utils/editOntology/setOntologyDeleteEdge'
import store from '../../../store'
import { OwlObjectProperties } from '../../fixtures/test-ontology-object-properties.json'
import { OwlClasses } from '../../fixtures/test-ontology-classes.json'
import { graphVersions } from '../../fixtures/graphVersions'
import {
  addToObjectFixture,
  setStoreStateFixture
} from '../../fixtures/setOntologyDeleteEdge'

const selectedElement = Object.keys(OwlObjectProperties).slice(0, Object.keys(OwlObjectProperties).length - 2)

const setStoreState = jest.fn()
const addToObject = jest.fn()
const deletedEdges = []

describe('setOntologyDeleteEdge', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const getState = jest.fn().mockImplementationOnce(() => ({
      graphVersions,
      objectPropertiesFromApi: OwlObjectProperties,
      deletedEdges,
      selectedGraphVersion: 'original',
      classesFromApi: OwlClasses,
      availableEdges: new DataSet(
        Object.keys(OwlObjectProperties).map((property) => ({
          id: property,
          label: OwlObjectProperties[property].rdfsLabel
        }))
      )
    }))
    store.getState = getState

    await setOntologyDeleteEdge({
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
