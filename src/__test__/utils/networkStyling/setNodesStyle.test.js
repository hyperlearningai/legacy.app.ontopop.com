import setNodesStyle from '../../../utils/networkStyling/setNodesStyle'
import resetNodesStyles from '../../../utils/networkStyling/resetNodesStyles'
import setHighlightedNodes from '../../../utils/networkStyling/setHighlightedNodes'
import setNodesStylesByProperty from '../../../utils/networkStyling/setNodesStylesByProperty'
import setNodesOverlay from '../../../utils/networkStyling/setNodesOverlay'
import addNodesBorders from '../../../utils/networkStyling/addNodesBorders'
import setUserDefinedNodesStyles from '../../../utils/networkStyling/setUserDefinedNodesStyles'

jest.mock('../../../utils/networkStyling/resetNodesStyles')
jest.mock('../../../utils/networkStyling/setUserDefinedNodesStyles')
jest.mock('../../../utils/networkStyling/setHighlightedNodes')
jest.mock('../../../utils/networkStyling/setNodesOverlay')
jest.mock('../../../utils/networkStyling/setNodesStylesByProperty')
jest.mock('../../../utils/networkStyling/addNodesBorders')

describe('setNodesStyle', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    await setNodesStyle()

    expect(resetNodesStyles).toHaveBeenCalledWith()
    expect(setUserDefinedNodesStyles).toHaveBeenCalledWith()
    expect(setNodesStylesByProperty).toHaveBeenCalledWith()
    expect(addNodesBorders).toHaveBeenCalledWith()
    expect(setHighlightedNodes).toHaveBeenCalledWith()
    expect(setNodesOverlay).toHaveBeenCalledWith()
  })
})
