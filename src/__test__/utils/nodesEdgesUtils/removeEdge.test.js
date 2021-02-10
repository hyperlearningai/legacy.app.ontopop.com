import { DataSet } from 'vis-data'
import store from '../../../store'
import removeEdge from '../../../utils/nodesEdgesUtils/removeEdge'

describe('removeEdge', () => {
  it('should not remove edge if not existing', async () => {
    const availableEdges = new DataSet([])
    store.getState = () => ({
      availableEdges
    })

    await removeEdge('edge-123')

    expect(availableEdges.length).toEqual(0)
  })

  it('should remove edge if edge exists', async () => {
    const availableEdges = new DataSet([
      {
        id: 'edge-123'
      }
    ])

    store.getState = () => ({
      availableEdges
    })

    await removeEdge('edge-123')

    expect(availableEdges.length).toEqual(0)
  })
})
