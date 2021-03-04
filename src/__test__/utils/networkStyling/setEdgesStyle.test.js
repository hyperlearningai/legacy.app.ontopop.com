import setEdgesStyle from '../../../utils/networkStyling/setEdgesStyle'
import resetEdgesStyles from '../../../utils/networkStyling/resetEdgesStyles'
import setEdgesStylesByProperty from '../../../utils/networkStyling/setEdgesStylesByProperty'
import setUserDefinedEdgesStyles from '../../../utils/networkStyling/setUserDefinedEdgesStyles'

jest.mock('../../../utils/networkStyling/resetEdgesStyles')
jest.mock('../../../utils/networkStyling/setEdgesStylesByProperty')
jest.mock('../../../utils/networkStyling/setUserDefinedEdgesStyles')

describe('setEdgesStyle', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    await setEdgesStyle()

    expect(resetEdgesStyles).toHaveBeenCalledWith()
    expect(setUserDefinedEdgesStyles).toHaveBeenCalledWith()
    expect(setEdgesStylesByProperty).toHaveBeenCalledWith()
  })
})
