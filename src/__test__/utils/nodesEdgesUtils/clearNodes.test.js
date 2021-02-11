import { DataSet } from 'vis-data'
import store from '../../../store'
import clearNodes from '../../../utils/nodesEdgesUtils/clearNodes'

describe('clearNodes', () => {
  it('should clear all nodes', async () => {
    const availableNodes = new DataSet([{
      id: 123
    }])
    store.getState = () => ({
      availableNodes
    })

    await clearNodes()

    expect(availableNodes.length).toEqual(0)
  })
})
