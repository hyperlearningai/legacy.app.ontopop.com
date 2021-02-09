/* eslint max-len:0 */
import { DataSet } from 'vis-data'
import setOntologyDeleteConnection from '../../../utils/editOntology/setOntologyDeleteConnection'
import store from '../../../store'
import { OwlClasses } from '../../fixtures/test-ontology-classes.json'
import { graphVersions } from '../../fixtures/graphVersions'
import {
  addToObjectFixture,
  setStoreStateFixture
} from '../../fixtures/setOntologyDeleteConnection'

const selectedElement = [
  'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp___http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY___http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ'
]
const setStoreState = jest.fn()
const addToObject = jest.fn()

describe('setOntologyDeleteConnection', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const getState = jest.fn().mockImplementationOnce(() => ({
      graphVersions,
      selectedGraphVersion: 'original',
      classesFromApi: OwlClasses,
      availableEdges: new DataSet({ id: 1, label: 'test' }),
      deletedConnections: [],
    }))
    store.getState = getState

    await setOntologyDeleteConnection({
      setStoreState,
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
