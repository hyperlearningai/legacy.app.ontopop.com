import {
  ROUTE_ELEMENTS_FILTER,
  ROUTE_INDEX, ROUTE_LISTING, ROUTE_LOGIN, ROUTE_SEARCH
} from '../../../constants/routes'
import { OPERATION_TYPE_UPDATE } from '../../../constants/store'
import checkTokenValidity from '../../../utils/auth/checkTokenValidity'

const updateStoreValue = jest.fn()
const push = jest.fn()

describe('checkTokenValidity', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when ROUTE_INDEX', () => {
    const router = { pathname: ROUTE_INDEX }

    expect(checkTokenValidity({
      router,
      updateStoreValue
    })).toEqual(false)
  })

  it('should work correctly when route not valid', async () => {
    const router = { push, pathname: 'not-valid' }

    await checkTokenValidity({
      router,
      updateStoreValue
    })

    expect(push).toHaveBeenCalledWith(ROUTE_LISTING)
  })

  it('should work correctly when no cookie', async () => {
    const router = { push, pathname: ROUTE_SEARCH }
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
    const router = { push, pathname: ROUTE_SEARCH }

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
    const router = { push, pathname: ROUTE_ELEMENTS_FILTER }

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
