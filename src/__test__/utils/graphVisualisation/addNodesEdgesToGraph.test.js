// import { DataSet } from 'vis-data'
import addNodesEdgesToGraph from '../../../utils/graphVisualisation/addNodesEdgesToGraph'
import { OwlClasses } from '../../fixtures/test-ontology-classes.json'
import { OwlObjectProperties } from '../../fixtures/test-ontology-object-properties.json'
import { triplesPerNode } from '../../fixtures/triplesPerNode'
import store from '../../../store'
import getEdge from '../../../utils/nodesEdgesUtils/getEdge'
import addNode from '../../../utils/nodesEdgesUtils/addNode'
import getNode from '../../../utils/nodesEdgesUtils/getNode'
import addEdge from '../../../utils/nodesEdgesUtils/addEdge'
import setElementsStyle from '../../../utils/networkStyling/setElementsStyle'

jest.mock('../../../utils/nodesEdgesUtils/getEdge')
jest.mock('../../../utils/nodesEdgesUtils/addNode')
jest.mock('../../../utils/nodesEdgesUtils/getNode')
jest.mock('../../../utils/nodesEdgesUtils/addEdge')
jest.mock('../../../utils/networkStyling/highlightSpiderableNodes')
jest.mock('../../../utils/networkStyling/setElementsStyle')

const setStoreState = jest.fn()
const classesFromApi = OwlClasses
const objectPropertiesFromApi = OwlObjectProperties

store.getState = jest.fn().mockImplementation(() => ({
  triplesPerNode,
  classesFromApi,
  objectPropertiesFromApi,
  nodesConnections: {},
  edgesConnections: {},
  isPhysicsOn: false,
  stylingNodeCaptionProperty: 'rdfsLabel'
}))

describe('addNodesEdgesToGraph', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const nodeId = 'http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw'

    getEdge.mockImplementation(() => null)
    getNode.mockImplementation(() => null)

    await addNodesEdgesToGraph({
      nodeId,
      setStoreState
    })

    expect(addNode).toHaveBeenLastCalledWith({
      id:
    'http://webprotege.stanford.edu/RB6vzK57zLwceWuRwWA1usg',
      label: 'Geometric\nComponent'
    })
    expect(setElementsStyle).toHaveBeenLastCalledWith()

    expect(addEdge).toHaveBeenLastCalledWith({
      from: 'http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw',
      id: 'http://www.w3.org/2000/01/rdf-schema#subclassof___http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw___http://webprotege.stanford.edu/RB6vzK57zLwceWuRwWA1usg',
      label: 'subClassOf',
      predicate: 'http://www.w3.org/2000/01/rdf-schema#subclassof',
      to: 'http://webprotege.stanford.edu/RB6vzK57zLwceWuRwWA1usg',
    })

    expect(setStoreState.mock.calls).toEqual([
      [
        'edgesConnections',
        {
          'http://webprotege.stanford.edu/RqeoNxhIUKNWDOrBxWFusJ': [
            {
              from: 'http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw',
              predicate: 'http://webprotege.stanford.edu/RqeoNxhIUKNWDOrBxWFusJ',
              to: 'http://webprotege.stanford.edu/RBGK1EZogKmTJUyW3HfCU5t',
            },
            {
              from: 'http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw',
              predicate: 'http://webprotege.stanford.edu/RqeoNxhIUKNWDOrBxWFusJ',
              to: 'http://webprotege.stanford.edu/RBB5dovsXWSPzlLSNMC5gyd',
            },
          ],
          'http://www.w3.org/2000/01/rdf-schema#subclassof': [
            {
              from: 'http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw',
              predicate: 'http://www.w3.org/2000/01/rdf-schema#subclassof',
              to: 'http://webprotege.stanford.edu/RB6vzK57zLwceWuRwWA1usg',
            },
          ],
        },
      ],
      [
        'isPhysicsOn',
        true,
      ],
      [
        'physicsRepulsion',
        false,
      ],
      [
        'nodesConnections',
        {
          'http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw': [
            {
              from: 'http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw',
              predicate: 'http://webprotege.stanford.edu/RqeoNxhIUKNWDOrBxWFusJ',
              to: 'http://webprotege.stanford.edu/RBGK1EZogKmTJUyW3HfCU5t',
            },
            {
              from: 'http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw',
              predicate: 'http://webprotege.stanford.edu/RqeoNxhIUKNWDOrBxWFusJ',
              to: 'http://webprotege.stanford.edu/RBB5dovsXWSPzlLSNMC5gyd',
            },
            {
              from: 'http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw',
              predicate: 'http://www.w3.org/2000/01/rdf-schema#subclassof',
              to: 'http://webprotege.stanford.edu/RB6vzK57zLwceWuRwWA1usg',
            },
          ],
          'http://webprotege.stanford.edu/RB6vzK57zLwceWuRwWA1usg': [
            {
              from: 'http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw',
              predicate: 'http://www.w3.org/2000/01/rdf-schema#subclassof',
              to: 'http://webprotege.stanford.edu/RB6vzK57zLwceWuRwWA1usg',
            },
          ],
          'http://webprotege.stanford.edu/RBB5dovsXWSPzlLSNMC5gyd': [
            {
              from: 'http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw',
              predicate: 'http://webprotege.stanford.edu/RqeoNxhIUKNWDOrBxWFusJ',
              to: 'http://webprotege.stanford.edu/RBB5dovsXWSPzlLSNMC5gyd',
            },
          ],
          'http://webprotege.stanford.edu/RBGK1EZogKmTJUyW3HfCU5t': [
            {
              from: 'http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw',
              predicate: 'http://webprotege.stanford.edu/RqeoNxhIUKNWDOrBxWFusJ',
              to: 'http://webprotege.stanford.edu/RBGK1EZogKmTJUyW3HfCU5t',
            },
          ],
        },
      ],
    ])
  })
})
