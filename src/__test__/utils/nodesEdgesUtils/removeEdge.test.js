import { DataSet } from 'vis-data'
import { OPERATION_TYPE_ADD, OPERATION_TYPE_ARRAY_DELETE_INDEX, OPERATION_TYPE_TOGGLE } from '../../../constants/store'
import store from '../../../store'
import removeEdge from '../../../utils/nodesEdgesUtils/removeEdge'

const updateStoreValue = jest.fn()
const edge = {
  id: '12',
  from: '1',
  to: '3'
}
const dataTableTriples = [{
  edge: '12',
  from: '1',
  to: '3'
}]

describe('removeEdge', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should not remove edge if not existing', async () => {
    const availableEdges = new DataSet()
    store.getState = () => ({
      availableEdges,
      dataTableTriples
    })

    await removeEdge({
      edge,
      updateStoreValue,
    })

    expect(availableEdges.length).toEqual(0)
  })

  it('should remove edge if edge exists', async () => {
    const availableEdges = new DataSet([
      {
        id: '12'
      }
    ])

    store.getState = () => ({
      availableEdges,
      dataTableTriples
    })

    await removeEdge({
      edge,
      updateStoreValue,
    })

    expect(availableEdges.length).toEqual(0)

    expect(updateStoreValue.mock.calls).toEqual([
      [['availableEdgesCount'], OPERATION_TYPE_ADD, -1],
      [
        [
          'dataTableTriples',
        ],
        OPERATION_TYPE_ARRAY_DELETE_INDEX,
        0,
      ],
      [
        [
          'dataTableTriplesWithLabels',
        ],
        OPERATION_TYPE_ARRAY_DELETE_INDEX,
        0,
      ],
      [['nodesEdges', edge.from], OPERATION_TYPE_TOGGLE, edge.id],
      [['nodesEdges', edge.to], OPERATION_TYPE_TOGGLE, edge.id],
    ])
  })
})
