/* eslint max-len:0 */
import { DataSet } from 'vis-data'
import setOntologyUpdateEdge from '../../../utils/editOntology/setOntologyUpdateEdge'
import store from '../../../store'
import { OwlObjectProperties } from '../../fixtures/test-ontology-object-properties.json'
import { graphVersions } from '../../fixtures/graphVersions'
import { availableEdgesNormalised } from '../../fixtures/availableEdgesNormalised'
import {
  addToObjectFixture,
  setStoreStateFixture
} from '../../fixtures/setOntologyUpdateEdge'

const selectedElementProperties = {
  rdfAbout: 'http://test.com/edge',
  rdfsLabel: 'New edge',
  'http://webprotege.stanford.edu/R15RMwxh0pmeZADFPUrcpM': 'Another edge'
}
const selectedElement = 'http://webprotege.stanford.edu/R15RMwxh0pmeZADFPUrcpM'
const setStoreState = jest.fn()
const addToObject = jest.fn()

describe('setOntologyUpdateEdge', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const getState = jest.fn().mockImplementationOnce(() => ({
      graphVersions,
      objectPropertiesFromApi: OwlObjectProperties,
      selectedGraphVersion: 'original',
      availableEdges: new DataSet({ id: 1, label: 'test' }),
      updatedEdges: [],
      availableEdgesNormalised
    }))
    store.getState = getState

    await setOntologyUpdateEdge({
      setStoreState,
      selectedElementProperties,
      selectedElement,
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
