import setNodeStyle from '../../../utils/networkStyling/setNodeStyle'
import setHighlightedNode from '../../../utils/networkStyling/setHighlightedNode'
import setNodeStylesByProperty from '../../../utils/networkStyling/setNodeStylesByProperty'
import setNodeOverlay from '../../../utils/networkStyling/setNodeOverlay'
import addNodeBorders from '../../../utils/networkStyling/addNodeBorders'
import setUserDefinedNodeStyle from '../../../utils/networkStyling/setUserDefinedNodeStyle'
import resetNodeStyle from '../../../utils/networkStyling/resetNodeStyle'

jest.mock('../../../utils/networkStyling/resetNodeStyle')
jest.mock('../../../utils/networkStyling/setUserDefinedNodeStyle')
jest.mock('../../../utils/networkStyling/setNodeStylesByProperty')
jest.mock('../../../utils/networkStyling/setHighlightedNode')
jest.mock('../../../utils/networkStyling/setNodeOverlay')
jest.mock('../../../utils/networkStyling/addNodeBorders')

describe('setNodeStyle', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when user defined', async () => {
    const node = { id: '123', userDefined: true }

    await setNodeStyle({
      node
    })

    expect(setUserDefinedNodeStyle).toHaveBeenCalledWith({
      node
    })
    expect(setNodeStylesByProperty).toHaveBeenCalledWith({
      nodeId: node.id
    })
    expect(setHighlightedNode).toHaveBeenCalledWith({
      node
    })
    expect(setNodeOverlay).toHaveBeenCalledWith({
      nodeId: node.id
    })
    expect(addNodeBorders).toHaveBeenCalledWith({
      node
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
    expect(setNodeStylesByProperty).toHaveBeenCalledWith({
      nodeId: node.id
    })
    expect(setHighlightedNode).toHaveBeenCalledWith({
      node
    })
    expect(setNodeOverlay).toHaveBeenCalledWith({
      nodeId: node.id
    })
    expect(addNodeBorders).toHaveBeenCalledWith({
      node
    })
  })
})
