/* eslint max-len:0 */
import setOntologyDeleteConnection from '../../../utils/editOntology/setOntologyDeleteConnection'
import store from '../../../store'
import { OwlClasses } from '../../fixtures/test-ontology-classes.json'
import {
  setStoreStateFixture
} from '../../fixtures/setOntologyDeleteConnection'
import removeEdge from '../../../utils/nodesEdgesUtils/removeEdge'
import { nodesConnections } from '../../fixtures/nodesConnections'
import { triplesPerNode } from '../../fixtures/triplesPerNode'
import { edgesConnections } from '../../fixtures/edgesConnections'

jest.mock('../../../utils/nodesEdgesUtils/removeEdge')

const selectedElement = [
  'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp___http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY___http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ'
]
const setStoreState = jest.fn()

describe('setOntologyDeleteConnection', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const getState = jest.fn().mockImplementationOnce(() => ({
      classesFromApi: OwlClasses,
      deletedConnections: [],
      nodesConnections,
      triplesPerNode,
      edgesConnections
    }))
    store.getState = getState

    await setOntologyDeleteConnection({
      setStoreState,
      selectedElement,
    })

    expect(removeEdge).toHaveBeenLastCalledWith(
      'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp___http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY___http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ'
    )

    expect(setStoreState.mock.calls).toEqual(setStoreStateFixture)
  })
})
