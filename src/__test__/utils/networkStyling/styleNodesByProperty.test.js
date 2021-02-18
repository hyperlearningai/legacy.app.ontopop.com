import styleNodesByProperty from '../../../utils/networkStyling/styleNodesByProperty'
import updateNodes from '../../../utils/nodesEdgesUtils/updateNodes'
import getNode from '../../../utils/nodesEdgesUtils/getNode'

jest.mock('../../../utils/nodesEdgesUtils/updateNodes')
jest.mock('../../../utils/nodesEdgesUtils/getNode')

describe('styleNodesByProperty', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    getNode.mockImplementationOnce(() => ([{
      id: 'node-123'
    }]))

    const property = {
      property: 'rdfsLabel',
      filterType: 'equal',
      filterValue: 'road',
      styleType: 'stylingNodeHoverBackgroundColor',
      styleValue: '#000'
    }

    await styleNodesByProperty({
      property
    })

    expect(updateNodes).toHaveBeenCalledWith({
      color: {
        hover: { background: '#000' },
      },
      id: 'node-123',
    })
  })
})
