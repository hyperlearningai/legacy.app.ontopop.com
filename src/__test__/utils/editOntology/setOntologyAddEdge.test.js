/* eslint max-len:0 */
import setOntologyAddEdge from '../../../utils/editOntology/setOntologyAddEdge'
import store from '../../../store'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import { totalEdgesPerNode } from '../../fixtures/totalEdgesPerNode'
import addEdge from '../../../utils/nodesEdgesUtils/addEdge'
import showNotification from '../../../utils/notifications/showNotification'
import en from '../../../i18n/en'
import getNode from '../../../utils/nodesEdgesUtils/getNode'
import httpCall from '../../../utils/apiCalls/httpCall'
import checkNodeVisibility from '../../../utils/networkGraphOptions/checkNodeVisibility'
import checkEdgeVisibility from '../../../utils/networkGraphOptions/checkEdgeVisibility'
import { OPERATION_TYPE_PUSH_UNIQUE, OPERATION_TYPE_UPDATE } from '../../../constants/store'
import getEdgeIds from '../../../utils/nodesEdgesUtils/getEdgeIds'
import checkNodeSpiderability from '../../../utils/networkStyling/checkNodeSpiderability'

jest.mock('../../../utils/nodesEdgesUtils/addEdge')
jest.mock('../../../utils/nodesEdgesUtils/getEdgeIds')
jest.mock('../../../utils/nodesEdgesUtils/getNode')
jest.mock('../../../utils/notifications/showNotification')
jest.mock('../../../utils/networkStyling/setNodeStyle')
jest.mock('../../../utils/networkStyling/setEdgeStyleByProperty')
jest.mock('../../../utils/apiCalls/httpCall')
jest.mock('../../../utils/networkGraphOptions/checkNodeVisibility')
jest.mock('../../../utils/networkGraphOptions/checkEdgeVisibility')
jest.mock('../../../utils/networkStyling/checkNodeSpiderability')

checkNodeVisibility.mockImplementation(() => true)
checkEdgeVisibility.mockImplementation(() => true)
getEdgeIds.mockImplementation(() => ['1', '2', '3'])

const updateStoreValue = jest.fn()
const t = (id) => en[id]

const selectedElementProperties = {
  from: '1',
  edge: 'Provided to',
  to: '141',
  optionEdges: [
    {
      value: 'Provided to',
      label: 'Provided to'
    }
  ]
}

store.getState = jest.fn().mockImplementation(() => ({
  objectPropertiesFromApi,
  objectPropertiesFromApiBackup: objectPropertiesFromApi,
  addedEdges: [],
  nodesEdges: {
    1: [],
    141: []
  },
  totalEdgesPerNode,
  totalEdgesPerNodeBackup: totalEdgesPerNode
}))

describe('setOntologyAddEdge', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when error', async () => {
    httpCall.mockImplementationOnce(() => ({ error: true }))

    await setOntologyAddEdge({
      updateStoreValue,
      selectedElementProperties,
      t
    })

    expect(showNotification).toHaveBeenCalledWith(
      {
        message: 'Could not add edge',
        type: 'warning'
      }
    )
  })

  it('should work correctly when no data', async () => {
    httpCall.mockImplementationOnce(() => ({ data: {} }))

    await setOntologyAddEdge({
      updateStoreValue,
      selectedElementProperties,
      t
    })

    expect(showNotification).toHaveBeenCalledWith(
      {
        message: 'Could not add edge',
        type: 'warning'
      }
    )
  })

  it('should work correctly', async () => {
    getNode.mockImplementation(() => ({ id: 123 }))
    httpCall.mockImplementationOnce(() => ({
      data: {
        123: {
          id: '123',
          userDefined: true
        }
      }
    }))

    await setOntologyAddEdge({
      updateStoreValue,
      selectedElementProperties,
      t
    })

    expect(addEdge.mock.calls).toEqual(
      [[{
        updateStoreValue,
        edge: {
          edgeId: '123',
          from: '1',
          id: '123',
          label: 'Provided to',
          rdfsLabel: 'Provided to',
          to: '141',
          userDefined: true,
          userId: undefined,
        }
      }]]
    )

    const newObjectPropertiesFromApi = JSON.parse(JSON.stringify(objectPropertiesFromApi))

    newObjectPropertiesFromApi['123'] = {
      edgeId: '123',
      from: '1',
      id: '123',
      label: 'Provided to',
      rdfsLabel: 'Provided to',
      to: '141',
      userDefined: true,
      userId: undefined
    }

    expect(checkNodeSpiderability.mock.calls).toEqual(
      [[{ nodeId: '1', updateStoreValue, visibleEdges: ['1', '2', '3'] }],
        [{ nodeId: '141', updateStoreValue, visibleEdges: ['1', '2', '3'] }]]
    )

    expect(updateStoreValue.mock.calls).toEqual(
      [
        [['objectPropertiesFromApi', '123'], OPERATION_TYPE_UPDATE, {
          edgeId: '123',
          from: '1',
          id: '123',
          label: 'Provided to',
          rdfsLabel: 'Provided to',
          to: '141',
          userDefined: true,
          userId: undefined
        }],
        [['objectPropertiesFromApiBackup', '123'], OPERATION_TYPE_UPDATE, {
          edgeId: '123',
          from: '1',
          id: '123',
          label: 'Provided to',
          rdfsLabel: 'Provided to',
          to: '141',
          userDefined: true,
          userId: undefined
        }],
        [['totalEdgesPerNode', '1'], OPERATION_TYPE_PUSH_UNIQUE, '123'],
        [['totalEdgesPerNode', '1'], OPERATION_TYPE_PUSH_UNIQUE, '123'],
        [['totalEdgesPerNodeBackup', '141'], OPERATION_TYPE_PUSH_UNIQUE, '123'],
        [['totalEdgesPerNodeBackup', '141'], OPERATION_TYPE_PUSH_UNIQUE, '123'],
        [['addedEdges'], OPERATION_TYPE_PUSH_UNIQUE, '123'],
        [['nodesEdges', '1'], OPERATION_TYPE_PUSH_UNIQUE, '123'],
        [['nodesEdges', '141'], OPERATION_TYPE_PUSH_UNIQUE, '123'],
      ]
    )
  })
})
