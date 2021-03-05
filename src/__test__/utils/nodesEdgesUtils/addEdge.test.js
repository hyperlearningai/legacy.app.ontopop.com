import { DataSet } from 'vis-data'
import addEdge from '../../../utils/nodesEdgesUtils/addEdge'
import store from '../../../store'

describe('addEdge', () => {
  it('should not add edge if existing correctly', async () => {
    const availableEdges = new DataSet([
      {
        id: '123'
      }
    ])

    store.getState = () => ({
      availableEdges
    })

    await addEdge({
      id: '123'
    })

    expect(availableEdges.length).toEqual(1)
  })

  it('should add edge correctly', async () => {
    const availableEdges = new DataSet()
    store.getState = () => ({
      availableEdges
    })

    await addEdge({
      id: '123'
    })

    expect(availableEdges.length).toEqual(1)
  })
})
