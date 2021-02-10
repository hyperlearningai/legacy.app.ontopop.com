/* eslint max-len:0 */
import setOntologyUpdateEdge from '../../../utils/editOntology/setOntologyUpdateEdge'
import store from '../../../store'
import { OwlObjectProperties } from '../../fixtures/test-ontology-object-properties.json'
import { graphVersions } from '../../fixtures/graphVersions'
import {
  addToObjectFixture,
  setStoreStateFixture
} from '../../fixtures/setOntologyUpdateEdge'
import getEdge from '../../../utils/nodesEdgesUtils/getEdge'

jest.mock('../../../utils/nodesEdgesUtils/getEdge')

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
    getEdge.mockImplementation(() => [])

    const getState = jest.fn().mockImplementation(() => ({
      graphVersions,
      objectPropertiesFromApi: OwlObjectProperties,
      selectedGraphVersion: 'original',
      updatedEdges: [],
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
