/* eslint max-len:0 */
import { DataSet } from 'vis-data'
import setOntologyAddConnection from '../../../utils/editOntology/setOntologyAddConnection'
import store from '../../../store'
import { OwlObjectProperties } from '../../fixtures/test-ontology-object-properties.json'
import { OwlClasses } from '../../fixtures/test-ontology-classes.json'
import { graphVersions } from '../../fixtures/graphVersions'
import {
  addToObjectFixture,
  setStoreStateFixture
} from '../../fixtures/setOntologyAddConnection'

const selectedElementProperties = {
  from: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
  predicate: 'http://webprotege.stanford.edu/R5u6iRwByXm7q6dOcaVRk8',
  to: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M'
}

const setStoreState = jest.fn()
const addToObject = jest.fn()

describe('setOntologyAddConnection', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const getState = jest.fn().mockImplementationOnce(() => ({
      graphVersions,
      classesFromApi: OwlClasses,
      objectPropertiesFromApi: OwlObjectProperties,
      selectedGraphVersion: 'original',
      availableEdges: new DataSet({ id: 1, label: 'test' }),
      addedConnections: [],
    }))
    store.getState = getState

    await setOntologyAddConnection({
      setStoreState,
      selectedElementProperties,
      addToObject
    })

    // TODO Fix
    expect(addToObject).toHaveBeenCalledWith(
      'graphVersions',
      'original',
      addToObjectFixture
    )

    expect(setStoreState.mock.calls).toEqual(setStoreStateFixture)
  })
})
