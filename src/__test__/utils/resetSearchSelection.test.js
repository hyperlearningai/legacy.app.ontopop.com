import { DataSet } from 'vis-data'
import resetSearchSelection from '../../utils/resetSearchSelection'

const setPrevSelectedEdges = jest.fn()
const setPrevSelectedNode = jest.fn()

describe('resetSearchSelection', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const prevSelectedEdges = ['edge-123']
    const availableEdges = new DataSet([{
      id: 'edge-123',
      color: 'ffffff'
    }, {
      id: 'edge-234',
      color: 'ffffff'
    }])
    const prevSelectedNode = 'node-234'
    const availableNodes = new DataSet([{
      id: 'node-123',
      color: 'ffffff'
    }, {
      id: 'node-234',
      color: 'ffffff'
    }])

    await resetSearchSelection({
      availableEdges,
      availableNodes,
      prevSelectedEdges,
      prevSelectedNode,
      setPrevSelectedEdges,
      setPrevSelectedNode,
    })

    expect(setPrevSelectedNode).toHaveBeenCalledWith('')
    expect(setPrevSelectedEdges).toHaveBeenCalledWith([])
  })
})
