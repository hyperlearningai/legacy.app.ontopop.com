import getEnumeration from '../../../utils/graphSearch/getEnumeration'
import showNotification from '../../../utils/notifications/showNotification'
import httpCall from '../../../utils/apiCalls/httpCall'
import en from '../../../i18n/en'

const setSuggestions = jest.fn()
const t = (id) => en[id]
const updateStoreValue = jest.fn()
const query = 'road'

jest.mock('../../../utils/notifications/showNotification')
jest.mock('../../../utils/apiCalls/httpCall')

describe('getEnumeration', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should catch error', async () => {
    httpCall.mockImplementation(() => (
      { error: 'apiRequestError' }
    ))

    await getEnumeration({
      property: 'name',
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
      data: [
        'road',
        'network'
      ]
    }))

    await getEnumeration({
      property: 'name',
      setSuggestions,
      updateStoreValue,
      t
    })

    expect(setSuggestions).toHaveBeenCalledWith(
      [{
        label: 'road',
        value: 'road'
      }, {
        label: 'network',
        value: 'network'
      }]
    )
  })

  it('should work correctly when no suggestions returned', async () => {
    httpCall.mockImplementation(() => ({
      data: {
        value: []
      }
    }))

    await getEnumeration({
      query,
      suggestions: [],
      setSuggestions,
      updateStoreValue,
      t
    })

    expect(setSuggestions).toHaveBeenCalledTimes(0)
  })
})
