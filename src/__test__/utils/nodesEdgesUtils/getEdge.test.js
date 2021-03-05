import { DataSet } from 'vis-data'
import getEdge from '../../../utils/nodesEdgesUtils/getEdge'
import store from '../../../store'

describe('getEdge', () => {
  it('should get edge if existing correctly', async () => {
    const availableEdges = new DataSet([
      {
        id: '123'
      }
    ])

    store.getState = () => ({
      availableEdges
    })

    expect(getEdge('123')).toEqual({
      id: '123'
    })
  })

  it('should return undefined is not existing', async () => {
    const availableEdges = new DataSet()
    store.getState = () => ({
      availableEdges
    })

    await getEdge({
      id: '234'
    })

    expect(getEdge({
      id: '234'
    })).toEqual([])
  })
})
