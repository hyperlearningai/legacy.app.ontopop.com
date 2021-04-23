import { USERBACK_COOKIE } from '../../../constants/analytics'
import { OPERATION_TYPE_UPDATE } from '../../../constants/store'
import checkCookiesAtStartup from '../../../utils/cookieBar/checkCookiesAtStartup'
import checkLocalStorageAndUpdateStore from '../../../utils/cookieBar/checkLocalStorageAndUpdateStore'

const updateStoreValue = jest.fn()
const removeItem = jest.fn()
jest.mock('../../../utils/cookieBar/checkLocalStorageAndUpdateStore')

describe('checkCookiesAtStartup', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should not update store if cookie bar not visible', async () => {
    Storage.prototype.removeItem = removeItem

    checkLocalStorageAndUpdateStore.mockImplementation(() => false)
    await checkCookiesAtStartup({
      updateStoreValue,
    })

    expect(updateStoreValue).toHaveBeenCalledTimes(0)
    expect(removeItem).toHaveBeenCalledWith(USERBACK_COOKIE)
  })

  it('should  update store if cookie bar visible', async () => {
    checkLocalStorageAndUpdateStore.mockImplementation(() => true)
    await checkCookiesAtStartup({
      updateStoreValue,
    })

    expect(updateStoreValue).toHaveBeenCalledWith(
      ['isCookieBarOpen'], OPERATION_TYPE_UPDATE, true
    )
  })
})
