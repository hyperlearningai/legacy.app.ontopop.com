import loadStyling from '../../../utils/networkStyling/loadStyling'
import getNetworkStyling from '../../../utils/networkStyling/getNetworkStyling'

jest.mock('../../../utils/networkStyling/getNetworkStyling')

describe('loadStyling', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const setStoreState = jest.fn()
    const addNumber = jest.fn()
    const t = jest.fn()

    getNetworkStyling.mockImplementationOnce(() => JSON.stringify({
      stylingNodeShape: 'circle',
      stylingNodeSize: 25
    }))

    await loadStyling({ setStoreState, addNumber, t })

    expect(setStoreState.mock.calls).toEqual(
      [
        ['stylingNodeShape', 'circle'],
        ['stylingNodeSize', 25]
      ]
    )
  })
})
