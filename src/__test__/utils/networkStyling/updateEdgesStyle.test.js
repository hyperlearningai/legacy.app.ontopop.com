import updateEdgesStyle from '../../../utils/networkStyling/updateEdgesStyle'
import store from '../../../store'
import getEdgeIds from '../../../utils/nodesEdgesUtils/getEdgeIds'
import getEdge from '../../../utils/nodesEdgesUtils/getEdge'
import updateEdges from '../../../utils/nodesEdgesUtils/updateEdges'

jest.mock('../../../utils/nodesEdgesUtils/getEdgeIds')
jest.mock('../../../utils/nodesEdgesUtils/getEdge')
jest.mock('../../../utils/nodesEdgesUtils/updateEdges')

describe('updateEdgesStyle', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    getEdgeIds.mockImplementationOnce(() => ([
      '140',
    ]))

    getEdge.mockImplementationOnce(() => ({
      id: '140',
      rdfsLabel: 'Proposed\nin'
    }))

    store.getState = jest.fn().mockImplementation(() => ({
      stylingEdgeCaptionProperty: 'rdfsLabel',
    }))

    await updateEdgesStyle()

    expect(updateEdges).toHaveBeenCalledWith(
      { id: '140', label: 'Proposed\nin' }
    )
  })
})
