/* eslint max-len:0 */
import setGraphData from '../../../utils/graphVisualisation/setGraphData'
import setNodesIdsToDisplay from '../../../utils/graphVisualisation/setNodesIdsToDisplay'
import { ALGO_TYPE_FULL } from '../../../constants/algorithms'

jest.mock('../../../utils/graphVisualisation/setNodesIdsToDisplay')
const setStoreState = jest.fn()

describe('setGraphData', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    await setGraphData({
      setStoreState
    })

    expect(setNodesIdsToDisplay).toHaveBeenCalledWith({
      type: ALGO_TYPE_FULL,
      setStoreState
    })
  })
})
