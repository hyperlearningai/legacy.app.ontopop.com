import { DataSet } from 'vis-data'
import resetSearchSelection from '../../../utils/freeTextSearch/resetSearchSelection'
import store from '../../../store'

const setPrevSelectedEdges = jest.fn()
const setPrevSelectedNode = jest.fn()
const availableNodes = new DataSet([{
  id: 'node-123',
  color: 'ffffff'
}, {
  id: 'node-234',
  color: 'ffffff'
}])
const availableEdges = new DataSet([{
  id: 'edge-123',
  color: 'ffffff'
}, {
  id: 'edge-234',
  color: 'ffffff'
}])
const getState = jest.fn().mockImplementation(() => ({
  availableEdges,
  availableNodes,
}))
store.getState = getState

describe('resetSearchSelection', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const prevSelectedEdges = ['edge-123']

    const prevSelectedNode = 'node-234'

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
