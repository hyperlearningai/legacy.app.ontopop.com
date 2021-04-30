/* eslint max-len:0 */
import setOntologyRestoreEdge from '../../../utils/editOntology/setOntologyRestoreEdge'
import store from '../../../store'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import addEdge from '../../../utils/nodesEdgesUtils/addEdge'
import getNode from '../../../utils/nodesEdgesUtils/getNode'
import httpCall from '../../../utils/apiCalls/httpCall'
import showNotification from '../../../utils/notifications/showNotification'
import en from '../../../i18n/en'
import checkNodeVisibility from '../../../utils/networkGraphOptions/checkNodeVisibility'
import checkEdgeVisibility from '../../../utils/networkGraphOptions/checkEdgeVisibility'
import getEdgeIds from '../../../utils/nodesEdgesUtils/getEdgeIds'
import checkNodeSpiderability from '../../../utils/networkStyling/checkNodeSpiderability'
import { OPERATION_TYPE_ARRAY_DELETE, OPERATION_TYPE_PUSH_UNIQUE } from '../../../constants/store'

const selectedElement = [
  '12'
]
const updateStoreValue = jest.fn()
const t = (id) => en[id]

jest.mock('../../../utils/nodesEdgesUtils/getNode')
jest.mock('../../../utils/nodesEdgesUtils/addEdge')
jest.mock('../../../utils/nodesEdgesUtils/getEdgeIds')
jest.mock('../../../utils/apiCalls/httpCall')
jest.mock('../../../utils/notifications/showNotification')
jest.mock('../../../utils/networkGraphOptions/checkNodeVisibility')
jest.mock('../../../utils/networkGraphOptions/checkEdgeVisibility')
jest.mock('../../../utils/networkStyling/checkNodeSpiderability')

store.getState = jest.fn().mockImplementation(() => ({
  objectPropertiesFromApiBackup: objectPropertiesFromApi,
  userDefinedEdgeStyling: { stylingEdgeCaptionProperty: 'rdfsLabel' }
}))

getNode.mockImplementation(() => ({ id: '123' }))

checkNodeVisibility.mockImplementation(() => true)
checkEdgeVisibility.mockImplementation(() => true)

const visibleEdges = ['12', '33', '40']
getEdgeIds.mockImplementation(() => visibleEdges)

describe('setOntologyRestoreEdge', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when error', async () => {
    httpCall.mockImplementation(() => ({ error: true }))

    await setOntologyRestoreEdge({
      updateStoreValue,
      selectedElement,
      t
    })

    expect(showNotification).toHaveBeenCalledWith(
      {
        message: 'Could not restore node: 12',
        type: 'warning'
      }
    )
  })

  it('should work correctly when no data', async () => {
    httpCall.mockImplementation(() => ({ data: {} }))

    await setOntologyRestoreEdge({
      updateStoreValue,
      selectedElement,
      t
    })

    expect(showNotification).toHaveBeenLastCalledWith(
      {
        message: 'Could not restore node: 12',
        type: 'warning'
      }
    )
  })

  it('should work correctly', async () => {
    httpCall.mockImplementation(() => ({
      data: {
        12: {
          id: '12'
        }
      }
    }))

    await setOntologyRestoreEdge({
      updateStoreValue,
      selectedElement,
      t
    })

    expect(addEdge).toHaveBeenLastCalledWith({
      updateStoreValue,
      edge: {
        edgeId: 12,
        from: '1',
        id: '12',
        label: 'Subclass of',
        rdfsLabel: 'Subclass of',
        role: 'Subclass of',
        to: '147',
        userDefined: false,
      }
    })

    expect(updateStoreValue.mock.calls).toEqual(
      [[['objectPropertiesFromApi'], 'objectAdd', {
        12: {
          edgeId: 12,
          from: '1',
          id: '12',
          label: 'Subclass of',
          rdfsLabel: 'Subclass of',
          role: 'Subclass of',
          to: '147',
          userDefined: false
        }
      }], [
        ['deletedEdges'], OPERATION_TYPE_ARRAY_DELETE, '12'],
      [['totalEdgesPerNodeBackup', '1'], OPERATION_TYPE_ARRAY_DELETE, '12'],
      [['totalEdgesPerNodeBackup', '1'], OPERATION_TYPE_ARRAY_DELETE, '12'],
      [['totalEdgesPerNode', '1'], OPERATION_TYPE_PUSH_UNIQUE, '12'],
      [['totalEdgesPerNode', '147'], OPERATION_TYPE_PUSH_UNIQUE, '12'],
      [['nodesEdges', '1'], OPERATION_TYPE_PUSH_UNIQUE, '12'],
      [['nodesEdges', '147'], OPERATION_TYPE_PUSH_UNIQUE, '12']
      ]
    )
    expect(checkNodeSpiderability.mock.calls).toEqual(
      [[{ nodeId: '1', updateStoreValue, visibleEdges: ['12', '33', '40'] }],
        [{ nodeId: '147', updateStoreValue, visibleEdges: ['12', '33', '40'] }]]
    )
  })
})
