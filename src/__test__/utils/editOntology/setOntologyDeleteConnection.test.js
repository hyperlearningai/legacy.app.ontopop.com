/* eslint max-len:0 */
import setOntologyDeleteConnection from '../../../utils/editOntology/setOntologyDeleteConnection'
import store from '../../../store'
import { OwlClasses } from '../../fixtures/test-ontology-classes.json'
import { graphVersions } from '../../fixtures/graphVersions'
import {
  addToObjectFixture,
  setStoreStateFixture
} from '../../fixtures/setOntologyDeleteConnection'
import removeEdge from '../../../utils/nodesEdgesUtils/removeEdge'

jest.mock('../../../utils/nodesEdgesUtils/removeEdge')

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
      deletedConnections: [],
    }))
    store.getState = getState

    await setOntologyDeleteConnection({
      setStoreState,
      selectedElement,
      addToObject
    })

    expect(removeEdge).toHaveBeenLastCalledWith(
      'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp___http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY___http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ'
    )

    expect(addToObject).toHaveBeenCalledWith(
      'graphVersions',
      'original',
      addToObjectFixture
    )

    expect(setStoreState.mock.calls).toEqual(setStoreStateFixture)
  })
})
