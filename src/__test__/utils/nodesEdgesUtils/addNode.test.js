import { DataSet } from 'vis-data'
import addNode from '../../../utils/nodesEdgesUtils/addNode'
import store from '../../../store'
import { OPERATION_TYPE_ADD, OPERATION_TYPE_PUSH } from '../../../constants/store'
import setNodeStyle from '../../../utils/networkStyling/setNodeStyle'
import { classesFromApi } from '../../fixtures/classesFromApi'

const updateStoreValue = jest.fn()
jest.mock('../../../utils/networkStyling/setNodeStyle')

const node = {
  id: '12'
}

describe('addNode', () => {
  it('should not add node if existing', async () => {
    const availableNodes = new DataSet([
      node
    ])

    store.getState = () => ({
      availableNodes,
      classesFromApiBackup: classesFromApi,
      userDefinedNodeStyling: {
        stylingNodeCaptionProperty: 'rdfsLabel',
        stylingNodeCaptionPropertyDataset: 'rdfsLabel',
      },
      globalNodeStyling: {
        stylingNodeCaptionProperty: 'rdfsLabel',
        stylingNodeCaptionPropertyDataset: 'rdfsLabel',
      }
    })

    await addNode({
      updateStoreValue,
      node
    })

    expect(availableNodes.length).toEqual(1)
    expect(updateStoreValue).toHaveBeenCalledTimes(0)
    expect(setNodeStyle).toHaveBeenCalledTimes(0)
  })

  it('should add node correctly', async () => {
    const availableNodes = new DataSet()
    store.getState = () => ({
      availableNodes,
      classesFromApiBackup: classesFromApi,
      userDefinedNodeStyling: {
        stylingNodeCaptionProperty: 'rdfsLabel',
        stylingNodeCaptionPropertyDataset: 'rdfsLabel',
      },
      globalNodeStyling: {
        stylingNodeCaptionProperty: 'rdfsLabel',
        stylingNodeCaptionPropertyDataset: 'rdfsLabel',
      }
    })

    await addNode({
      updateStoreValue,
      node
    })

    expect(availableNodes.length).toEqual(1)
    expect(updateStoreValue.mock.calls).toEqual([
      [['availableNodesCount'], OPERATION_TYPE_ADD, 1],
      [
        [
          'nodesDropdownLabels',
        ],
        OPERATION_TYPE_PUSH,
        {
          label: 'Maintenance',
          value: '12',
        },
      ]
    ])
    expect(setNodeStyle).toHaveBeenLastCalledWith({
      node
    })
  })
})
