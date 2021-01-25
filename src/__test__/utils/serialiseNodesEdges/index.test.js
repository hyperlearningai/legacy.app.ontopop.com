import { DataSet } from 'vis-data'
import serialiseNodesEdges from '../../../utils/serialiseNodesEdges'
import { triplesPerNode } from '../../fixtures/triplesPerNode'
import { OwlClasses } from '../../fixtures/test-ontology-classes.json'
import { OwlObjectProperties } from '../../fixtures/test-ontology-object-properties'
import { serialiseNodesEdges1 } from '../../fixtures/serialiseNodesEdges'
import store from '../../../store'

const setStoreState = jest.fn()

const availableNodes = new DataSet([])
const availableEdges = new DataSet([])
const isNodeOverlay = true
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
const paths = []
const classesFromApi = OwlClasses
const objectPropertiesFromApi = OwlObjectProperties
const redraw = jest.fn()
const network = {
  redraw
}
const getState = jest.fn().mockImplementation(() => ({
  availableNodes,
  availableEdges,
  classesFromApi,
  edgesIdsToDisplay,
  highlightedNodes,
  isNodeOverlay,
  network,
  nodesIdsToDisplay,
  objectPropertiesFromApi,
  paths,
  triplesPerNode,
}))

store.getState = getState

describe('serialiseNodesEdges', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    await serialiseNodesEdges({
      setStoreState
    })

    expect(setStoreState.mock.calls).toEqual(serialiseNodesEdges1)
    expect(redraw).toHaveBeenCalled()
  })
})
