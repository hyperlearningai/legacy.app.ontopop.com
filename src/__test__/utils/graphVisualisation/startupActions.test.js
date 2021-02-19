import startupActions from '../../../utils/graphVisualisation/startupActions'
import getGraphData from '../../../utils/apiCalls/getGraphData'
import loadStyling from '../../../utils/networkStyling/loadStyling'
import getNodeProperties from '../../../utils/apiCalls/getNodeProperties'

jest.mock('../../../utils/networkStyling/loadStyling')
jest.mock('../../../utils/apiCalls/getNodeProperties')
jest.mock('../../../utils/apiCalls/getGraphData')

const setStoreState = jest.fn()
const t = jest.fn()

describe('startupActions', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    await startupActions({
      setStoreState,
      t
    })

    expect(loadStyling).toHaveBeenCalledWith({
      setStoreState,
    })

    expect(getNodeProperties).toHaveBeenCalledWith({
      setStoreState,
      t
    })

    expect(getGraphData).toHaveBeenCalledWith({
      setStoreState,
      t
    })
  })
})
