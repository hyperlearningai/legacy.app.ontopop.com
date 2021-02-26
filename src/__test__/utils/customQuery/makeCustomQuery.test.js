import axios from 'axios'
import makeCustomQuery from '../../../utils/customQuery/makeCustomQuery'
import en from '../../../i18n/en'
import showNotification from '../../../utils/notifications/showNotification'
import store from '../../../store'

jest.mock('../../../utils/notifications/showNotification')

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
    axios.post = jest.fn().mockImplementationOnce(() => new Error('error'))

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
        ['loading', true],
        ['customQueryFromLatestOutput',
          '',
        ],
        ['loading', false],
      ]
    )
  })

  it('should return error if status 400 and no data', async () => {
    const customQueryString = 'q.V()'

    axios.post = jest.fn().mockImplementationOnce(() => ({
      status: 400,
    }))

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
      'customQueryStringHistory', 'q.V()', { alwaysAdd: true }
    )
    expect(setStoreState.mock.calls).toEqual(
      [['loading', true],
        ['customQueryFromLatestOutput',
          '',
        ],
        ['loading', false]]
    )
  })

  it('should return data', async () => {
    const customQueryString = 'q.E()'

    axios.post = jest.fn().mockImplementationOnce(() => ({
      status: 200,
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
        ['loading', true],
        [
          'customQueryFromLatestOutput',
          '',
        ],
        ['loading', false],
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
