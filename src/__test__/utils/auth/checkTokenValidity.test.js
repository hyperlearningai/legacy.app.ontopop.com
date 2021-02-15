import { ROUTE_LOGIN } from '../../../constants/routes'
import checkTokenValidity from '../../../utils/auth/checkTokenValidity'

describe('checkTokenValidity', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when no cookie', async () => {
    const addToObject = jest.fn()
    const push = jest.fn()
    const router = { push }
    const getItem = jest.fn().mockImplementationOnce(() => undefined)

    Storage.prototype.getItem = getItem

    await checkTokenValidity({
      router,
      addToObject
    })

    expect(push).toHaveBeenCalledWith(
      ROUTE_LOGIN
    )
  })

  it('should work correctly when cookie', async () => {
    const addToObject = jest.fn()
    const push = jest.fn()
    const router = { push }

    const getItem = jest.fn().mockImplementationOnce(() => JSON.stringify({ email: 'a@b.c' }))

    Storage.prototype.getItem = getItem

    await checkTokenValidity({
      router,
      addToObject
    })

    expect(addToObject).toHaveBeenCalledWith('user', 'email', 'a@b.c')
  })
})
