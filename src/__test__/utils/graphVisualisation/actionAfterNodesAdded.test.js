import actionAfterNodesAdded from '../../../utils/graphVisualisation/actionAfterNodesAdded'
import store from '../../../store'
import getNodeIds from '../../../utils/nodesEdgesUtils/getNodeIds'
import { OPERATION_TYPE_ADD, OPERATION_TYPE_UPDATE } from '../../../constants/store'

const updateStoreValue = jest.fn()
const fit = jest.fn()

const nodesEdges = {
  1: [
    '11',
    '12',
  ],
  141: [
    '11',
  ],
  170: [
    '12',
  ],
}

store.getState = jest.fn().mockImplementation(() => ({
  network: {
    fit
  },
  isPhysicsOn: false,
  physicsRepulsion: false,
}))

jest.mock('../../../utils/nodesEdgesUtils/getNodeIds')

getNodeIds.mockImplementationOnce(() => ['111'])

jest.useFakeTimers()

describe('actionAfterNodesAdded', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    await actionAfterNodesAdded({
      updateStoreValue,
      nodesEdges,
    })

    expect(updateStoreValue.mock.calls).toEqual(
      [
        [['isPhysicsOn'], OPERATION_TYPE_UPDATE, true],
        [['physicsRepulsion'], OPERATION_TYPE_UPDATE, true],
        [['activeLoaders'], OPERATION_TYPE_ADD, -1]
      ]
    )

    expect(setTimeout).toHaveBeenCalledWith(
      expect.any(Function), 1000
    )
  })
})
