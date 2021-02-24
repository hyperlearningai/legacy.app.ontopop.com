import setEdgesStyle from '../../../utils/networkStyling/setEdgesStyle'
import resetEdgesStyles from '../../../utils/networkStyling/resetEdgesStyles'
import setEdgesStylesByProperty from '../../../utils/networkStyling/setEdgesStylesByProperty'

jest.mock('../../../utils/networkStyling/resetEdgesStyles')
jest.mock('../../../utils/networkStyling/setEdgesStylesByProperty')

describe('setEdgesStyle', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    await setEdgesStyle()

    expect(resetEdgesStyles).toHaveBeenCalledWith()
    expect(setEdgesStylesByProperty).toHaveBeenCalledWith()
  })
})
