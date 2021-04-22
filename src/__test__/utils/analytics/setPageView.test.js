import { GA_ID } from '../../../constants/analytics'
import store from '../../../store'
import getVisitorId from '../../../utils/analytics/getVisitorId'
import setPageView from '../../../utils/analytics/setPageView'

let windowSpy

const updateStoreValue = jest.fn()
const gtag = jest.fn()
jest.mock('../../../utils/analytics/getVisitorId')

const url = '/app'

describe('setPageView', () => {
  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get')
  })

  afterEach(() => {
    windowSpy.mockRestore()
    jest.clearAllMocks()
  })

  it('should not call gtag if no uniqueFingerprint', async () => {
    windowSpy.mockImplementation(() => ({
      gtag
    }))

    store.getState = jest.fn().mockImplementation(() => ({
      uniqueFingerprint: undefined
    }))

    await setPageView({
      url,
      updateStoreValue
    })

    expect(getVisitorId).toHaveBeenCalledWith({ updateStoreValue })
    expect(gtag).toHaveBeenCalledTimes(0)
  })

  it('should call gtag if uniqueFingerprint', async () => {
    windowSpy.mockImplementation(() => ({
      gtag
    }))

    store.getState = jest.fn().mockImplementation(() => ({
      uniqueFingerprint: 123
    }))

    await setPageView({
      url,
      updateStoreValue
    })

    expect(gtag).toHaveBeenCalledWith(
      'config', GA_ID, {
        page_path: url,
        client_storage: 'none',
        client_id: 123,
        anonymize_ip: true
      }
    )
  })
})
