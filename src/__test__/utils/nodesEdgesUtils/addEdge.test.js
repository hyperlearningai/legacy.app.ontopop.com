import { DataSet } from 'vis-data'
import addEdge from '../../../utils/nodesEdgesUtils/addEdge'
import store from '../../../store'
import setEdgeStyle from '../../../utils/networkStyling/setEdgeStyle'

jest.mock('../../../utils/networkStyling/setEdgeStyle')

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
    expect(setEdgeStyle).toHaveBeenCalledWith({ edgeId: '123' })
  })
})
