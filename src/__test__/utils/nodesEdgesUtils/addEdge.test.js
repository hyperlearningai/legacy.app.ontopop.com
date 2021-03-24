import { DataSet } from 'vis-data'
import addEdge from '../../../utils/nodesEdgesUtils/addEdge'
import store from '../../../store'
import { OPERATION_TYPE_ADD, OPERATION_TYPE_TOGGLE } from '../../../constants/store'

const updateStoreValue = jest.fn()

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
      updateStoreValue,
      edge: {
        id: '123'
      },
    })

    expect(availableEdges.length).toEqual(1)
    expect(updateStoreValue).toHaveBeenCalledTimes(0)
  })

  it('should add edge correctly', async () => {
    const availableEdges = new DataSet()
    store.getState = () => ({
      availableEdges
    })

    await addEdge({
      updateStoreValue,
      edge: {
        id: '123',
        from: '12',
        to: '14'
      },
    })

    expect(availableEdges.length).toEqual(1)
    expect(updateStoreValue.mock.calls).toEqual(
      [[['availableEdgesCount'], OPERATION_TYPE_ADD, 1], [['nodesEdges', '12'],
        OPERATION_TYPE_TOGGLE, '123'], [['nodesEdges', '14'], OPERATION_TYPE_TOGGLE, '123']]
    )
  })
})
