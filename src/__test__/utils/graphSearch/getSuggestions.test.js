import getSuggestions from '../../../utils/graphSearch/getSuggestions'
import showNotification from '../../../utils/notifications/showNotification'
import httpCall from '../../../utils/apiCalls/httpCall'
import en from '../../../i18n/en'

const setSuggestions = jest.fn()
const t = (id) => en[id]
const updateStoreValue = jest.fn()
const query = 'road'

jest.mock('../../../utils/notifications/showNotification')
jest.mock('../../../utils/apiCalls/httpCall')

describe('getSuggestions', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should equal false if short query', () => {
    httpCall.mockImplementation(() => (
      { error: 'apiRequestError' }
    ))

    getSuggestions({
      query: 'ro',
      setSuggestions,
      updateStoreValue,
      t
    })

    expect(setSuggestions).toHaveBeenCalledTimes(0)
  })

  it('should catch error', async () => {
    httpCall.mockImplementation(() => (
      { error: 'apiRequestError' }
    ))

    await getSuggestions({
      query,
      setSuggestions,
      updateStoreValue,
      t
    })

    expect(showNotification).toHaveBeenCalledWith({
      message: 'Could not get suggested terms',
      type: 'warning'
    })
  })

  it('should work correctly', async () => {
    httpCall.mockImplementation(() => ({
      data: {
        value: [{
          queryPlusText: 'roadside operational',
          text: 'roadside operational'
        }]
      }
    }))

    await getSuggestions({
      query,
      setSuggestions,
      updateStoreValue,
      t
    })

    expect(setSuggestions).toHaveBeenCalledWith(
      [{
        label: 'road',
        value: 'road'
      }, {
        label: 'roadside operational',
        value: 'roadside operational'
      }]
    )
  })

  it('should work correctly when no suggestions returned', async () => {
    httpCall.mockImplementation(() => ({
      data: {
        value: []
      }
    }))

    await getSuggestions({
      query,
      setSuggestions,
      updateStoreValue,
      t
    })

    expect(setSuggestions).toHaveBeenCalledWith(
      [{
        label: 'road',
        value: 'road'
      }]
    )
  })
})
