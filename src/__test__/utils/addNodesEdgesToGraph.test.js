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
  availableNodes: new DataSet(),
  triplesPerNode,
  classesFromApi,
  objectPropertiesFromApi,
  availableNodesNormalised: {},
  availableEdges: new DataSet(),
  availableEdgesNormalised: {},
  nodesConnections: {},
  edgesConnections: {},

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
        'newAvailableNodesNormalised',
        {
          'http://webprotege.stanford.edu/RBB5dovsXWSPzlLSNMC5gyd': {
            id: 'http://webprotege.stanford.edu/RBB5dovsXWSPzlLSNMC5gyd',
            label: 'Line',
            owlAnnotationProperties: {
              'http://www.w3.org/2004/02/skos/core#definition': 'The shortest path that connects two Nodes or points.',
            },
            rdfAbout: 'http://webprotege.stanford.edu/RBB5dovsXWSPzlLSNMC5gyd',
            rdfsLabel: 'Line',
            rdfsSubClassOf: [
              {
                classRdfAbout: 'http://webprotege.stanford.edu/RB6vzK57zLwceWuRwWA1usg',
                owlRestriction: null,
              },
            ],
            skosComment: null,
            skosDefinition: 'The shortest path that connects two Nodes or points.',
            skosExample: null,
          },
          'http://webprotege.stanford.edu/RBGK1EZogKmTJUyW3HfCU5t': {
            id: 'http://webprotege.stanford.edu/RBGK1EZogKmTJUyW3HfCU5t',
            label: 'Node',
            owlAnnotationProperties: {
              'http://webprotege.stanford.edu/R8Zrr9RnWOq4DeZDzBOW2J4': 'Point, Feature',
              'http://webprotege.stanford.edu/RkKVruwOD8lCCdsbyX0lwY': 'Maintain Operate',
              'http://www.w3.org/2004/02/skos/core#comment': 'A Node can also be defined as a point in a network or diagram at which lines or pathways intersect or branch.',
              'http://www.w3.org/2004/02/skos/core#definition': 'A zero dimensional Entity with a position but no volume that is usually represented by a small round dot.',
            },
            rdfAbout: 'http://webprotege.stanford.edu/RBGK1EZogKmTJUyW3HfCU5t',
            rdfsLabel: 'Node',
            rdfsSubClassOf: [
              {
                classRdfAbout: 'http://webprotege.stanford.edu/RB6vzK57zLwceWuRwWA1usg',
                owlRestriction: null,
              },
            ],
            skosComment: 'A Node can also be defined as a point in a network or diagram at which lines or pathways intersect or branch.',
            skosDefinition: 'A zero dimensional Entity with a position but no volume that is usually represented by a small round dot.',
            skosExample: null,
          },
        },
      ],
      [
        'availableEdgesNormalised',
        {
          'http://webprotege.stanford.edu/RqeoNxhIUKNWDOrBxWFusJ___http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw___http://webprotege.stanford.edu/RBB5dovsXWSPzlLSNMC5gyd': {
            edgeId: 'http://webprotege.stanford.edu/RqeoNxhIUKNWDOrBxWFusJ',
            from: 'http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw',
            fromLabel: 'Polyline',
            id: 'http://webprotege.stanford.edu/RqeoNxhIUKNWDOrBxWFusJ___http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw___http://webprotege.stanford.edu/RBB5dovsXWSPzlLSNMC5gyd',
            label: 'Composed of',
            to: 'http://webprotege.stanford.edu/RBB5dovsXWSPzlLSNMC5gyd',
            toLabel: 'Polyline',
          },
          'http://webprotege.stanford.edu/RqeoNxhIUKNWDOrBxWFusJ___http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw___http://webprotege.stanford.edu/RBGK1EZogKmTJUyW3HfCU5t': {
            edgeId: 'http://webprotege.stanford.edu/RqeoNxhIUKNWDOrBxWFusJ',
            from: 'http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw',
            fromLabel: 'Polyline',
            id: 'http://webprotege.stanford.edu/RqeoNxhIUKNWDOrBxWFusJ___http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw___http://webprotege.stanford.edu/RBGK1EZogKmTJUyW3HfCU5t',
            label: 'Composed of',
            to: 'http://webprotege.stanford.edu/RBGK1EZogKmTJUyW3HfCU5t',
            toLabel: 'Polyline',
          },
        },
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
        },
      ],
      [
        'physicsRepulsion',
        false,
      ],

    ])
  })
})
