import setNodesStyle from '../../../utils/networkStyling/setNodesStyle'
import resetNodesStyles from '../../../utils/networkStyling/resetNodesStyles'
import setHighlightedNodes from '../../../utils/networkStyling/setHighlightedNodes'
import setNodesStylesByProperty from '../../../utils/networkStyling/setNodesStylesByProperty'
import setNodesOverlay from '../../../utils/networkStyling/setNodesOverlay'
import highlightSpiderableNodes from '../../../utils/networkStyling/highlightSpiderableNodes'
import setUserDefinedNodesStyles from '../../../utils/networkStyling/setUserDefinedNodesStyles'

jest.mock('../../../utils/networkStyling/resetNodesStyles')
jest.mock('../../../utils/networkStyling/setUserDefinedNodesStyles')
jest.mock('../../../utils/networkStyling/setHighlightedNodes')
jest.mock('../../../utils/networkStyling/setNodesOverlay')
jest.mock('../../../utils/networkStyling/setNodesStylesByProperty')
jest.mock('../../../utils/networkStyling/highlightSpiderableNodes')

describe('setNodesStyle', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    await setNodesStyle()

    expect(resetNodesStyles).toHaveBeenCalledWith()
    expect(setUserDefinedNodesStyles).toHaveBeenCalledWith()
    expect(setNodesStylesByProperty).toHaveBeenCalledWith()
    expect(highlightSpiderableNodes).toHaveBeenCalledWith()
    expect(setHighlightedNodes).toHaveBeenCalledWith()
    expect(setNodesOverlay).toHaveBeenCalledWith()
  })
})
