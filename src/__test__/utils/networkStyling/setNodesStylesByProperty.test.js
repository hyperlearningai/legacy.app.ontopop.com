import setNodesStylesByProperty from '../../../utils/networkStyling/setNodesStylesByProperty'
import store from '../../../store'
import styleNodesByProperty from '../../../utils/networkStyling/styleNodesByProperty'

jest.mock('../../../utils/networkStyling/styleNodesByProperty')

describe('setNodesStylesByProperty', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      stylingNodeByProperty: [{
        styleValue: '#000',
        filterValue: 'road',
      }],
    }))

    await setNodesStylesByProperty()

    expect(styleNodesByProperty).toHaveBeenCalledWith(
      { property: { filterValue: 'road', styleValue: '#000' } }
    )
  })
})
