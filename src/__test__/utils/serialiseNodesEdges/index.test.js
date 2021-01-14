import serialiseNodesEdges from '../../../utils/serialiseNodesEdges'
import { triplesPerNode } from '../../fixtures/triplesPerNode'
import { OwlClasses } from '../../fixtures/test-ontology-classes.json'
import { OwlObjectProperties } from '../../fixtures/test-ontology-object-properties'
import { serialiseNodesEdges1 } from '../../fixtures/serialiseNodesEdges'

const setStoreState = jest.fn()

describe('serialiseNodesEdges', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const nodesIdsToDisplay = [
      'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
      'http://webprotege.stanford.edu/RCCNbe0sG8e3ngkdoP9cSl6',
      'http://webprotege.stanford.edu/RCxwL4b8LCMbVkVPEbOn78g',
      'http://webprotege.stanford.edu/R1CEYmOdNWhDr4n2yz9Lzf'
    ]

    const edgesIdsToDisplay = [
      'http://webprotege.stanford.edu/RC1zYYNqqFSlJxIKg4SdBTB',
      'http://webprotege.stanford.edu/RBXkLIHl4DLxgRus9nf68fU'
    ]

    const highlightedNodes = []

    await serialiseNodesEdges({
      nodesIdsToDisplay,
      edgesIdsToDisplay,
      classesFromApi: OwlClasses,
      objectPropertiesFromApi: OwlObjectProperties,
      setStoreState,
      triplesPerNode,
      highlightedNodes
      // edgesToIgnore,
      // deletedNodes,
    })

    expect(setStoreState.mock.calls).toEqual(serialiseNodesEdges1)
  })
})
