// import { DataSet } from 'vis-data'
import addNodesEdgesToGraph from '../../utils/addNodesEdgesToGraph'
import { OwlClasses } from '../fixtures/test-ontology-classes.json'
import { OwlObjectProperties } from '../fixtures/test-ontology-object-properties.json'
import { triplesPerNode } from '../fixtures/triplesPerNode'
import store from '../../store'
import getEdge from '../../utils/nodesEdgesUtils/getEdge'
import addNode from '../../utils/nodesEdgesUtils/addNode'
import getNode from '../../utils/nodesEdgesUtils/getNode'
import addEdge from '../../utils/nodesEdgesUtils/addEdge'
import highlightSpiderableNodes from '../../utils/highlightSpiderableNodes'

jest.mock('../../utils/nodesEdgesUtils/getEdge')
jest.mock('../../utils/nodesEdgesUtils/addNode')
jest.mock('../../utils/nodesEdgesUtils/getNode')
jest.mock('../../utils/nodesEdgesUtils/addEdge')
jest.mock('../../utils/highlightSpiderableNodes')

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
    expect(addEdge).toHaveBeenLastCalledWith({
      from: 'http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw',
      id: 'http://www.w3.org/2000/01/rdf-schema#subclassof___http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw___http://webprotege.stanford.edu/RB6vzK57zLwceWuRwWA1usg',
      label: 'subClassOf',
      to: 'http://webprotege.stanford.edu/RB6vzK57zLwceWuRwWA1usg'
    })
    expect(highlightSpiderableNodes).toHaveBeenCalledWith({
      nodesConnections: {},
      triplesPerNode,
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
          'http://webprotege.stanford.edu/RB6vzK57zLwceWuRwWA1usg': [
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
