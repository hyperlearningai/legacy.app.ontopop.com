import updateStyleAndPhysics from '../../../utils/networkGraphOptions/updateStyleAndPhysics'
import store from '../../../store'
import highlightSpiderableNodes from '../../../utils/networkStyling/highlightSpiderableNodes'
import setNodesOverlay from '../../../utils/networkStyling/setNodesOverlay'
import getNodeIds from '../../../utils/nodesEdgesUtils/getNodeIds'
import { OPERATION_TYPE_UPDATE } from '../../../constants/store'

const updateStoreValue = jest.fn()
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
      updateStoreValue
    })

    expect(updateStoreValue.mock.calls).toEqual(
      [[['isPhysicsOn'], OPERATION_TYPE_UPDATE, true],
        [['physicsRepulsion'], OPERATION_TYPE_UPDATE, true]]
    )
    expect(highlightSpiderableNodes).toHaveBeenCalledWith()
    expect(setNodesOverlay).toHaveBeenCalledWith()
  })
})
