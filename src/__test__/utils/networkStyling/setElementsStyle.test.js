import setNodesStyle from '../../../utils/networkStyling/setNodesStyle'
import setEdgesStyle from '../../../utils/networkStyling/setEdgesStyle'
import setElementsStyle from '../../../utils/networkStyling/setElementsStyle'

jest.mock('../../../utils/networkStyling/setNodesStyle')
jest.mock('../../../utils/networkStyling/setEdgesStyle')

describe('setElementsStyle', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    await setElementsStyle()

    expect(setNodesStyle).toHaveBeenCalledWith()

    expect(setEdgesStyle).toHaveBeenCalledWith()
  })
})
