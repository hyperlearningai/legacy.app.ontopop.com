import { DataSet } from 'vis-data'
import addNodesEdgesToGraph from '../../utils/addNodesEdgesToGraph'
import { OwlClasses } from '../fixtures/test-ontology-classes.json'
import { OwlObjectProperties } from '../fixtures/test-ontology-object-properties.json'
import { triplesPerNode } from '../fixtures/triplesPerNode'
import store from '../../store'

const setStoreState = jest.fn()
const classesFromApi = OwlClasses
const objectPropertiesFromApi = OwlObjectProperties
const getState = jest.fn().mockImplementation(() => ({
  availableNodes: new DataSet([{
    id: 'http://webprotege.stanford.edu/RB6vzK57zLwceWuRwWA1usg',
    color: {
      border: '#000000'
    }
  }]),
  triplesPerNode,
  classesFromApi,
  objectPropertiesFromApi,
  availableNodesNormalised: {},
  availableEdges: new DataSet(),
  availableEdgesNormalised: {},
  nodesConnections: {},
  edgesConnections: {},
  isPhysicsOn: false
}))
store.getState = getState

describe('addNodesEdgesToGraph', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const nodeId = 'http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw'

    await addNodesEdgesToGraph({
      nodeId,
      setStoreState
    })

    expect(setStoreState.mock.calls).toEqual([
      [
        'edgesConnections',
        {
          'http://webprotege.stanford.edu/RqeoNxhIUKNWDOrBxWFusJ': [
            {
              edgeId: 'http://webprotege.stanford.edu/RqeoNxhIUKNWDOrBxWFusJ',
              from: 'http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw',
              fromLabel: 'Polyline',
              id: 'http://webprotege.stanford.edu/RqeoNxhIUKNWDOrBxWFusJ___http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw___http://webprotege.stanford.edu/RBGK1EZogKmTJUyW3HfCU5t',
              label: 'Composed of',
              to: 'http://webprotege.stanford.edu/RBGK1EZogKmTJUyW3HfCU5t',
              toLabel: 'Polyline',
            },
            {
              edgeId: 'http://webprotege.stanford.edu/RqeoNxhIUKNWDOrBxWFusJ',
              from: 'http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw',
              fromLabel: 'Polyline',
              id: 'http://webprotege.stanford.edu/RqeoNxhIUKNWDOrBxWFusJ___http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw___http://webprotege.stanford.edu/RBB5dovsXWSPzlLSNMC5gyd',
              label: 'Composed of',
              to: 'http://webprotege.stanford.edu/RBB5dovsXWSPzlLSNMC5gyd',
              toLabel: 'Polyline',
            },
          ],
          'http://www.w3.org/2000/01/rdf-schema#subclassof': [
            {
              edgeId: 'http://www.w3.org/2000/01/rdf-schema#subclassof',
              from: 'http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw',
              fromLabel: 'Polyline',
              id: 'http://www.w3.org/2000/01/rdf-schema#subclassof___http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw___http://webprotege.stanford.edu/RB6vzK57zLwceWuRwWA1usg',
              label: 'subClassOf',
              to: 'http://webprotege.stanford.edu/RB6vzK57zLwceWuRwWA1usg',
              toLabel: 'Polyline',
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
          'http://webprotege.stanford.edu/RBB5dovsXWSPzlLSNMC5gyd': [
            {
              edgeId: 'http://webprotege.stanford.edu/RqeoNxhIUKNWDOrBxWFusJ',
              from: 'http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw',
              fromLabel: 'Polyline',
              id: 'http://webprotege.stanford.edu/RqeoNxhIUKNWDOrBxWFusJ___http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw___http://webprotege.stanford.edu/RBB5dovsXWSPzlLSNMC5gyd',
              label: 'Composed of',
              to: 'http://webprotege.stanford.edu/RBB5dovsXWSPzlLSNMC5gyd',
              toLabel: 'Polyline',
            },
          ],
          'http://webprotege.stanford.edu/RBGK1EZogKmTJUyW3HfCU5t': [
            {
              edgeId: 'http://webprotege.stanford.edu/RqeoNxhIUKNWDOrBxWFusJ',
              from: 'http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw',
              fromLabel: 'Polyline',
              id: 'http://webprotege.stanford.edu/RqeoNxhIUKNWDOrBxWFusJ___http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw___http://webprotege.stanford.edu/RBGK1EZogKmTJUyW3HfCU5t',
              label: 'Composed of',
              to: 'http://webprotege.stanford.edu/RBGK1EZogKmTJUyW3HfCU5t',
              toLabel: 'Polyline',
            },
          ],
        },
      ],
    ])
  })
})
