import { DataSet } from 'vis-data'
import store from '../../../store'
import getEdgeIds from '../../../utils/nodesEdgesUtils/getEdgeIds'

describe('getEdgeIds', () => {
  it('should get edge ids', async () => {
    const availableEdges = new DataSet([
      {
        id: 'edge-123'
      }
    ])

    store.getState = () => ({
      availableEdges
    })

    const edgeIds = await getEdgeIds()

    expect(edgeIds).toEqual([
      'edge-123'
    ])
  })
})
