import httpCall from '../../../utils/apiCalls/httpCall'
import en from '../../../i18n/en'
import getNetworkStyling from '../../../utils/networkStyling/getNetworkStyling'
import showNotification from '../../../utils/notifications/showNotification'

const addNumber = jest.fn()
const t = (id) => en[id]
jest.mock('../../../utils/apiCalls/httpCall')
jest.mock('../../../utils/notifications/showNotification')

describe('getNetworkStyling', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when error', async () => {
    httpCall.mockImplementationOnce(() => ({ error: true }))

    await getNetworkStyling({
      addNumber,
      t
    })

    expect(showNotification).toHaveBeenCalledWith(
      { message: 'Could not query styles!', type: 'warning' }
    )
  })

  it('should return data', async () => {
    httpCall.mockImplementationOnce(() => ({
      data: {
        configuration: {
          globalNodeStyling: {
            stylingNodeSize: 25,
            stylingNodeBorder: 1,
            stylingNodeTextColor: '#000000'
          }
        }
      }
    }))

    const result = await getNetworkStyling({
      addNumber,
      t
    })

    expect(result).toStrictEqual({
      globalNodeStyling: {
        stylingNodeSize: 25,
        stylingNodeBorder: 1,
        stylingNodeTextColor: '#000000'
      }
    })
  })
})
