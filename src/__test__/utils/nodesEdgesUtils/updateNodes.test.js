import { DataSet } from 'vis-data'
import updateNodes from '../../../utils/nodesEdgesUtils/updateNodes'
import store from '../../../store'

describe('updateNodes', () => {
  it('should not add node if existing correctly', async () => {
    const availableNodes = new DataSet([
      {
        id: '123'
      }
    ])

    store.getState = () => ({
      availableNodes
    })

    await updateNodes({
      id: '123'
    })

    expect(availableNodes.length).toEqual(1)
  })

  it('should add node correctly', async () => {
    const availableNodes = new DataSet()
    store.getState = () => ({
      availableNodes
    })

    await updateNodes({
      id: '123'
    })

    expect(availableNodes.length).toEqual(1)
  })
})
