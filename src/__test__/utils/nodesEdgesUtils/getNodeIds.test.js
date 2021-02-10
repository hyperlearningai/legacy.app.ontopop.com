import { DataSet } from 'vis-data'
import getNodeIds from '../../../utils/nodesEdgesUtils/getNodeIds'
import store from '../../../store'

describe('getNodeIds', () => {
  it('should get node ids', async () => {
    const availableNodes = new DataSet([
      {
        id: 'node-123'
      }
    ])

    store.getState = () => ({
      availableNodes
    })

    const nodeIds = await getNodeIds()

    expect(nodeIds).toEqual([
      'node-123'
    ])
  })
})
