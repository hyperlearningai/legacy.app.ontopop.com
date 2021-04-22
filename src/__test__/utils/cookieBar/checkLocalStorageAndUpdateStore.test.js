import { OPERATION_TYPE_UPDATE } from '../../../constants/store'
import checkLocalStorageAndUpdateStore from '../../../utils/cookieBar/checkLocalStorageAndUpdateStore'

const updateStoreValue = jest.fn()

describe('checkLocalStorageAndUpdateStore', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should update store value when local storage item does not exist', async () => {
    Storage.prototype.getItem = jest.fn().mockImplementation(() => undefined)

    const isUndefined = await checkLocalStorageAndUpdateStore({
      updateStoreValue,
      name: 'test',
      state: 'isCookie'
    })

    expect(updateStoreValue).toHaveBeenCalledTimes(0)
    expect(isUndefined).toEqual(true)
  })

  it('should update store value when local storage item exists', async () => {
    Storage.prototype.getItem = jest.fn().mockImplementation(() => 'true')

    const isUndefined = await checkLocalStorageAndUpdateStore({
      updateStoreValue,
      name: 'test',
      state: 'isCookie'
    })

    expect(updateStoreValue).toHaveBeenCalledWith(
      ['isCookie'], OPERATION_TYPE_UPDATE, true
    )
    expect(isUndefined).toEqual(false)
  })
})
