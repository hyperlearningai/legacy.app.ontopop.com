import httpCall from '../../../utils/apiCalls/httpCall'
import en from '../../../i18n/en'
import updateNetworkStyling from '../../../utils/networkStyling/updateNetworkStyling'
import showNotification from '../../../utils/notifications/showNotification'

const addNumber = jest.fn()
const t = (id) => en[id]
jest.mock('../../../utils/apiCalls/httpCall')
jest.mock('../../../utils/notifications/showNotification')

describe('updateNetworkStyling', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when error', async () => {
    httpCall.mockImplementationOnce(() => ({ error: true }))

    await updateNetworkStyling({
      stylingJSON: '{"globalNodeStyling":{"stylingNodeSize":25,"stylingNodeBorder":1,"stylingNodeTextColor":"#000000"}}',
      addNumber,
      t
    })

    expect(showNotification).toHaveBeenCalledWith(
      { message: 'Could not update styles!', type: 'warning' }
    )
  })
})
