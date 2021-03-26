import { DataSet } from 'vis-data'
import addEdge from '../../../utils/nodesEdgesUtils/addEdge'
import store from '../../../store'
import { OPERATION_TYPE_ADD, OPERATION_TYPE_PUSH_UNIQUE } from '../../../constants/store'
import setEdgeStyle from '../../../utils/networkStyling/setEdgeStyle'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'

const updateStoreValue = jest.fn()
jest.mock('../../../utils/networkStyling/setEdgeStyle')

const edge = {
  id: '123',
  from: '12',
  to: '14'
}

describe('addEdge', () => {
  it('should not add edge if existing correctly', async () => {
    const availableEdges = new DataSet([
      edge
    ])

    store.getState = () => ({
      availableEdges
    })

    await addEdge({
      updateStoreValue,
      edge
    })

    expect(availableEdges.length).toEqual(1)
    expect(updateStoreValue).toHaveBeenCalledTimes(0)
    expect(setEdgeStyle).toHaveBeenCalledTimes(0)
  })

  it('should add edge correctly', async () => {
    const availableEdges = new DataSet()
    store.getState = () => ({
      availableEdges,
      objectPropertiesFromApiBackup: objectPropertiesFromApi,
      globalEdgeStyling: {
        stylingNodeCaptionProperty: 'rdfsLabel',
        stylingNodeCaptionPropertyDataset: 'rdfsLabel',
      },
      userDefinedEdgeStyling: {
        stylingNodeCaptionProperty: 'rdfsLabel',
        stylingNodeCaptionPropertyDataset: 'rdfsLabel',
      },
    })

    await addEdge({
      updateStoreValue,
      edge
    })

    expect(availableEdges.length).toEqual(1)
    expect(updateStoreValue.mock.calls).toEqual(
      [[['availableEdgesCount'], OPERATION_TYPE_ADD, 1], [['nodesEdges', '12'],
        OPERATION_TYPE_PUSH_UNIQUE, '123'], [['nodesEdges', '14'], OPERATION_TYPE_PUSH_UNIQUE, '123']]
    )
    expect(setEdgeStyle).toHaveBeenCalledWith({ edge })
  })
})
