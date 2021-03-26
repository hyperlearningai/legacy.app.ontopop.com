/* eslint max-len:0 */
import setOntologyDeleteEdge from '../../../utils/editOntology/setOntologyDeleteEdge'
import store from '../../../store'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import removeEdge from '../../../utils/nodesEdgesUtils/removeEdge'
import getEdge from '../../../utils/nodesEdgesUtils/getEdge'
import getNode from '../../../utils/nodesEdgesUtils/getNode'
import en from '../../../i18n/en'
import httpCall from '../../../utils/apiCalls/httpCall'
import showNotification from '../../../utils/notifications/showNotification'
import getEdgeIds from '../../../utils/nodesEdgesUtils/getEdgeIds'
import checkNodeSpiderability from '../../../utils/networkStyling/checkNodeSpiderability'
import {
  OPERATION_TYPE_ARRAY_DELETE,
  OPERATION_TYPE_DELETE,
  OPERATION_TYPE_PUSH_UNIQUE
} from '../../../constants/store'

jest.mock('../../../utils/nodesEdgesUtils/removeEdge')
jest.mock('../../../utils/nodesEdgesUtils/getEdge')
jest.mock('../../../utils/nodesEdgesUtils/getNode')
jest.mock('../../../utils/nodesEdgesUtils/getEdgeIds')
jest.mock('../../../utils/apiCalls/httpCall')
jest.mock('../../../utils/notifications/showNotification')
jest.mock('../../../utils/networkStyling/checkNodeSpiderability')

const selectedElement = [
  '11'
]
const updateStoreValue = jest.fn()
const t = (id) => en[id]
const visibleEdges = ['12', '33', '40']
getEdgeIds.mockImplementation(() => visibleEdges)

getEdge.mockImplementation(() => ({
  from: '1',
  to: '141'
}))
getNode.mockImplementation(() => ({
  id: '1',
}))

store.getState = jest.fn().mockImplementation(() => ({
  objectPropertiesFromApi
}))

describe('setOntologyDeleteEdge', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when error', async () => {
    httpCall.mockImplementationOnce(() => ({ error: true }))

    await setOntologyDeleteEdge({
      updateStoreValue,
      selectedElement,
      t
    })

    expect(showNotification).toHaveBeenCalledWith(
      {
        message: 'Could not delete edge: 11',
        type: 'warning'
      }
    )
  })

  it('should work correctly when no data', async () => {
    httpCall.mockImplementationOnce(() => ({ data: {} }))

    await setOntologyDeleteEdge({
      updateStoreValue,
      selectedElement,
      t
    })

    expect(showNotification).toHaveBeenLastCalledWith(
      {
        message: 'Could not delete edge: 11',
        type: 'warning'
      }
    )
  })

  it('should work correctly', async () => {
    httpCall.mockImplementationOnce(() => ({
      data: {
        123: {
          id: '123'
        }
      }
    }))

    await setOntologyDeleteEdge({
      updateStoreValue,
      selectedElement,
      t
    })

    expect(removeEdge).toHaveBeenLastCalledWith(
      {
        updateStoreValue,
        edge: {
          edgeId: 11,
          from: '1',
          id: '11',
          label: 'Provided to',
          rdfAbout: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
          rdfsLabel: 'Provided to',
          role: 'Provided to',
          to: '177',
          userDefined: false,
        },
      }
    )

    expect(updateStoreValue.mock.calls).toEqual(
      [
        [['totalEdgesPerNode', '1'], OPERATION_TYPE_ARRAY_DELETE, '11'],
        [['totalEdgesPerNode', '177'], OPERATION_TYPE_ARRAY_DELETE, '11'],
        [['deletedEdges'], OPERATION_TYPE_PUSH_UNIQUE, '11'],
        [['objectPropertiesFromApi', '11'], OPERATION_TYPE_DELETE]
      ]
    )

    expect(showNotification).toHaveBeenLastCalledWith(
      {
        message: 'Edge deleted: 11',
        type: 'success'
      }
    )

    expect(checkNodeSpiderability.mock.calls).toEqual(
      [
        [{ nodeId: '1', updateStoreValue, visibleEdges: ['12', '33', '40'] }],
        [{ nodeId: '177', updateStoreValue, visibleEdges: ['12', '33', '40'] }]
      ]
    )
  })
})
