/* eslint max-len:0 */
import setOntologyRestoreConnection from '../../../utils/editOntology/setOntologyRestoreConnection'
import store from '../../../store'
import { OwlClasses } from '../../fixtures/test-ontology-classes.json'
import { OwlObjectProperties } from '../../fixtures/test-ontology-object-properties.json'
import { nodesConnections } from '../../fixtures/nodesConnections'
import { triplesPerNode } from '../../fixtures/triplesPerNode'
import { edgesConnections } from '../../fixtures/edgesConnections'
import {
  setStoreStateFixture
} from '../../fixtures/setOntologyRestoreConnection'
import addEdge from '../../../utils/nodesEdgesUtils/addEdge'
import setEdgeStylesByProperty from '../../../utils/networkStyling/setEdgeStylesByProperty'
import getNode from '../../../utils/nodesEdgesUtils/getNode'
import getEdgeObject from '../../../utils/graphVisualisation/getEdgeObject'

const selectedElement = [
  'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp___http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY___http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ'
]
const setStoreState = jest.fn()
const newOwlClasses = JSON.parse(JSON.stringify(OwlClasses))
newOwlClasses['http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY'].rdfsSubClassOf = [{
  classRdfAbout: 'http://webprotege.stanford.edu/RDLUE0UQz6th3NduA1L3n3u',
  owlRestriction: null
}]

jest.mock('../../../utils/nodesEdgesUtils/getNode')
jest.mock('../../../utils/networkStyling/setEdgeStylesByProperty')
jest.mock('../../../utils/graphVisualisation/getEdgeObject')
jest.mock('../../../utils/nodesEdgesUtils/addEdge')

describe('setOntologyRestoreConnection', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      classesFromApi: newOwlClasses,
      objectPropertiesFromApi: OwlObjectProperties,
      deletedConnections: [selectedElement[0]],
      stylingNodeCaptionProperty: 'rdfsLabel',
      deletedNodes: [],
      classesFromApiBackup: OwlClasses,
      nodesConnections,
      triplesPerNode,
      edgesConnections
    }))

    getEdgeObject.mockImplementation(() => ({
      edge: { id: 'node-123' },
      edgeConnection: {
        to: 'node-123',
        from: 'node-234'
      }
    }))
    getNode.mockImplementation(() => ({ id: '123' }))

    await setOntologyRestoreConnection({
      selectedElement,
      setStoreState,
    })

    expect(addEdge).toHaveBeenLastCalledWith({
      id: 'node-123',
    })

    expect(setEdgeStylesByProperty).toHaveBeenLastCalledWith(
      { edgeId: 'node-123' }
    )

    expect(setStoreState.mock.calls).toEqual(setStoreStateFixture)
  })
})
