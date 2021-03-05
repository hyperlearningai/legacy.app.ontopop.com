import setNodeStyle from '../../../utils/networkStyling/setNodeStyle'
import setHighlightedNode from '../../../utils/networkStyling/setHighlightedNode'
import setNodeStylesByProperty from '../../../utils/networkStyling/setNodeStylesByProperty'
import setNodeOverlay from '../../../utils/networkStyling/setNodeOverlay'
import highlightSpiderableNode from '../../../utils/networkStyling/highlightSpiderableNode'
import setUserDefinedNodeStyle from '../../../utils/networkStyling/setUserDefinedNodeStyle'
import resetNodeStyle from '../../../utils/networkStyling/resetNodeStyle'

jest.mock('../../../utils/networkStyling/resetNodeStyle')
jest.mock('../../../utils/networkStyling/setHighlightedNode')
jest.mock('../../../utils/networkStyling/setNodeOverlay')
jest.mock('../../../utils/networkStyling/setNodeStylesByProperty')
jest.mock('../../../utils/networkStyling/highlightSpiderableNode')
jest.mock('../../../utils/networkStyling/setUserDefinedNodeStyle')

describe('setNodeStyle', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when user defined and skip', async () => {
    const node = { id: '123', userDefined: true }

    await setNodeStyle({
      node,
      skipSpider: true
    })

    expect(setUserDefinedNodeStyle).toHaveBeenCalledWith({
      node
    })
    expect(setNodeStylesByProperty).toHaveBeenCalledWith({
      nodeId: node.id
    })
    expect(highlightSpiderableNode).toHaveBeenCalledTimes(0)
    expect(setHighlightedNode).toHaveBeenCalledWith({
      node
    })
    expect(setNodeOverlay).toHaveBeenCalledWith({
      nodeId: node.id
    })
  })

  it('should work correctly', async () => {
    const node = { id: '123', userDefined: false }

    await setNodeStyle({
      node
    })

    expect(resetNodeStyle).toHaveBeenCalledWith({
      node
    })
    // expect(setUserDefinedNodeStyle).toHaveBeenCalledWith({
    //   node
    // })
    expect(setNodeStylesByProperty).toHaveBeenCalledWith({
      nodeId: node.id
    })
    expect(highlightSpiderableNode).toHaveBeenCalledWith({
      node
    })
    expect(setHighlightedNode).toHaveBeenCalledWith({
      node
    })
    expect(setNodeOverlay).toHaveBeenCalledWith({
      nodeId: node.id
    })
  })
})
