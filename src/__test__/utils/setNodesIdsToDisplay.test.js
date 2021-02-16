import {
  ALGO_TYPE_FULL,
  ALGO_TYPE_NEIGHBOURHOOD,
  ALGO_TYPE_SHORTEST_PATH,
  ALGO_TYPE_BOUNDING_BOX,
  ALGO_TYPE_NODES_FILTER,
  ALGO_TYPE_EDGES_FILTER
} from '../../constants/algorithms'
import setNodesIdsToDisplay from '../../utils/setNodesIdsToDisplay'
import { OwlClasses } from '../fixtures/test-ontology-classes.json'
import { OwlObjectProperties } from '../fixtures/test-ontology-object-properties.json'
import { algoTypeFull } from '../fixtures/setNodesIdsToDisplayResults'
import { triplesPerNode } from '../fixtures/triplesPerNode'
import store from '../../store'
import { availableNodes } from '../fixtures/availableNodesNormalised'
import { availableEdges } from '../fixtures/availableEdgesNormalised'

const setStoreState = jest.fn()
const classesFromApi = OwlClasses
const objectPropertiesFromApi = OwlObjectProperties
const getState = jest.fn().mockImplementation(() => ({
  classesFromApi,
  objectPropertiesFromApi,
  deletedNodes: [],
  availableNodes,
  availableEdges,
  triplesPerNode,
  nodesIdsToDisplay: [
    'http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw'
  ],
  shortestPathResults: [
    'http://webprotege.stanford.edu/RDElsJe5LORtLxEeWbSDg6|||http://www.w3.org/2000/01/rdf-schema#subclassof___http://webprotege.stanford.edu/RDElsJe5LORtLxEeWbSDg6___http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY|||http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp___http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY___http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ|||http://webprotege.stanford.edu/R7cbyWVOLsYCR1NFY11TBjJ___http://webprotege.stanford.edu/R7aUPF2nCTl0LhxRiIVdzpc___http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ|||http://webprotege.stanford.edu/RC0fF4cbTcg59fvYtEu1FF0___http://webprotege.stanford.edu/R7aUPF2nCTl0LhxRiIVdzpc___http://webprotege.stanford.edu/RJ4FstTjtD6dNQx4agULMp|||http://webprotege.stanford.edu/RC0fF4cbTcg59fvYtEu1FF0___http://webprotege.stanford.edu/RmVBgJPMOQ5Amchla0VZUw___http://webprotege.stanford.edu/RJ4FstTjtD6dNQx4agULMp|||http://www.w3.org/2000/01/rdf-schema#subclassof___http://webprotege.stanford.edu/ReVBAW9BDkF6kpl6UmYCrZ___http://webprotege.stanford.edu/RmVBgJPMOQ5Amchla0VZUw'
  ]
}))

store.getState = getState

describe('setNodesIdsToDisplay', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when ALGO_TYPE_FULL', async () => {
    const type = ALGO_TYPE_FULL

    await setNodesIdsToDisplay({
      type,
      setStoreState,
      options: {}
    })

    expect(setStoreState.mock.calls).toEqual(algoTypeFull)
  })

  it('should work correctly when ALGO_TYPE_BOUNDING_BOX', async () => {
    const type = ALGO_TYPE_BOUNDING_BOX

    const options = {
      selectedBoundingBoxNodes: [{ id: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY' }],
    }

    await setNodesIdsToDisplay({
      type,
      setStoreState,
      options
    })

    expect(setStoreState.mock.calls).toEqual([
      [
        'highlightedNodes',
        [],
      ],
      [
        'isNodeOverlay',
        false,
      ],
      [
        'highlightedNodes',
        [],
      ],
      [
        'edgesIdsToDisplay',
        [],
      ],
      [
        'nodesIdsToDisplay',
        [
          'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
        ],
      ],
    ])
  })

  it('should work correctly when ALGO_TYPE_NEIGHBOURHOOD', async () => {
    const type = ALGO_TYPE_NEIGHBOURHOOD

    const options = {
      selectedNodeId: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
      separationDegree: 1,
      triplesPerNode
    }

    await setNodesIdsToDisplay({
      type,
      setStoreState,
      options
    })

    expect(setStoreState.mock.calls).toEqual([
      [
        'highlightedNodes',
        [],
      ],
      [
        'isNodeOverlay',
        false,
      ],
      [
        'highlightedNodes',
        [
          'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
        ],
      ],
      [
        'edgesIdsToDisplay',
        [
          'http://www.w3.org/2000/01/rdf-schema#subclassof',
          'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
          'http://webprotege.stanford.edu/RBouRer6kTdZCfCZ4kpk7K3',
        ],
      ],
      [
        'nodesIdsToDisplay',
        [
          'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
          'http://webprotege.stanford.edu/RDLUE0UQz6th3NduA1L3n3u',
          'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
          'http://webprotege.stanford.edu/R83VJMr2iUDDav8mz3n6ZyH',
          'http://webprotege.stanford.edu/R9UuC5ptRevqURhJa0PIBmB',
          'http://webprotege.stanford.edu/R9Y5iEV0xhBtSZMrtzLdmwd',
          'http://webprotege.stanford.edu/RDElsJe5LORtLxEeWbSDg6',
          'http://webprotege.stanford.edu/RYOFagzdcydXMf8mlO9vsG',
          'http://webprotege.stanford.edu/Rhx4iGF2ITGgrmcS2fHAN5',
          'http://webprotege.stanford.edu/RmrjgvX01FgGHXkfTXE4MO',
        ],
      ],
    ])
  })

  it('should work correctly when ALGO_TYPE_SHORTEST_PATH', async () => {
    const type = ALGO_TYPE_SHORTEST_PATH

    const options = {
      shortestPathSelectedNodes: [
        'http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw',
        'http://webprotege.stanford.edu/R8PzvuuoJlhu0qdom6r1qRQ'
      ],
      shortestPathResults: [
        'http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw|||http://webprotege.stanford.edu/RqeoNxhIUKNWDOrBxWFusJ___http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw___http://webprotege.stanford.edu/RBGK1EZogKmTJUyW3HfCU5t|||http://webprotege.stanford.edu/RqeoNxhIUKNWDOrBxWFusJ___http://webprotege.stanford.edu/RBIjxceqTozVOeG26dY0Msm___http://webprotege.stanford.edu/RBGK1EZogKmTJUyW3HfCU5t|||http://webprotege.stanford.edu/R7hoT86zDXtTKlGVmxqJRio___http://webprotege.stanford.edu/RBcXX4d5QQiXpD9Uvmk1E7D___http://webprotege.stanford.edu/RBIjxceqTozVOeG26dY0Msm|||http://webprotege.stanford.edu/RDgkQlvQbb2skaXpfhIEAp8___http://webprotege.stanford.edu/RBcXX4d5QQiXpD9Uvmk1E7D___http://webprotege.stanford.edu/R3WvW1lERMZ6UCSsaAdkx1|||http://webprotege.stanford.edu/R7uRVbFaeQ4xCgAEayawrZ3___http://webprotege.stanford.edu/R3WvW1lERMZ6UCSsaAdkx1___http://webprotege.stanford.edu/RDUwHG4VnwQTyDDhhsWSwgS|||http://webprotege.stanford.edu/R7uRVbFaeQ4xCgAEayawrZ3___http://webprotege.stanford.edu/R8PzvuuoJlhu0qdom6r1qRQ___http://webprotege.stanford.edu/RDUwHG4VnwQTyDDhhsWSwgS'
      ],
      isNodeOverlay: true
    }

    await setNodesIdsToDisplay({
      type,
      setStoreState,
      options
    })

    expect(setStoreState.mock.calls).toEqual([
      [
        'highlightedNodes',
        [],
      ],
      [
        'isNodeOverlay',
        false,
      ],
      [
        'shortestPathResults',
        [
          'http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw|||http://webprotege.stanford.edu/RqeoNxhIUKNWDOrBxWFusJ___http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw___http://webprotege.stanford.edu/RBGK1EZogKmTJUyW3HfCU5t|||http://webprotege.stanford.edu/RqeoNxhIUKNWDOrBxWFusJ___http://webprotege.stanford.edu/RBIjxceqTozVOeG26dY0Msm___http://webprotege.stanford.edu/RBGK1EZogKmTJUyW3HfCU5t|||http://webprotege.stanford.edu/R7hoT86zDXtTKlGVmxqJRio___http://webprotege.stanford.edu/RBcXX4d5QQiXpD9Uvmk1E7D___http://webprotege.stanford.edu/RBIjxceqTozVOeG26dY0Msm|||http://webprotege.stanford.edu/RDgkQlvQbb2skaXpfhIEAp8___http://webprotege.stanford.edu/RBcXX4d5QQiXpD9Uvmk1E7D___http://webprotege.stanford.edu/R3WvW1lERMZ6UCSsaAdkx1|||http://webprotege.stanford.edu/R7uRVbFaeQ4xCgAEayawrZ3___http://webprotege.stanford.edu/R3WvW1lERMZ6UCSsaAdkx1___http://webprotege.stanford.edu/RDUwHG4VnwQTyDDhhsWSwgS|||http://webprotege.stanford.edu/R7uRVbFaeQ4xCgAEayawrZ3___http://webprotege.stanford.edu/R8PzvuuoJlhu0qdom6r1qRQ___http://webprotege.stanford.edu/RDUwHG4VnwQTyDDhhsWSwgS',
        ],
      ],
      [
        'isNodeOverlay',
        true,
      ],
      [
        'highlightedNodes',
        [
          'http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw',
          'http://webprotege.stanford.edu/R8PzvuuoJlhu0qdom6r1qRQ',
        ],
      ],
      [
        'nodesIdsToDisplay',
        [
          'http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw',
        ],
      ],
    ])
  })

  it('should work correctly when ALGO_TYPE_SHORTEST_PATH and no overlay', async () => {
    const type = ALGO_TYPE_SHORTEST_PATH

    const options = {
      shortestPathSelectedNodes: [
        'http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw',
        'http://webprotege.stanford.edu/R8PzvuuoJlhu0qdom6r1qRQ'
      ],
      shortestPathResults: [
        'http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw|||http://webprotege.stanford.edu/RqeoNxhIUKNWDOrBxWFusJ___http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw___http://webprotege.stanford.edu/RBGK1EZogKmTJUyW3HfCU5t|||http://webprotege.stanford.edu/RqeoNxhIUKNWDOrBxWFusJ___http://webprotege.stanford.edu/RBIjxceqTozVOeG26dY0Msm___http://webprotege.stanford.edu/RBGK1EZogKmTJUyW3HfCU5t|||http://webprotege.stanford.edu/R7hoT86zDXtTKlGVmxqJRio___http://webprotege.stanford.edu/RBcXX4d5QQiXpD9Uvmk1E7D___http://webprotege.stanford.edu/RBIjxceqTozVOeG26dY0Msm|||http://webprotege.stanford.edu/RDgkQlvQbb2skaXpfhIEAp8___http://webprotege.stanford.edu/RBcXX4d5QQiXpD9Uvmk1E7D___http://webprotege.stanford.edu/R3WvW1lERMZ6UCSsaAdkx1|||http://webprotege.stanford.edu/R7uRVbFaeQ4xCgAEayawrZ3___http://webprotege.stanford.edu/R3WvW1lERMZ6UCSsaAdkx1___http://webprotege.stanford.edu/RDUwHG4VnwQTyDDhhsWSwgS|||http://webprotege.stanford.edu/R7uRVbFaeQ4xCgAEayawrZ3___http://webprotege.stanford.edu/R8PzvuuoJlhu0qdom6r1qRQ___http://webprotege.stanford.edu/RDUwHG4VnwQTyDDhhsWSwgS'
      ],
      isNodeOverlay: false
    }

    await setNodesIdsToDisplay({
      type,
      setStoreState,
      options
    })

    expect(setStoreState.mock.calls).toEqual([
      [
        'highlightedNodes',
        [],
      ],
      [
        'isNodeOverlay',
        false,
      ],
      [
        'shortestPathResults',
        [
          'http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw|||http://webprotege.stanford.edu/RqeoNxhIUKNWDOrBxWFusJ___http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw___http://webprotege.stanford.edu/RBGK1EZogKmTJUyW3HfCU5t|||http://webprotege.stanford.edu/RqeoNxhIUKNWDOrBxWFusJ___http://webprotege.stanford.edu/RBIjxceqTozVOeG26dY0Msm___http://webprotege.stanford.edu/RBGK1EZogKmTJUyW3HfCU5t|||http://webprotege.stanford.edu/R7hoT86zDXtTKlGVmxqJRio___http://webprotege.stanford.edu/RBcXX4d5QQiXpD9Uvmk1E7D___http://webprotege.stanford.edu/RBIjxceqTozVOeG26dY0Msm|||http://webprotege.stanford.edu/RDgkQlvQbb2skaXpfhIEAp8___http://webprotege.stanford.edu/RBcXX4d5QQiXpD9Uvmk1E7D___http://webprotege.stanford.edu/R3WvW1lERMZ6UCSsaAdkx1|||http://webprotege.stanford.edu/R7uRVbFaeQ4xCgAEayawrZ3___http://webprotege.stanford.edu/R3WvW1lERMZ6UCSsaAdkx1___http://webprotege.stanford.edu/RDUwHG4VnwQTyDDhhsWSwgS|||http://webprotege.stanford.edu/R7uRVbFaeQ4xCgAEayawrZ3___http://webprotege.stanford.edu/R8PzvuuoJlhu0qdom6r1qRQ___http://webprotege.stanford.edu/RDUwHG4VnwQTyDDhhsWSwgS',
        ],
      ],
      [
        'isNodeOverlay',
        false,
      ],
      [
        'highlightedNodes',
        [
          'http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw',
          'http://webprotege.stanford.edu/R8PzvuuoJlhu0qdom6r1qRQ',
        ],
      ],
      [
        'edgesIdsToDisplay',
        [
          'http://www.w3.org/2000/01/rdf-schema#subclassof',
          'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
          'http://webprotege.stanford.edu/R7cbyWVOLsYCR1NFY11TBjJ',
          'http://webprotege.stanford.edu/RC0fF4cbTcg59fvYtEu1FF0',
        ],
      ],
      [
        'nodesIdsToDisplay',
        [
          'http://webprotege.stanford.edu/RDElsJe5LORtLxEeWbSDg6',
          'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
          'http://webprotege.stanford.edu/RY4x5rU5jNH9YIcM63gBgJ',
          'http://webprotege.stanford.edu/R7aUPF2nCTl0LhxRiIVdzpc',
          'http://webprotege.stanford.edu/RJ4FstTjtD6dNQx4agULMp',
          'http://webprotege.stanford.edu/RmVBgJPMOQ5Amchla0VZUw',
          'http://webprotege.stanford.edu/ReVBAW9BDkF6kpl6UmYCrZ',
        ],
      ],
    ])
  })

  it('should work correctly when ALGO_TYPE_NODES_FILTER', async () => {
    const type = ALGO_TYPE_NODES_FILTER

    const options = {
      nodesFilters: [{
        property: 'rdfsLabel',
        value: 'road'
      }]
    }

    await setNodesIdsToDisplay({
      type,
      setStoreState,
      options
    })

    expect(setStoreState.mock.calls).toEqual([
      [
        'highlightedNodes',
        [],
      ],
      [
        'isNodeOverlay',
        false,
      ],
      [
        'nodesIdsToDisplay',
        [
          'http://webprotege.stanford.edu/R9H3QGGtwC0XhV4Mfk6Ceep',
          'http://webprotege.stanford.edu/RCOdkBizz0dWtRTEjZSfqP8',
          'http://webprotege.stanford.edu/RBBDxx5ZaIbg5ASqGAeyKGg',
          'http://webprotege.stanford.edu/Rigjqi5P4ZscabU1Pot3hK',
        ],
      ],
    ])
  })

  it('should work correctly when ALGO_TYPE_EDGES_FILTER', async () => {
    const type = ALGO_TYPE_EDGES_FILTER

    const options = {
      edgesFilters: [{
        property: 'rdfsLabel',
        value: 'comp'
      }]
    }

    await setNodesIdsToDisplay({
      type,
      setStoreState,
      options
    })

    expect(setStoreState.mock.calls).toEqual([
      [
        'highlightedNodes',
        [],
      ],
      [
        'isNodeOverlay',
        false,
      ],
      [
        'edgesIdsToDisplay',
        [
          'http://webprotege.stanford.edu/RBGj27xJbqpVePdpgjXqeVk',
          'http://webprotege.stanford.edu/RqeoNxhIUKNWDOrBxWFusJ',
        ],
      ],
      [
        'nodesIdsToDisplay',
        [
          'http://webprotege.stanford.edu/R2RFTG7iNuFjv3A8V7qHOb',
          'http://webprotege.stanford.edu/RB2wiyzebv6p4qrvJjgommU',
          'http://webprotege.stanford.edu/R7dcPTLwQrLcc9eK22R7swU',
          'http://webprotege.stanford.edu/RFNK6OsKMaap9LxxLXdLxR',
          'http://webprotege.stanford.edu/R7pIV91w7fTKppAHSmrz8n',
          'http://webprotege.stanford.edu/R81y0gnn3Ar0DJ8FatMTqK3',
          'http://webprotege.stanford.edu/RB6vzK57zLwceWuRwWA1usg',
          'http://webprotege.stanford.edu/R8M82pvFZ3JUmp6uMUwitfw',
          'http://webprotege.stanford.edu/RBGK1EZogKmTJUyW3HfCU5t',
          'http://webprotege.stanford.edu/RBB5dovsXWSPzlLSNMC5gyd',
          'http://webprotege.stanford.edu/Ree4nJbmBksWE1ufpmuUfp',
          'http://webprotege.stanford.edu/R8N1a0K78gZZbVLw2P1NkTX',
          'http://webprotege.stanford.edu/RCGrVyxcVdUB7rI7qGrKvTF',
          'http://webprotege.stanford.edu/R9H3QGGtwC0XhV4Mfk6Ceep',
          'http://webprotege.stanford.edu/RBIjxceqTozVOeG26dY0Msm',
          'http://webprotege.stanford.edu/RC714KfXzpEYi4lGyNUEbWI',
          'http://webprotege.stanford.edu/RBzF9qwVtyzz358WQ0Iaxjs',
          'http://webprotege.stanford.edu/RCdB5m1RZhhIcJM0SpRcJvn',
          'http://webprotege.stanford.edu/RnzPd3Edkzo3UTz2B80djl',
        ],
      ],
    ])
  })
})
