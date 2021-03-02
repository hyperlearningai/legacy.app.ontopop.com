import makeCustomQuery from '../../../utils/customQuery/makeCustomQuery'
import en from '../../../i18n/en'
import showNotification from '../../../utils/notifications/showNotification'
import store from '../../../store'
import httpCall from '../../../utils/apiCalls/httpCall'

jest.mock('../../../utils/notifications/showNotification')
jest.mock('../../../utils/apiCalls/httpCall')

const t = (id) => en[id]
const setStoreState = jest.fn()
const addToArray = jest.fn()

store.getState = jest.fn().mockImplementation(() => ({
  user: { token: 'ewj123' }
}))

describe('makeCustomQuery', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should catch error', async () => {
    httpCall.mockImplementationOnce(() => (
      { error: 'apiRequestError' }
    ))

    const customQueryString = ''

    await makeCustomQuery({
      customQueryString,
      setStoreState,
      addToArray,
      t
    })

    expect(showNotification).toHaveBeenCalledWith({
      message: 'Could not query graph!',
      type: 'warning'
    })
    expect(addToArray).toHaveBeenCalledWith(
      'customQueryStringHistory', '', { alwaysAdd: true }
    )
    expect(setStoreState.mock.calls).toEqual(
      [
        ['customQueryFromLatestOutput',
          '',
        ],
      ]
    )
  })

  it('should return data', async () => {
    const customQueryString = 'q.E()'

    httpCall.mockImplementationOnce(() => ({
      data: {
        owlClassMap: [],
        owlObjectPropertyMap: []
      }
    }))

    await makeCustomQuery({
      customQueryString,
      setStoreState,
      addToArray,
      t
    })

    expect(addToArray).toHaveBeenCalledWith(
      'customQueryStringHistory', 'q.E()', { alwaysAdd: true }
    )
    expect(setStoreState.mock.calls).toEqual(
      [
        [
          'customQueryFromLatestOutput',
          '',
        ],
        [
          'customQueryFromLatestOutput',
          'q.E()',
        ],
        [
          'customQueryOutput',
          {
            owlClassMap: [],
            owlObjectPropertyMap: [],
          },
        ],
      ]
    )
  })
})
