import { Network } from 'vis-network'
import { JSDOM } from 'jsdom'
import setNetwork from '../../utils/setNetwork'

const setStoreState = jest.fn()

jest.mock('vis-network')
const dom = new JSDOM()
const addEventListener = jest.fn()
global.document = dom.window.document
global.window = dom.window
global.document.getElementById = () => ({
  getElementsByTagName: () => [{
    addEventListener
  }]
})

describe('setNetwork', () => {
  afterEach(() => {
    jest.clearAllMocks()
    Network.mockClear()
  })

  it('should work correctly', async () => {
    const physicsHierarchicalView = false
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
      physicsEdgeLength
    })

    expect(setStoreState.mock.calls[0][0]).toEqual('network')
    expect(setStoreState.mock.calls[1]).toEqual(['isPhysicsOn', false])
    expect(setStoreState.mock.calls[2]).toEqual(['physicsRepulsion', false])

    expect(Network).toHaveBeenCalled()
    expect(addEventListener.mock.calls[0][0]).toEqual('mousedown')
    expect(addEventListener.mock.calls[1][0]).toEqual('mousemove')
  })
})
