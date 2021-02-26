import { DataSet } from 'vis-data'
import addElementsToGraph from '../../../utils/graphVisualisation/addElementsToGraph'
import { edgesPerNode } from '../../fixtures/edgesPerNodeNew'
import { classesFromApi } from '../../fixtures/classesFromApi'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import store from '../../../store'
import setElementsStyle from '../../../utils/networkStyling/setElementsStyle'

jest.mock('../../../utils/networkStyling/setElementsStyle')
const setStoreState = jest.fn()

const availableNodes = new DataSet()
const availableEdges = new DataSet()
const stylingNodeCaptionProperty = 'rdfsLabel'
const nodesIdsToDisplay = [
  '1',
  '170',
  '141'
]
const edgesIdsToDisplay = [
  '11',
  '12'
]

const getState = jest.fn().mockImplementation(() => ({
  availableNodes,
  availableEdges,
  classesFromApi,
  edgesIdsToDisplay,
  nodesIdsToDisplay,
  objectPropertiesFromApi,
  edgesPerNode,
  stylingNodeCaptionProperty,
  isPhysicsOn: false,
}))

store.getState = getState

jest.useFakeTimers()

describe('addElementsToGraph', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    await addElementsToGraph({
      setStoreState
    })

    expect(setStoreState.mock.calls).toEqual(
      [['availableNodesCount', 3],
        ['availableEdgesCount', 2],
        ['nodesEdges', {
          1: [
            '11',
            '12',
          ],
          141: [
            '11',
          ],
          170: [
            '12',
          ],
        }],
        ['isPhysicsOn', true]]
    )
    expect(setElementsStyle).toHaveBeenCalledWith()
    expect(setTimeout).toHaveBeenCalledWith(
      expect.any(Function), 3000
    )
  })
})
