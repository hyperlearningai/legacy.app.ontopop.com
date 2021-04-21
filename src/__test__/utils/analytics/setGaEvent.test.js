import store from '../../../store'
import setGaEvent from '../../../utils/analytics/setGaEvent'

const gtag = jest.fn()
const currentGtag = global.gtag

const action = 'search'
const params = {
  query: 'test'
}

describe('setGaEvent', () => {
  beforeEach(() => {
    global.gtag = gtag
  })

  afterEach(() => {
    global.gtag = currentGtag
    jest.clearAllMocks()
  })

  it('should not call gtag if no uniqueFingerprint', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      uniqueFingerprint: undefined
    }))

    expect(setGaEvent({
      action,
      params
    })).toEqual(false)
  })

  it('should call gtag if uniqueFingerprint', async () => {
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
