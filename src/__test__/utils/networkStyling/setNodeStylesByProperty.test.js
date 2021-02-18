import setNodeStylesByProperty from '../../../utils/networkStyling/setNodeStylesByProperty'
import store from '../../../store'
import styleNodeByProperty from '../../../utils/networkStyling/styleNodeByProperty'

jest.mock('../../../utils/networkStyling/styleNodeByProperty')

describe('setNodeStylesByProperty', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const nodeId = 'node-123'

    store.getState = jest.fn().mockImplementation(() => ({
      stylingNodeByProperty: [{
        styleValue: '#000',
        filterValue: 'road',
      }],
    }))

    await setNodeStylesByProperty({
      nodeId
    })

    expect(styleNodeByProperty).toHaveBeenCalledWith(
      {
        property: { filterValue: 'road', styleValue: '#000' },
        nodeId
      }
    )
  })
})
