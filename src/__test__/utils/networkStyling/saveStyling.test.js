/* eslint max-len:0 */
import saveStyling from '../../../utils/networkStyling/saveStyling'
import store from '../../../store'
import { NODE_TEXT_COLOR } from '../../../constants/graph'
import updateNetworkStyling from '../../../utils/networkStyling/updateNetworkStyling'

jest.mock('../../../utils/nodesEdgesUtils/getNodeIds')
jest.mock('../../../utils/nodesEdgesUtils/updateNodes')
jest.mock('../../../utils/networkStyling/updateNetworkStyling')

jest.useFakeTimers()

describe('saveStyling', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const updateStoreValue = jest.fn()
    const t = jest.fn()

    store.getState = jest.fn().mockImplementation(() => ({
      globalNodeStyling: {
        stylingNodeSize: 25,
        stylingNodeBorder: 1
      },
      userDefinedNodeStyling: {
        stylingNodeSize: 25,
        stylingNodeBorder: 1,
        stylingNodeTextColor: NODE_TEXT_COLOR,
        stylingNodeBorderSelected: 2
      }
    }))

    const setSaved = jest.fn()

    await saveStyling({
      setSaved,
      updateStoreValue,
      t
    })

    expect(setSaved).toHaveBeenCalledWith(true)

    expect(updateNetworkStyling).toHaveBeenCalledWith({
      updateStoreValue,
      stylingJSON: '{"globalNodeStyling":{"stylingNodeSize":25,"stylingNodeBorder":1},"userDefinedNodeStyling":{"stylingNodeSize":25,"stylingNodeBorder":1,"stylingNodeTextColor":"#000000","stylingNodeBorderSelected":2}}',
      t
    })

    expect(setTimeout).toHaveBeenCalledWith(
      expect.any(Function), 5000
    )
  })
})
