import styleEdgesByProperty from '../../../utils/graphVisualisation/styleEdgesByProperty'
import updateEdges from '../../../utils/nodesEdgesUtils/updateEdges'
import getEdge from '../../../utils/nodesEdgesUtils/getEdge'

jest.mock('../../../utils/nodesEdgesUtils/updateEdges')
jest.mock('../../../utils/nodesEdgesUtils/getEdge')

describe('styleEdgesByProperty', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    getEdge.mockImplementationOnce(() => ([{
      id: 'edge-prop-123'
    }]))

    const property = {
      property: 'rdfsLabel',
      filterType: 'equal',
      filterValue: 'road',
      styleType: 'stylingEdgeLineColorHover',
      styleValue: '#000'
    }

    await styleEdgesByProperty({
      property
    })

    expect(updateEdges).toHaveBeenCalledWith({
      color: {
        hover: '#000',
      },
      id: 'edge-prop-123',
    })
  })
})
