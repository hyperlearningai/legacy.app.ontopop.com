import { Network } from 'vis-network'
import setNetwork from '../../utils/setNetwork'

const setStoreState = jest.fn()

jest.mock('vis-network')

describe('setNetwork', () => {
  afterEach(() => {
    jest.clearAllMocks()
    Network.mockClear()
  })

  it('should work correctly', async () => {
    const physicsHierarchicalView = false
    const physicsRepulsion = true
    const physicsEdgeLength = 100
    const availableNodes = []
    const availableEdges = []
    const visJsRef = {
      current: {
        body: {
          container: {
            hasChildNodes: false
          }
        },
        id: '123'
      }
    }

    await setNetwork({
      setStoreState,
      visJsRef,
      availableNodes,
      availableEdges,
      physicsHierarchicalView,
      physicsRepulsion,
      physicsEdgeLength
    })

    expect(setStoreState.mock.calls[0][0]).toEqual('network')
    expect(Network).toHaveBeenCalled()
  })
})
