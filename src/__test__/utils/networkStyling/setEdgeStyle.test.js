import setEdgeStyleByProperty from '../../../utils/networkStyling/setEdgeStyleByProperty'
import setUserDefinedEdgeStyle from '../../../utils/networkStyling/setUserDefinedEdgeStyle'
import setHighlightedEdge from '../../../utils/networkStyling/setHighlightedEdge'
import setEdgeStyle from '../../../utils/networkStyling/setEdgeStyle'
import resetEdgeStyle from '../../../utils/networkStyling/resetEdgeStyle'

jest.mock('../../../utils/networkStyling/setEdgeStyleByProperty')
jest.mock('../../../utils/networkStyling/setUserDefinedEdgeStyle')
jest.mock('../../../utils/networkStyling/setHighlightedEdge')
jest.mock('../../../utils/networkStyling/resetEdgeStyle')

describe('setEdgeStyle', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when userDefined', async () => {
    const edge = { id: '123', userDefined: true }

    await setEdgeStyle({
      edge
    })

    expect(setUserDefinedEdgeStyle).toHaveBeenCalledWith({
      edge
    })
    expect(setEdgeStyleByProperty).toHaveBeenCalledWith({
      edgeId: edge.id
    })
    expect(setHighlightedEdge).toHaveBeenCalledWith({
      edge
    })
  })

  it('should work correctly', async () => {
    const edge = { id: '123', userDefined: false }

    await setEdgeStyle({
      edge
    })

    expect(resetEdgeStyle).toHaveBeenCalledWith({
      edge
    })
    expect(setEdgeStyleByProperty).toHaveBeenCalledWith({
      edgeId: edge.id
    })
    expect(setHighlightedEdge).toHaveBeenCalledWith({
      edge
    })
  })
})
