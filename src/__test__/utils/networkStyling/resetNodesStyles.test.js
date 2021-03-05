import resetNodesStyles from '../../../utils/networkStyling/resetNodesStyles'
import store from '../../../store'
import getPhysicsOptions from '../../../utils/graphVisualisation/getPhysicsOptions'

jest.mock('../../../utils/graphVisualisation/getPhysicsOptions')

describe('resetNodesStyles', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const setOptions = jest.fn()

    store.getState = jest.fn().mockImplementationOnce(() => ({
      network: {
        setOptions
      },
    }))

    getPhysicsOptions.mockImplementationOnce(() => ({
      physics: true
    }))

    await resetNodesStyles()

    expect(setOptions).toHaveBeenCalledWith(
      {
        physics: true
      }
    )
  })
})
