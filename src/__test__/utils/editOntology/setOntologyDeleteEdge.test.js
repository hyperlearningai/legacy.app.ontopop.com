/* eslint max-len:0 */
import setOntologyDeleteEdge from '../../../utils/editOntology/setOntologyDeleteEdge'
import store from '../../../store'
import { OwlObjectProperties } from '../../fixtures/test-ontology-object-properties.json'
import { OwlClasses } from '../../fixtures/test-ontology-classes.json'
import {
  setStoreStateFixture
} from '../../fixtures/setOntologyDeleteEdge'
import removeEdge from '../../../utils/nodesEdgesUtils/removeEdge'
import { nodesConnections } from '../../fixtures/nodesConnections'
import { triplesPerNode } from '../../fixtures/triplesPerNode'
import { edgesConnections } from '../../fixtures/edgesConnections'
import setElementsStyle from '../../../utils/networkStyling/setElementsStyle'

jest.mock('../../../utils/nodesEdgesUtils/removeEdge')
jest.mock('../../../utils/networkStyling/setElementsStyle')

const selectedElement = Object.keys(OwlObjectProperties).slice(0, Object.keys(OwlObjectProperties).length - 2)

const setStoreState = jest.fn()
const deletedEdges = []

describe('setOntologyDeleteEdge', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const getState = jest.fn().mockImplementationOnce(() => ({
      objectPropertiesFromApi: OwlObjectProperties,
      deletedEdges,
      classesFromApi: OwlClasses,
      nodesConnections,
      triplesPerNode,
      edgesConnections
    }))
    store.getState = getState

    await setOntologyDeleteEdge({
      selectedElement,
      setStoreState,
    })

    expect(removeEdge).toHaveBeenLastCalledWith(
      'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp___http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY___http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ'
    )

    expect(setElementsStyle).toHaveBeenCalledWith()

    expect(setStoreState.mock.calls).toEqual(setStoreStateFixture)
  })
})
