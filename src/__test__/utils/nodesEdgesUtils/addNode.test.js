import { DataSet } from 'vis-data'
import addNode from '../../../utils/nodesEdgesUtils/addNode'
import store from '../../../store'
import setNodeStyle from '../../../utils/networkStyling/setNodeStyle'

jest.mock('../../../utils/networkStyling/setNodeStyle')

describe('addNode', () => {
  it('should not add node if existing correctly', async () => {
    const availableNodes = new DataSet([
      {
        id: '123'
      }
    ])

    store.getState = () => ({
      availableNodes
    })

    await addNode({
      id: '123'
    })

    expect(availableNodes.length).toEqual(1)
  })

  it('should add node correctly', async () => {
    const availableNodes = new DataSet()
    store.getState = () => ({
      availableNodes
    })

    await addNode({
      id: '123'
    })

    expect(availableNodes.length).toEqual(1)
    expect(setNodeStyle).toHaveBeenCalledWith({ nodeId: '123' })
  })
})
