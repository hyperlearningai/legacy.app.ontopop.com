import signIn from '../../../utils/auth/signIn'

jest.useFakeTimers()

describe('signIn', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const router = jest.fn()

    const addToObject = jest.fn()
    const setStoreState = jest.fn()
    const email = 'test@test.com'
    const password = 'test'
    const setShowError = jest.fn()

    await signIn({
      router,
      addToObject,
      setStoreState,
      email,
      password,
      setShowError
    })

    expect(setStoreState).toHaveBeenCalledWith(
      'loading', true
    )
    expect(setTimeout).toHaveBeenCalledWith(
      expect.any(Function),
      3000
    )
  })
})
