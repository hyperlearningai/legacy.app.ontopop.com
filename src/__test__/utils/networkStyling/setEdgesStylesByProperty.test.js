import setEdgesStylesByProperty from '../../../utils/networkStyling/setEdgesStylesByProperty'
import store from '../../../store'
import styleEdgesByProperty from '../../../utils/networkStyling/styleEdgesByProperty'

jest.mock('../../../utils/networkStyling/styleEdgesByProperty')

describe('setEdgesStylesByProperty', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      stylingEdgeByProperty: [{
        styleValue: '#000',
        filterValue: 'road',
      }],
    }))

    await setEdgesStylesByProperty()

    expect(styleEdgesByProperty).toHaveBeenCalledWith(
      { property: { filterValue: 'road', styleValue: '#000' } }
    )
  })
})
