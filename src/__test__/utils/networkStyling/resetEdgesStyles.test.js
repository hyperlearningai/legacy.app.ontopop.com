import resetEdgesStyles from '../../../utils/networkStyling/resetEdgesStyles'
import store from '../../../store'
import getPhysicsOptions from '../../../utils/graphVisualisation/getPhysicsOptions'

jest.mock('../../../utils/graphVisualisation/getPhysicsOptions')

describe('resetEdgesStyles', () => {
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

    await resetEdgesStyles()

    expect(setOptions).toHaveBeenCalledWith(
      {
        physics: true
      }
    )
  })
})
