/* eslint max-len:0 */
import { DataSet } from 'vis-data'
import setOntologyAddEdge from '../../../utils/editOntology/setOntologyAddEdge'
import store from '../../../store'
import { OwlObjectProperties } from '../../fixtures/test-ontology-object-properties.json'
import { graphVersions } from '../../fixtures/graphVersions'
import { availableEdgesNormalised } from '../../fixtures/availableEdgesNormalised'
import {
  addToObjectFixture,
  setStoreStateFixture
} from '../../fixtures/setOntologyAddEdge'

const selectedElementProperties = {
  rdfAbout: 'http://test.com/edge',
  rdfsLabel: 'New edge',
  'http://webprotege.stanford.edu/R8Zrr9RnWOq4DeZDzBOW2J4': 'Another edge'
}

const setStoreState = jest.fn()
const addToObject = jest.fn()

describe('setOntologyAddEdge', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const getState = jest.fn().mockImplementationOnce(() => ({
      graphVersions,
      objectPropertiesFromApi: OwlObjectProperties,
      selectedGraphVersion: 'original',
      availableEdges: new DataSet({ id: 1, label: 'test' }),
      addedEdges: [],
      availableEdgesNormalised
    }))
    store.getState = getState

    await setOntologyAddEdge({
      setStoreState,
      selectedElementProperties,
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
