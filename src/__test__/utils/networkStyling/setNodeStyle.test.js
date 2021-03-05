import setNodeStyle from '../../../utils/networkStyling/setNodeStyle'
import setHighlightedNode from '../../../utils/networkStyling/setHighlightedNode'
import setNodeStylesByProperty from '../../../utils/networkStyling/setNodeStylesByProperty'
import setNodeOverlay from '../../../utils/networkStyling/setNodeOverlay'
import highlightSpiderableNode from '../../../utils/networkStyling/highlightSpiderableNode'
import setUserDefinedNodeStyle from '../../../utils/networkStyling/setUserDefinedNodeStyle'

jest.mock('../../../utils/networkStyling/setHighlightedNode')
jest.mock('../../../utils/networkStyling/setNodeOverlay')
jest.mock('../../../utils/networkStyling/setNodeStylesByProperty')
jest.mock('../../../utils/networkStyling/highlightSpiderableNode')
jest.mock('../../../utils/networkStyling/setUserDefinedNodeStyle')

describe('setNodeStyle', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const nodeId = 'node-123'

    await setNodeStyle({
      nodeId
    })

    expect(setUserDefinedNodeStyle).toHaveBeenCalledWith({
      nodeId
    })
    expect(setNodeStylesByProperty).toHaveBeenCalledWith({
      nodeId
    })
    expect(highlightSpiderableNode).toHaveBeenCalledWith({
      nodeId
    })
    expect(setHighlightedNode).toHaveBeenCalledWith({
      nodeId
    })
    expect(setNodeOverlay).toHaveBeenCalledWith({
      nodeId
    })
  })
})
