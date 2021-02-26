import axios from 'axios'
import signIn from '../../../utils/auth/signIn'

jest.useFakeTimers()

describe('signIn', () => {
  afterEach(() => {
    jest.clearAllMocks()
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

    axios.post = jest.fn().mockImplementationOnce(() => ({
      status: 200,
      data: {
        token
      }
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

    expect(setStoreState).toHaveBeenCalledWith(
      'loading', true
    )

    expect(addToObject).toHaveBeenCalledWith('user', 'email', email)
  })
})
