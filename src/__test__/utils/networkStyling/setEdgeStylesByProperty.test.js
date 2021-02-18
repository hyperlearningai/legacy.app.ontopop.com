import setEdgeStylesByProperty from '../../../utils/networkStyling/setEdgeStylesByProperty'
import store from '../../../store'
import styleEdgeByProperty from '../../../utils/networkStyling/styleEdgeByProperty'

jest.mock('../../../utils/networkStyling/styleEdgeByProperty')

describe('setEdgeStylesByProperty', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when no stylingEdgeByProperty', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      stylingEdgeByProperty: [],
    }))

    const edgeId = 'predicate___from___to'

    await setEdgeStylesByProperty({
      edgeId
    })

    expect(styleEdgeByProperty).toHaveBeenCalledTimes(0)
  })

  it('should work correctly', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      stylingEdgeByProperty: [{
        styleValue: '#000',
        filterValue: 'road',
      }],
    }))

    const edgeId = 'predicate___from___to'

    await setEdgeStylesByProperty({
      edgeId
    })

    expect(styleEdgeByProperty).toHaveBeenCalledWith(
      {
        property: {
          filterValue: 'road',
          styleValue: '#000'
        },
        edgeId
      }
    )
  })
})
