import loadStyling from '../../../utils/networkStyling/loadStyling'

describe('loadStyling', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const setStoreState = jest.fn()

    const getItem = jest.fn().mockImplementationOnce(() => JSON.stringify({
      stylingNodeShape: 'circle',
      stylingNodeSize: 25
    }))

    Storage.prototype.getItem = getItem

    await loadStyling({ setStoreState })

    expect(setStoreState.mock.calls).toEqual(
      [
        ['stylingNodeShape', 'circle'],
        ['stylingNodeSize', 25]
      ]
    )
  })
})
