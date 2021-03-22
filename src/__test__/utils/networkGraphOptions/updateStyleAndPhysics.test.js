import updateStyleAndPhysics from '../../../utils/networkGraphOptions/updateStyleAndPhysics'
import store from '../../../store'
import highlightSpiderableNodes from '../../../utils/networkStyling/highlightSpiderableNodes'
import setNodesOverlay from '../../../utils/networkStyling/setNodesOverlay'
import getNodeIds from '../../../utils/nodesEdgesUtils/getNodeIds'

const setStoreState = jest.fn()
const fit = jest.fn()

jest.mock('../../../utils/networkStyling/highlightSpiderableNodes')
jest.mock('../../../utils/networkStyling/setNodesOverlay')
jest.mock('../../../utils/nodesEdgesUtils/getNodeIds')

store.getState = jest.fn().mockImplementation(() => ({
  network: {
    fit
  },
  isPhysicsOn: false,
  physicsRepulsion: false
}))

getNodeIds.mockImplementation(() => ['123'])

describe('updateStyleAndPhysics', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    await updateStyleAndPhysics({
      setStoreState
    })

    expect(setStoreState.mock.calls).toEqual(
      [['isPhysicsOn', true],
        ['physicsRepulsion', true]]
    )
    expect(highlightSpiderableNodes).toHaveBeenCalledWith()
    expect(setNodesOverlay).toHaveBeenCalledWith()
  })
})
