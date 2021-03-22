import { DataSet } from 'vis-data'
import store from '../../../store'
import removeEdge from '../../../utils/nodesEdgesUtils/removeEdge'

const addNumber = jest.fn()
const toggleFromArrayInKey = jest.fn()
const edge = {
  id: '12',
  from: '1',
  to: '3'
}

describe('removeEdge', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should not remove edge if not existing', async () => {
    const availableEdges = new DataSet()
    store.getState = () => ({
      availableEdges
    })

    await removeEdge({
      edge,
      addNumber,
      toggleFromArrayInKey
    })

    expect(availableEdges.length).toEqual(0)
  })

  it('should remove edge if edge exists', async () => {
    const availableEdges = new DataSet([
      {
        id: '12'
      }
    ])

    store.getState = () => ({
      availableEdges
    })

    await removeEdge({
      edge,
      addNumber,
      toggleFromArrayInKey
    })

    expect(availableEdges.length).toEqual(0)
    expect(addNumber).toHaveBeenCalledWith('availableEdgesCount', -1)
    expect(toggleFromArrayInKey.mock.calls).toEqual([
      ['nodesEdges', edge.from, edge.id],
      ['nodesEdges', edge.to, edge.id],
    ])
  })
})
