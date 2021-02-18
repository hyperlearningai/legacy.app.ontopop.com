/* eslint max-len:0 */
import setOntologyDeleteNode from '../../../utils/editOntology/setOntologyDeleteNode'
import store from '../../../store'
import { OwlClasses } from '../../fixtures/test-ontology-classes.json'
import {
  setStoreStateFixture
} from '../../fixtures/setOntologyDeleteNode'
import { nodesConnections } from '../../fixtures/nodesConnections'
import { triplesPerNode } from '../../fixtures/triplesPerNode'
import removeEdge from '../../../utils/nodesEdgesUtils/removeEdge'
import setElementsStyle from '../../../utils/networkStyling/setElementsStyle'

jest.mock('../../../utils/nodesEdgesUtils/removeEdge')
jest.mock('../../../utils/networkStyling/setElementsStyle')

const selectedElement = Object.keys(OwlClasses).slice(0, Object.keys(OwlClasses).length - 2)

const setStoreState = jest.fn()
const addToObject = jest.fn()

describe('setOntologyDeleteNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const getState = jest.fn().mockImplementationOnce(() => ({
      classesFromApi: OwlClasses,
      deletedNodes: [],
      nodesConnections,
      triplesPerNode,
      edgesConnections: {}
    }))
    store.getState = getState

    await setOntologyDeleteNode({
      selectedElement,
      setStoreState,
      addToObject
    })

    expect(removeEdge).toHaveBeenLastCalledWith(
      'http://www.w3.org/2000/01/rdf-schema#subclassof___http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY___http://webprotege.stanford.edu/RDLUE0UQz6th3NduA1L3n3u'
    )

    expect(setElementsStyle).toHaveBeenCalledWith()

    expect(setStoreState.mock.calls).toEqual(setStoreStateFixture)
  })
})
