/* eslint max-len:0 */
import setGraphData from '../../utils/setGraphData'
import getAllTriplesPerNode from '../../utils/getAllTriplesPerNode'
import setNodesIdsToDisplay from '../../utils/setNodesIdsToDisplay'
import { OwlObjectProperties } from '../fixtures/test-ontology-object-properties'
import { OwlClasses } from '../fixtures/test-ontology-classes.json'
import { ALGO_TYPE_FULL } from '../../constants/algorithms'
import store from '../../store'

jest.mock('../../utils/getAllTriplesPerNode')
jest.mock('../../utils/setNodesIdsToDisplay')
const setStoreState = jest.fn()

const getState = jest.fn().mockImplementation(() => ({
  selectedGraphVersion: 'original',
  graphVersions: {
    original: {
      classesFromApi: OwlClasses,
      objectPropertiesFromApi: OwlObjectProperties,
      deletedNodes: [],
      addedNodes: [],
      updatedNodes: []
    }
  }
}))
store.getState = getState

describe('setGraphData', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    await setGraphData({
      setStoreState
    })

    expect(setStoreState.mock.calls).toEqual([
      [
        'classesFromApi', OwlClasses
      ],
      [
        'objectPropertiesFromApi', OwlObjectProperties
      ],
      [
        'deletedNodes',
        [],
      ],
      [
        'addedNodes',
        [],
      ],
      [
        'updatedNodes',
        [],
      ],
    ])
    expect(getAllTriplesPerNode).toHaveBeenCalledWith({
      classesIds: Object.keys(OwlClasses),
      predicatesIds: Object.keys(OwlObjectProperties),
      setStoreState,
      classesFromApi: OwlClasses
    })
    expect(setNodesIdsToDisplay).toHaveBeenCalledWith({
      type: ALGO_TYPE_FULL,
      classesFromApi: OwlClasses,
      objectPropertiesFromApi: OwlObjectProperties,
      setStoreState
    })
  })
})
