import { DataSet } from 'vis-data'
import removeNode from '../../../utils/nodesEdgesUtils/removeNode'
import store from '../../../store'

const addNumber = jest.fn()
const nodeId = '12'

describe('removeNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should not remove node if not existing', async () => {
    const availableNodes = new DataSet([])

    store.getState = () => ({
      availableNodes
    })

    await removeNode({
      nodeId,
      addNumber
    })

    expect(availableNodes.length).toEqual(0)
  })

  it('should remove node if node exists', async () => {
    const availableNodes = new DataSet([
      {
        id: '12'
      }
    ])
    store.getState = () => ({
      availableNodes
    })

    await removeNode({
      nodeId,
      addNumber
    })

    expect(availableNodes.length).toEqual(0)
  })
})
