import setElementsStyle from '../../../utils/networkStyling/setElementsStyle'
import resetNodesStyles from '../../../utils/networkStyling/resetNodesStyles'
import resetEdgesStyles from '../../../utils/networkStyling/resetEdgesStyles'
import setHighlightedNodes from '../../../utils/networkStyling/setHighlightedNodes'
import setNodesStylesByProperty from '../../../utils/networkStyling/setNodesStylesByProperty'
import setEdgesStylesByProperty from '../../../utils/networkStyling/setEdgesStylesByProperty'
import setNodesOverlay from '../../../utils/networkStyling/setNodesOverlay'
import highlightSpiderableNodes from '../../../utils/networkStyling/highlightSpiderableNodes'

jest.mock('../../../utils/networkStyling/resetNodesStyles')
jest.mock('../../../utils/networkStyling/resetEdgesStyles')
jest.mock('../../../utils/networkStyling/setHighlightedNodes')
jest.mock('../../../utils/networkStyling/setNodesOverlay')
jest.mock('../../../utils/networkStyling/setNodesStylesByProperty')
jest.mock('../../../utils/networkStyling/setEdgesStylesByProperty')
jest.mock('../../../utils/networkStyling/highlightSpiderableNodes')

describe('setElementsStyle', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    await setElementsStyle()

    expect(resetNodesStyles).toHaveBeenCalledWith()
    expect(resetEdgesStyles).toHaveBeenCalledWith()
    expect(setNodesStylesByProperty).toHaveBeenCalledWith()
    expect(setEdgesStylesByProperty).toHaveBeenCalledWith()
    expect(highlightSpiderableNodes).toHaveBeenCalledWith()
    expect(setHighlightedNodes).toHaveBeenCalledWith()
    expect(setNodesOverlay).toHaveBeenCalledWith()
  })
})
