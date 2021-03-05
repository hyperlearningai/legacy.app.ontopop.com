import setEdgeStyleByProperty from '../../../utils/networkStyling/setEdgeStyleByProperty'
import setUserDefinedEdgeStyle from '../../../utils/networkStyling/setUserDefinedEdgeStyle'
import setHighlightedEdge from '../../../utils/networkStyling/setHighlightedEdge'
import setEdgeStyle from '../../../utils/networkStyling/setEdgeStyle'

jest.mock('../../../utils/networkStyling/setEdgeStyleByProperty')
jest.mock('../../../utils/networkStyling/setUserDefinedEdgeStyle')
jest.mock('../../../utils/networkStyling/setHighlightedEdge')

describe('setEdgeStyle', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const edgeId = '123'

    await setEdgeStyle({
      edgeId
    })

    expect(setUserDefinedEdgeStyle).toHaveBeenCalledWith({
      edgeId
    })
    expect(setEdgeStyleByProperty).toHaveBeenCalledWith({
      edgeId
    })
    expect(setHighlightedEdge).toHaveBeenCalledWith({
      edgeId
    })
  })
})
