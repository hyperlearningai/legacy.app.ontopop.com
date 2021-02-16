import getPasswordReset from '../../../utils/auth/getPasswordReset'

jest.useFakeTimers()

describe('getPasswordReset', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const router = jest.fn()

    const t = jest.fn()
    const setStoreState = jest.fn()
    const email = 'test@test.com'

    await getPasswordReset({
      email,
      router,
      setStoreState,
      t
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
