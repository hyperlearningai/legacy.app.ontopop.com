import actionAfterNodesAdded from '../../../utils/graphVisualisation/actionAfterNodesAdded'
import store from '../../../store'
import highlightSpiderableNodes from '../../../utils/networkStyling/highlightSpiderableNodes'
import getNodeIds from '../../../utils/nodesEdgesUtils/getNodeIds'
import countNodes from '../../../utils/nodesEdgesUtils/countNodes'
import countEdges from '../../../utils/nodesEdgesUtils/countEdges'

const setStoreState = jest.fn()
const addNumber = jest.fn()
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
jest.mock('../../../utils/networkStyling/highlightSpiderableNodes')
jest.mock('../../../utils/nodesEdgesUtils/countNodes')
jest.mock('../../../utils/nodesEdgesUtils/countEdges')

getNodeIds.mockImplementationOnce(() => ['111'])
countNodes.mockImplementationOnce(() => 111)
countEdges.mockImplementationOnce(() => 111)

jest.useFakeTimers()

describe('actionAfterNodesAdded', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    await actionAfterNodesAdded({
      setStoreState,
      addNumber,
      nodesEdges,
    })

    expect(setStoreState.mock.calls).toEqual(
      [['availableNodesCount', 111],
        ['availableEdgesCount', 111],
        ['nodesEdges', {
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
        }],
        ['isPhysicsOn', true],
        ['physicsRepulsion', true]
      ]
    )

    expect(addNumber).toHaveBeenCalledWith('activeLoaders', -1)

    expect(highlightSpiderableNodes).toHaveBeenCalledWith()

    expect(setTimeout).toHaveBeenCalledWith(
      expect.any(Function), 1000
    )
  })
})
