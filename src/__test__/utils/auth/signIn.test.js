import signIn from '../../../utils/auth/signIn'
import httpCall from '../../../utils/apiCalls/httpCall'
import showNotification from '../../../utils/notifications/showNotification'
import { AUTH_COOKIE } from '../../../constants/auth'
import { OPERATION_TYPE_UPDATE } from '../../../constants/store'

jest.useFakeTimers()

jest.mock('../../../utils/apiCalls/httpCall')
jest.mock('../../../utils/notifications/showNotification')

describe('signIn', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should catch error', async () => {
    const push = jest.fn()
    const router = { push }

    const updateStoreValue = jest.fn()
    const email = 'test@test.com'
    const password = 'test'
    const setShowError = jest.fn()
    const t = jest.fn()

    httpCall.mockImplementationOnce(() => ({
      error: 'serverError'
    }))

    await signIn({
      router,
      updateStoreValue,
      email,
      password,
      setShowError,
      t
    })

    expect(showNotification).toHaveBeenCalledWith(
      { message: 'serverError', type: 'warning' }
    )
    expect(setShowError).toHaveBeenCalledWith(true)
  })

  it('should work correctly', async () => {
    const push = jest.fn()
    const router = { push }

    const updateStoreValue = jest.fn()
    const email = 'test@test.com'
    const password = 'test'
    const token = '12345'
    const setShowError = jest.fn()
    const t = jest.fn()

    httpCall.mockImplementationOnce(() => ({
      data: {
        token
      }
    }))

    const setItem = jest.fn()

    Storage.prototype.setItem = setItem

    await signIn({
      router,
      updateStoreValue,
      email,
      password,
      setShowError,
      t
    })

    expect(updateStoreValue.mock.calls).toEqual(
      [[['user', 'email'], OPERATION_TYPE_UPDATE,
        'test@test.com'], [
        ['user', 'token'], OPERATION_TYPE_UPDATE, '12345']]
    )
    expect(push).toHaveBeenCalledWith('/')
    expect(setItem).toHaveBeenCalledWith(
      AUTH_COOKIE, JSON.stringify({ email, token })
    )
  })
})
