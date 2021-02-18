import styleEdgeByProperty from '../../../utils/networkStyling/styleEdgeByProperty'
import updateEdges from '../../../utils/nodesEdgesUtils/updateEdges'
import getEdge from '../../../utils/nodesEdgesUtils/getEdge'

jest.mock('../../../utils/nodesEdgesUtils/updateEdges')
jest.mock('../../../utils/nodesEdgesUtils/getEdge')

describe('styleEdgeByProperty', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when no edge property', async () => {
    const edgeId = 'edge-prop-123'

    getEdge.mockImplementationOnce(() => ({
      id: 'edge-prop-123',
    }))

    const property = {
      property: 'rdfsLabel',
      filterType: 'equal',
      filterValue: 'road',
      styleType: 'stylingEdgeLineColorHover',
      styleValue: '#000'
    }

    await styleEdgeByProperty({
      property,
      edgeId
    })

    expect(updateEdges).toHaveBeenCalledTimes(0)
  })

  it('should work correctly when not matching', async () => {
    const edgeId = 'edge-prop-123'

    getEdge.mockImplementationOnce(() => ({
      id: 'edge-prop-123',
      rdfsLabel: 'asset'
    }))

    const property = {
      property: 'rdfsLabel',
      filterType: 'equal',
      filterValue: 'road',
      styleType: 'stylingEdgeLineColorHover',
      styleValue: '#000'
    }

    await styleEdgeByProperty({
      property,
      edgeId
    })

    expect(updateEdges).toHaveBeenCalledTimes(0)
  })

  it('should work correctly', async () => {
    const edgeId = 'edge-prop-123'

    getEdge.mockImplementationOnce(() => ({
      id: 'edge-prop-123',
      rdfsLabel: 'road'
    }))

    const property = {
      property: 'rdfsLabel',
      filterType: 'equal',
      filterValue: 'road',
      styleType: 'stylingEdgeLineColorHover',
      styleValue: '#000'
    }

    await styleEdgeByProperty({
      property,
      edgeId
    })

    expect(updateEdges).toHaveBeenCalledWith({
      color: {
        hover: '#000',
      },
      id: 'edge-prop-123',
    })
  })
})
