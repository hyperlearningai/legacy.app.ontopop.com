import { ROUTE_LOGIN } from '../../../constants/routes'
import { OPERATION_TYPE_UPDATE } from '../../../constants/store'
import checkTokenValidity from '../../../utils/auth/checkTokenValidity'

describe('checkTokenValidity', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when no cookie', async () => {
    const updateStoreValue = jest.fn()
    const push = jest.fn()
    const router = { push }
    const getItem = jest.fn().mockImplementationOnce(() => undefined)

    Storage.prototype.getItem = getItem

    await checkTokenValidity({
      router,
      updateStoreValue
    })

    expect(push).toHaveBeenCalledWith(
      ROUTE_LOGIN
    )
  })

  it('should work correctly when cookie', async () => {
    const updateStoreValue = jest.fn()
    const push = jest.fn()
    const router = { push }

    const getItem = jest.fn().mockImplementationOnce(() => JSON.stringify({ email: 'a@b.c', token: '123' }))

    Storage.prototype.getItem = getItem

    await checkTokenValidity({
      router,
      updateStoreValue
    })

    expect(updateStoreValue.mock.calls).toEqual(
      [[['user', 'email'], OPERATION_TYPE_UPDATE, 'a@b.c'], [['user', 'token'], OPERATION_TYPE_UPDATE, '123']]
    )
  })
})
