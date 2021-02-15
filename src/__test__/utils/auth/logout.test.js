import { AUTH_COOKIE } from '../../../constants/auth'
import { ROUTE_LOGIN } from '../../../constants/routes'
import logout from '../../../utils/auth/logout'

describe('logout', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const push = jest.fn()
    const router = { push }
    const setStoreState = jest.fn()

    const removeItem = jest.fn()

    Storage.prototype.removeItem = removeItem

    await logout({
      router,
      setStoreState
    })

    expect(setStoreState).toHaveBeenCalledWith(
      'user', {
        email: '',
        firstName: '',
        lastName: '',
        company: '',
        isGuest: false
      }
    )

    expect(removeItem).toHaveBeenCalledWith(AUTH_COOKIE)
    expect(push).toHaveBeenCalledWith(
      ROUTE_LOGIN
    )
  })
})
