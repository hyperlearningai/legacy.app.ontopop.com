import { DataSet } from 'vis-data'
import addElementsToGraph from '../../../utils/graphVisualisation/addElementsToGraph'
import { triplesPerNode } from '../../fixtures/triplesPerNode'
import { OwlClasses } from '../../fixtures/test-ontology-classes.json'
import { OwlObjectProperties } from '../../fixtures/test-ontology-object-properties'
import { graphVisualisationResults } from '../../fixtures/graphVisualisationResults'
import store from '../../../store'
import setElementsStyle from '../../../utils/graphVisualisation/setElementsStyle'

jest.mock('../../../utils/graphVisualisation/setElementsStyle')
const setStoreState = jest.fn()

const availableNodes = new DataSet()
const availableEdges = new DataSet()
const stylingNodeCaptionProperty = 'rdfsLabel'
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

const classesFromApi = OwlClasses
const objectPropertiesFromApi = OwlObjectProperties

const getState = jest.fn().mockImplementation(() => ({
  availableNodes,
  availableEdges,
  classesFromApi,
  edgesIdsToDisplay,
  nodesIdsToDisplay,
  objectPropertiesFromApi,
  triplesPerNode,
  stylingNodeCaptionProperty,
}))

store.getState = getState

describe('addElementsToGraph', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    await addElementsToGraph({
      setStoreState
    })

    expect(setStoreState.mock.calls).toEqual(graphVisualisationResults)
    expect(setElementsStyle).toHaveBeenCalledWith({
      setStoreState
    })
  })
})
