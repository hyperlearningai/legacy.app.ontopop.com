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
  classesFromApi: OwlClasses,
  objectPropertiesFromApi: OwlObjectProperties,
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

    expect(getAllTriplesPerNode).toHaveBeenCalledWith({
      classesIds: Object.keys(OwlClasses),
      predicatesIds: Object.keys(OwlObjectProperties),
      setStoreState,
      classesFromApi: OwlClasses
    })
    expect(setNodesIdsToDisplay).toHaveBeenCalledWith({
      type: ALGO_TYPE_FULL,
      setStoreState
    })
  })
})
