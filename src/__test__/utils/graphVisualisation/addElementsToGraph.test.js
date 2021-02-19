import { DataSet } from 'vis-data'
import addElementsToGraph from '../../../utils/graphVisualisation/addElementsToGraph'
import { triplesPerNode } from '../../fixtures/triplesPerNodeNew'
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
  triplesPerNode,
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
        ['nodesConnections', {
          1: [{
            from: 1,
            predicate: 11,
            to: 170
          }, {
            from: 1,
            predicate:
            12,
            to: 141
          }, {
            from: 1,
            predicate: 11,
            to: 170
          }, {
            from: 1,
            predicate:
            12,
            to: 141
          }],
          141: [{
            from: 1,
            predicate:
             12,
            to: 141
          }, {
            from: 1,
            predicate: 12,
            to: 141
          }],
          170: [{
            from: 1,
            predicate: 11,
            to: 170
          }, {
            from: 1,
            predicate: 11,
            to: 170
          }]
        }], ['edgesConnections', {
          11: [{
            from: 1,
            to: 170
          }, { from: 1, to: 170 }],
          12: [{
            from: 1,
            to: 141
          }, { from: 1, to: 141 }]
        }],
        ['isPhysicsOn', true]]
    )
    expect(setElementsStyle).toHaveBeenCalledWith()
    expect(setTimeout).toHaveBeenCalledWith(
      expect.any(Function), 3000
    )
  })
})
