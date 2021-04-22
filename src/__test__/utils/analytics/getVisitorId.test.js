import { OPERATION_TYPE_UPDATE } from '../../../constants/store'
import getVisitorId from '../../../utils/analytics/getVisitorId'

const updateStoreValue = jest.fn()
let windowSpy
const currentNavigator = global.navigator
const currentPlatform = global.platform
const currentScreen = global.screen

describe('getVisitorId', () => {
  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get')
    global.navigator = {
      userAgentData: {
        brands: [{
          brand: 'Google',
          version: '90'
        }]
      },
      plugins: {
        length: 2
      },
      connection: {
        onchange: null,
        effectiveType: '4g',
        rtt: 50,
        downlink: 10,
        saveData: false
      },
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36'
    }
    global.screen = {
      height: 100,
      width: 100,
      pixelDepth: 100
    }
    global.platform = { layout: 'Blink' }
  })

  afterEach(() => {
    windowSpy.mockRestore()
    global.navigator = currentNavigator
    global.platform = currentPlatform
    global.screen = currentScreen
    jest.clearAllMocks()
  })

  it('should return false if do not track', () => {
    windowSpy.mockImplementation(() => ({
      doNotTrack: '1'
    }))

    expect(getVisitorId({
      updateStoreValue
    })).toEqual(false)
  })

  it('should return unique id', async () => {
    windowSpy.mockImplementation(() => ({}))

    await getVisitorId({
      updateStoreValue
    })

    const callParameters = updateStoreValue.mock.calls[0]

    expect(callParameters[0]).toEqual(
      ['uniqueFingerprint']
    )
    expect(callParameters[1]).toEqual(
      OPERATION_TYPE_UPDATE
    )
    expect(callParameters[2]).toBeGreaterThan(1)
  })
})
