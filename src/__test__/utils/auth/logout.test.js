import { AUTH_COOKIE } from '../../../constants/auth'
import { ROUTE_LOGIN } from '../../../constants/routes'
import { OPERATION_TYPE_UPDATE } from '../../../constants/store'
import logout from '../../../utils/auth/logout'

describe('logout', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const push = jest.fn()
    const router = { push }
    const updateStoreValue = jest.fn()

    const removeItem = jest.fn()

    Storage.prototype.removeItem = removeItem

    await logout({
      router,
      updateStoreValue
    })

    expect(updateStoreValue).toHaveBeenCalledWith(
      ['user'], OPERATION_TYPE_UPDATE, {
        company: '',
        email: '',
        firstName: '',
        isGuest: false,
        lastName: '',
        token: ''
      }
    )

    expect(removeItem).toHaveBeenCalledWith(AUTH_COOKIE)
    expect(push).toHaveBeenCalledWith(
      ROUTE_LOGIN
    )
  })
})
