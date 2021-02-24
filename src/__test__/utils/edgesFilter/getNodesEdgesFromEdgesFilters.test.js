import getNodesEdgesFromEdgesFilters from '../../../utils/edgesFilter/getNodesEdgesFromEdgesFilters'
import getEdgeIds from '../../../utils/nodesEdgesUtils/getEdgeIds'
import getEdge from '../../../utils/nodesEdgesUtils/getEdge'

jest.mock('../../../utils/nodesEdgesUtils/getEdgeIds')
jest.mock('../../../utils/nodesEdgesUtils/getEdge')

describe('getNodesEdgesFromEdgesFilters', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const edgesFilters = [{
      property: 'rdfsLabel',
      value: 'comp'
    }]

    getEdgeIds.mockImplementationOnce(() => (['123']))

    getEdge.mockImplementationOnce(() => ({
      id: '123',
      rdfsLabel: 'composed of',
      from: '14',
      to: '21'
    }))

    expect(getNodesEdgesFromEdgesFilters({
      edgesFilters
    })).toEqual(
      [
        '14',
        '21'
      ]
    )
  })
})
