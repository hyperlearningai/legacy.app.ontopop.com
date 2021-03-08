import startupActions from '../../../utils/graphVisualisation/startupActions'
import getGraphData from '../../../utils/apiCalls/getGraphData'
import loadStyling from '../../../utils/networkStyling/loadStyling'
import setNodesIdsToDisplay from '../../../utils/graphVisualisation/setNodesIdsToDisplay'
import { ALGO_TYPE_FULL } from '../../../constants/algorithms'

jest.mock('../../../utils/networkStyling/loadStyling')
jest.mock('../../../utils/apiCalls/getGraphData')
jest.mock('../../../utils/graphVisualisation/setNodesIdsToDisplay')

const setStoreState = jest.fn()
const addNumber = jest.fn()
const t = jest.fn()

describe('startupActions', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    await startupActions({
      addNumber,
      setStoreState,
      t
    })

    expect(loadStyling).toHaveBeenCalledWith({
      setStoreState,
    })

    expect(getGraphData).toHaveBeenCalledWith({
      addNumber,
      setStoreState,
      t
    })

    expect(setNodesIdsToDisplay).toHaveBeenCalledWith({
      type: ALGO_TYPE_FULL,
      setStoreState,
      t
    })
  })
})
