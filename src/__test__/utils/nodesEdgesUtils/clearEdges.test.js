import { DataSet } from 'vis-data'
import store from '../../../store'
import clearEdges from '../../../utils/nodesEdgesUtils/clearEdges'

describe('clearEdges', () => {
  it('should clear all edges', async () => {
    const availableEdges = new DataSet([{
      id: 123
    }])
    store.getState = () => ({
      availableEdges
    })

    await clearEdges()

    expect(availableEdges.length).toEqual(0)
  })
})
