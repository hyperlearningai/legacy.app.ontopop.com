import makeCustomQuery from '../../../utils/customQuery/makeCustomQuery'
import en from '../../../i18n/en'
import showNotification from '../../../utils/notifications/showNotification'
import store from '../../../store'
import httpCall from '../../../utils/apiCalls/httpCall'
import { OPERATION_TYPE_PUSH, OPERATION_TYPE_UPDATE } from '../../../constants/store'

jest.mock('../../../utils/notifications/showNotification')
jest.mock('../../../utils/apiCalls/httpCall')

const t = (id) => en[id]
const updateStoreValue = jest.fn()
const setLoader = jest.fn()

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
      updateStoreValue,
      setLoader,
      t
    })

    expect(showNotification).toHaveBeenCalledWith({
      message: 'Could not query graph!',
      type: 'warning'
    })

    expect(setLoader.mock.calls).toEqual(
      [[true], [false]]
    )
    expect(updateStoreValue.mock.calls).toEqual(
      [[['customQueryFromLatestOutput'], OPERATION_TYPE_UPDATE, ''], [['customQueryStringHistory'], OPERATION_TYPE_PUSH, '']]
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
      updateStoreValue,
      setLoader,
      t
    })

    expect(setLoader.mock.calls).toEqual(
      [[true], [false]]
    )
    expect(updateStoreValue.mock.calls).toEqual(
      [[['customQueryFromLatestOutput'], OPERATION_TYPE_UPDATE, ''], [
        ['customQueryStringHistory'], OPERATION_TYPE_PUSH, 'q.E()'], [
        ['customQueryFromLatestOutput'], 'update', 'q.E()'], [
        ['customQueryOutput'], OPERATION_TYPE_UPDATE, { owlClassMap: [], owlObjectPropertyMap: [] }]]
    )
  })
})
