import signIn from '../../../utils/auth/signIn'
import httpCall from '../../../utils/apiCalls/httpCall'
import showNotification from '../../../utils/notifications/showNotification'
import { AUTH_COOKIE } from '../../../constants/auth'

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

    const addToObject = jest.fn()
    const setStoreState = jest.fn()
    const email = 'test@test.com'
    const password = 'test'
    const setShowError = jest.fn()
    const t = jest.fn()

    httpCall.mockImplementationOnce(() => ({
      error: 'serverError'
    }))

    await signIn({
      router,
      addToObject,
      setStoreState,
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

    const addToObject = jest.fn()
    const setStoreState = jest.fn()
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
      addToObject,
      setStoreState,
      email,
      password,
      setShowError,
      t
    })

    expect(addToObject).toHaveBeenCalledWith('user', 'email', email)
    expect(push).toHaveBeenCalledWith('/')
    expect(setItem).toHaveBeenCalledWith(
      AUTH_COOKIE, JSON.stringify({ email, token })
    )
  })
})
