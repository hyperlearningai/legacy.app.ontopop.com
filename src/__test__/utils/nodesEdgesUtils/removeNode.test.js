import { DataSet } from 'vis-data'
import removeNode from '../../../utils/nodesEdgesUtils/removeNode'
import store from '../../../store'
import removeEdge from '../../../utils/nodesEdgesUtils/removeEdge'
import getEdge from '../../../utils/nodesEdgesUtils/getEdge'

const addNumber = jest.fn()
const nodeId = '12'
const toggleFromArrayInKey = jest.fn()

jest.mock('../../../utils/nodesEdgesUtils/removeEdge')
jest.mock('../../../utils/nodesEdgesUtils/getEdge')

const edge = { id: '123' }
getEdge.mockImplementation(() => [edge])

describe('removeNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should not remove node if not existing', async () => {
    const availableNodes = new DataSet([])

    store.getState = () => ({
      availableNodes,
    })

    await removeNode({
      nodeId,
      addNumber,
      toggleFromArrayInKey
    })

    expect(availableNodes.length).toEqual(0)
    expect(removeEdge).toHaveBeenCalledTimes(0)
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
      addNumber,
      toggleFromArrayInKey
    })

    expect(availableNodes.length).toEqual(0)
    expect(removeEdge).toHaveBeenCalledWith({
      edge,
      addNumber,
      toggleFromArrayInKey
    })
  })
})
