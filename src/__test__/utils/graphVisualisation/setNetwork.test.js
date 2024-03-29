import { Network } from 'vis-network'
import { JSDOM } from 'jsdom'
import setNetwork from '../../../utils/graphVisualisation/setNetwork'

const updateStoreValue = jest.fn()

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
      updateStoreValue,
      visJsRef,
      availableNodes,
      availableEdges,
      physicsHierarchicalView,
      physicsEdgeLength
    })

    expect(updateStoreValue.mock.calls[0][0]).toEqual(['network'])

    expect(Network).toHaveBeenCalled()
    expect(addEventListener.mock.calls[0][0]).toEqual('mousedown')
    expect(addEventListener.mock.calls[1][0]).toEqual('mousemove')
  })
})
