import styleNodeByProperty from '../../../utils/networkStyling/styleNodeByProperty'
import updateNodes from '../../../utils/nodesEdgesUtils/updateNodes'
import getNode from '../../../utils/nodesEdgesUtils/getNode'

jest.mock('../../../utils/nodesEdgesUtils/updateNodes')
jest.mock('../../../utils/nodesEdgesUtils/getNode')

describe('styleNodeByProperty', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when no nodeProperty', async () => {
    const nodeId = 'node-123'

    getNode.mockImplementationOnce(() => ({
      id: nodeId,
    }))

    const property = {
      property: 'rdfsLabel',
      filterType: 'equal',
      filterValue: 'road',
      styleType: 'stylingNodeHoverBackgroundColor',
      styleValue: '#000'
    }

    await styleNodeByProperty({
      property,
      nodeId
    })

    expect(updateNodes).toHaveBeenCalledTimes(0)
  })

  it('should work correctly when not stylable', async () => {
    const nodeId = 'node-123'

    getNode.mockImplementationOnce(() => ({
      id: nodeId,
      rdfsLabel: 'asset'
    }))

    const property = {
      property: 'rdfsLabel',
      filterType: 'equal',
      filterValue: 'road',
      styleType: 'stylingNodeHoverBackgroundColor',
      styleValue: '#000'
    }

    await styleNodeByProperty({
      property,
      nodeId
    })

    expect(updateNodes).toHaveBeenCalledTimes(0)
  })

  it('should work correctly', async () => {
    const nodeId = 'node-123'

    getNode.mockImplementationOnce(() => ({
      id: nodeId,
      rdfsLabel: 'road'
    }))

    const property = {
      property: 'rdfsLabel',
      filterType: 'equal',
      filterValue: 'road',
      styleType: 'stylingNodeHoverBackgroundColor',
      styleValue: '#000'
    }

    await styleNodeByProperty({
      property,
      nodeId
    })

    expect(updateNodes).toHaveBeenCalledWith({
      color: {
        hover: { background: '#000' },
      },
      id: 'node-123',
    })
  })
})
