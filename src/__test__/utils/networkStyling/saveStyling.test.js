/* eslint max-len:0 */
import saveStyling from '../../../utils/networkStyling/saveStyling'
import store from '../../../store'
import { NODE_TEXT_COLOR } from '../../../constants/graph'
import updateNetworkStyling from '../../../utils/networkStyling/updateNetworkStyling'
import { STYLING_LS } from '../../../constants/localStorage'

jest.mock('../../../utils/nodesEdgesUtils/getNodeIds')
jest.mock('../../../utils/nodesEdgesUtils/updateNodes')
jest.mock('../../../utils/networkStyling/updateNetworkStyling')

const setItem = jest.fn()

describe('saveStyling', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly if guest user', async () => {
    const updateStoreValue = jest.fn()
    const t = jest.fn()
    Storage.prototype.setItem = setItem

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
      },
      user: { isGuest: true }
    }))

    const setSaved = jest.fn()

    await saveStyling({
      setSaved,
      updateStoreValue,
      t
    })

    expect(setSaved.mock.calls).toEqual([[true], [false]])

    expect(updateNetworkStyling).toHaveBeenCalledTimes(0)

    expect(setItem).toHaveBeenCalledWith(
      STYLING_LS,
      '{"globalNodeStyling":{"stylingNodeSize":25,"stylingNodeBorder":1},"userDefinedNodeStyling":{"stylingNodeSize":25,"stylingNodeBorder":1,"stylingNodeTextColor":"#000000","stylingNodeBorderSelected":2}}'
    )
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
      },
      user: { isGuest: false }
    }))

    const setSaved = jest.fn()

    await saveStyling({
      setSaved,
      updateStoreValue,
      t
    })

    expect(setSaved.mock.calls).toEqual([[true], [false]])

    expect(setItem).toHaveBeenCalledTimes(0)

    expect(updateNetworkStyling).toHaveBeenCalledWith({
      updateStoreValue,
      stylingJSON: '{"globalNodeStyling":{"stylingNodeSize":25,"stylingNodeBorder":1},"userDefinedNodeStyling":{"stylingNodeSize":25,"stylingNodeBorder":1,"stylingNodeTextColor":"#000000","stylingNodeBorderSelected":2}}',
      t
    })
  })
})
