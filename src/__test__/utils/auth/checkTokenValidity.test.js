import { ROUTE_LISTING, ROUTE_LOGIN } from '../../../constants/routes'
import { OPERATION_TYPE_UPDATE } from '../../../constants/store'
import { SIDEBAR_VIEW_ENTRY_SEARCH } from '../../../constants/views'
import checkTokenValidity from '../../../utils/auth/checkTokenValidity'

describe('checkTokenValidity', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when no cookie', async () => {
    const updateStoreValue = jest.fn()
    const push = jest.fn()
    const router = { push, query: { slug: '' } }
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

  it('should work correctly when cookie and route search view', async () => {
    const updateStoreValue = jest.fn()
    const push = jest.fn()
    const router = { push, query: { slug: [SIDEBAR_VIEW_ENTRY_SEARCH] } }

    const getItem = jest.fn().mockImplementationOnce(() => JSON.stringify({ email: 'a@b.c', token: '123' }))

    Storage.prototype.getItem = getItem

    await checkTokenValidity({
      router,
      updateStoreValue
    })

    expect(updateStoreValue.mock.calls).toEqual(
      [[['user', 'email'], OPERATION_TYPE_UPDATE, 'a@b.c'], [['user', 'token'], OPERATION_TYPE_UPDATE, '123']]
    )
    expect(push).toHaveBeenCalledWith(
      ROUTE_LISTING
    )
  })

  it('should work correctly when cookie and route different from search view', async () => {
    const updateStoreValue = jest.fn()
    const push = jest.fn()
    const router = { push, query: { slug: 'any' } }

    const getItem = jest.fn().mockImplementationOnce(() => JSON.stringify({ email: 'a@b.c', token: '123' }))

    Storage.prototype.getItem = getItem

    await checkTokenValidity({
      router,
      updateStoreValue
    })

    expect(updateStoreValue.mock.calls).toEqual(
      [[['user', 'email'], OPERATION_TYPE_UPDATE, 'a@b.c'], [['user', 'token'], OPERATION_TYPE_UPDATE, '123']]
    )
    expect(push).toHaveBeenCalledWith(
      ROUTE_LISTING
    )
  })
})
