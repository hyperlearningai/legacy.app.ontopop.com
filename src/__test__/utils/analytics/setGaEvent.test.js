import store from '../../../store'
import setGaEvent from '../../../utils/analytics/setGaEvent'

let windowSpy

const gtag = jest.fn()

const action = 'search'
const params = {
  query: 'test'
}

describe('setGaEvent', () => {
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

    expect(setGaEvent({
      action,
      params
    })).toEqual(false)
  })

  it('should call gtag if uniqueFingerprint', async () => {
    windowSpy.mockImplementation(() => ({
      gtag
    }))

    store.getState = jest.fn().mockImplementation(() => ({
      uniqueFingerprint: 123
    }))

    await setGaEvent({
      action,
      params
    })

    expect(gtag).toHaveBeenCalledWith(
      'event', action, params
    )
  })
})
