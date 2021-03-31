/* eslint max-len:0 */
import setOntologyDeleteNode from '../../../utils/editOntology/setOntologyDeleteNode'
import store from '../../../store'
import { classesFromApi } from '../../fixtures/classesFromApi'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import { totalEdgesPerNode } from '../../fixtures/totalEdgesPerNode'
import removeEdge from '../../../utils/nodesEdgesUtils/removeEdge'
import httpCall from '../../../utils/apiCalls/httpCall'
import showNotification from '../../../utils/notifications/showNotification'
import en from '../../../i18n/en'
import removeNode from '../../../utils/nodesEdgesUtils/removeNode'
import getEdgeIds from '../../../utils/nodesEdgesUtils/getEdgeIds'
import { OPERATION_TYPE_ARRAY_DELETE, OPERATION_TYPE_DELETE, OPERATION_TYPE_PUSH_UNIQUE } from '../../../constants/store'
import checkNodeSpiderability from '../../../utils/networkStyling/checkNodeSpiderability'

const updateStoreValue = jest.fn()
const t = (id) => en[id]

jest.mock('../../../utils/notifications/showNotification')
jest.mock('../../../utils/nodesEdgesUtils/addNode')
jest.mock('../../../utils/apiCalls/httpCall')
jest.mock('../../../utils/nodesEdgesUtils/removeEdge')
jest.mock('../../../utils/nodesEdgesUtils/removeNode')
jest.mock('../../../utils/nodesEdgesUtils/removeEdge')
jest.mock('../../../utils/nodesEdgesUtils/getEdgeIds')
jest.mock('../../../utils/networkStyling/checkNodeSpiderability')

const selectedElement = Object.keys(classesFromApi).slice(0, 2)

store.getState = jest.fn().mockImplementation(() => ({
  totalEdgesPerNode,
  objectPropertiesFromApi
}))

getEdgeIds.mockImplementation(() => ['12', '33', '40'])

describe('setOntologyDeleteNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when error', async () => {
    httpCall.mockImplementation(() => ({ error: true }))

    await setOntologyDeleteNode({
      updateStoreValue,
      selectedElement,
      t
    })

    expect(showNotification).toHaveBeenLastCalledWith(
      {
        message: 'Could not delete node',
        type: 'warning'
      }
    )
  })

  it('should work correctly when no data', async () => {
    httpCall.mockImplementation(() => ({ data: {} }))

    await setOntologyDeleteNode({
      updateStoreValue,
      selectedElement,
      t
    })

    expect(showNotification).toHaveBeenLastCalledWith(
      {
        message: 'Could not delete node',
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

    await setOntologyDeleteNode({
      updateStoreValue,
      selectedElement,
      t
    })

    expect(removeEdge).toHaveBeenLastCalledWith(
      {
        updateStoreValue,
        edge: {
          edgeId: 3221,
          from: '2',
          id: '3221',
          label: 'Found in',
          rdfsLabel: 'Found in',
          role: 'Found in',
          to: '3203',
          userDefined: false,
        },
      }
    )

    expect(removeNode).toHaveBeenLastCalledWith(
      { nodeId: '2', updateStoreValue }
    )
    expect(removeEdge).toHaveBeenLastCalledWith(
      {
        edge: {
          edgeId: 3221,
          from: '2',
          id: '3221',
          label: 'Found in',
          rdfsLabel: 'Found in',
          role: 'Found in',
          to: '3203',
          userDefined: false,
        },
        updateStoreValue
      }
    )

    expect(checkNodeSpiderability.mock.calls).toEqual(
      [[{ nodeId: '123', updateStoreValue, visibleEdges: ['12', '33', '40'] }],
        [{ nodeId: '4', updateStoreValue, visibleEdges: ['12', '33', '40'] }],
        [{ nodeId: '56', updateStoreValue, visibleEdges: ['12', '33', '40'] }],
        [{ nodeId: '138', updateStoreValue, visibleEdges: ['12', '33', '40'] }],
        [{ nodeId: '170', updateStoreValue, visibleEdges: ['12', '33', '40'] }],
        [{ nodeId: '168', updateStoreValue, visibleEdges: ['12', '33', '40'] }],
        [{ nodeId: '3203', updateStoreValue, visibleEdges: ['12', '33', '40'] }]]
    )

    expect(updateStoreValue.mock.calls).toEqual(
      [
        [
          [
            'totalEdgesPerNode',
            '177'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '11'
        ],
        [
          [
            'totalEdgesPerNode',
            '177'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '11'
        ],
        [
          [
            'nodesEdges',
            '177'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '11'
        ],
        [
          [
            'objectPropertiesFromApi',
            '11'
          ],
          OPERATION_TYPE_DELETE
        ],
        [
          [
            'totalEdgesPerNode',
            '147'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '12'
        ],
        [
          [
            'totalEdgesPerNode',
            '147'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '12'
        ],
        [
          [
            'nodesEdges',
            '147'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '12'
        ],
        [
          [
            'objectPropertiesFromApi',
            '12'
          ],
          OPERATION_TYPE_DELETE
        ],
        [
          [
            'totalEdgesPerNode',
            '44'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '441'
        ],
        [
          [
            'totalEdgesPerNode',
            '44'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '441'
        ],
        [
          [
            'nodesEdges',
            '44'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '441'
        ],
        [
          [
            'objectPropertiesFromApi',
            '441'
          ],
          OPERATION_TYPE_DELETE
        ],
        [
          [
            'totalEdgesPerNode',
            '78'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '781'
        ],
        [
          [
            'totalEdgesPerNode',
            '78'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '781'
        ],
        [
          [
            'nodesEdges',
            '78'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '781'
        ],
        [
          [
            'objectPropertiesFromApi',
            '781'
          ],
          OPERATION_TYPE_DELETE
        ],
        [
          [
            'totalEdgesPerNode',
            '81'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '811'
        ],
        [
          [
            'totalEdgesPerNode',
            '81'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '811'
        ],
        [
          [
            'nodesEdges',
            '81'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '811'
        ],
        [
          [
            'objectPropertiesFromApi',
            '811'
          ],
          OPERATION_TYPE_DELETE
        ],
        [
          [
            'totalEdgesPerNode',
            '142'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '1421'
        ],
        [
          [
            'totalEdgesPerNode',
            '142'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '1421'
        ],
        [
          [
            'nodesEdges',
            '142'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '1421'
        ],
        [
          [
            'objectPropertiesFromApi',
            '1421'
          ],
          OPERATION_TYPE_DELETE
        ],
        [
          [
            'totalEdgesPerNode',
            '178'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '1781'
        ],
        [
          [
            'totalEdgesPerNode',
            '178'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '1781'
        ],
        [
          [
            'nodesEdges',
            '178'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '1781'
        ],
        [
          [
            'objectPropertiesFromApi',
            '1781'
          ],
          OPERATION_TYPE_DELETE
        ],
        [
          [
            'totalEdgesPerNode',
            '185'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '1855'
        ],
        [
          [
            'totalEdgesPerNode',
            '185'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '1855'
        ],
        [
          [
            'nodesEdges',
            '185'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '1855'
        ],
        [
          [
            'objectPropertiesFromApi',
            '1855'
          ],
          OPERATION_TYPE_DELETE
        ],
        [
          [
            'totalEdgesPerNode',
            '192'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '1921'
        ],
        [
          [
            'totalEdgesPerNode',
            '192'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '1921'
        ],
        [
          [
            'nodesEdges',
            '192'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '1921'
        ],
        [
          [
            'objectPropertiesFromApi',
            '1921'
          ],
          OPERATION_TYPE_DELETE
        ],
        [
          [
            'deletedNodes'
          ],
          OPERATION_TYPE_PUSH_UNIQUE,
          '1'
        ],
        [
          [
            'totalEdgesPerNode',
            '1'
          ],
          OPERATION_TYPE_DELETE
        ],
        [
          [
            'nodesEdges',
            '1'
          ],
          OPERATION_TYPE_DELETE
        ],
        [
          [
            'classesFromApi',
            '1'
          ],
          OPERATION_TYPE_DELETE
        ],
        [
          [
            'totalEdgesPerNode',
            '123'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '21'
        ],
        [
          [
            'totalEdgesPerNode',
            '123'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '21'
        ],
        [
          [
            'nodesEdges',
            '123'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '21'
        ],
        [
          [
            'objectPropertiesFromApi',
            '21'
          ],
          OPERATION_TYPE_DELETE
        ],
        [
          [
            'totalEdgesPerNode',
            '4'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '22'
        ],
        [
          [
            'totalEdgesPerNode',
            '4'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '22'
        ],
        [
          [
            'nodesEdges',
            '4'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '22'
        ],
        [
          [
            'objectPropertiesFromApi',
            '22'
          ],
          OPERATION_TYPE_DELETE
        ],
        [
          [
            'totalEdgesPerNode',
            '56'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '23'
        ],
        [
          [
            'totalEdgesPerNode',
            '56'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '23'
        ],
        [
          [
            'nodesEdges',
            '56'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '23'
        ],
        [
          [
            'objectPropertiesFromApi',
            '23'
          ],
          OPERATION_TYPE_DELETE
        ],
        [
          [
            'totalEdgesPerNode',
            '138'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '24'
        ],
        [
          [
            'totalEdgesPerNode',
            '138'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '24'
        ],
        [
          [
            'nodesEdges',
            '138'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '24'
        ],
        [
          [
            'objectPropertiesFromApi',
            '24'
          ],
          OPERATION_TYPE_DELETE
        ],
        [
          [
            'totalEdgesPerNode',
            '170'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '25'
        ],
        [
          [
            'totalEdgesPerNode',
            '170'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '25'
        ],
        [
          [
            'nodesEdges',
            '170'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '25'
        ],
        [
          [
            'objectPropertiesFromApi',
            '25'
          ],
          OPERATION_TYPE_DELETE
        ],
        [
          [
            'totalEdgesPerNode',
            '168'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '1687'
        ],
        [
          [
            'totalEdgesPerNode',
            '168'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '1687'
        ],
        [
          [
            'nodesEdges',
            '168'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '1687'
        ],
        [
          [
            'objectPropertiesFromApi',
            '1687'
          ],
          OPERATION_TYPE_DELETE
        ],
        [
          [
            'totalEdgesPerNode',
            '3203'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '3221'
        ],
        [
          [
            'totalEdgesPerNode',
            '3203'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '3221'
        ],
        [
          [
            'nodesEdges',
            '3203'
          ],
          OPERATION_TYPE_ARRAY_DELETE,
          '3221'
        ],
        [
          [
            'objectPropertiesFromApi',
            '3221'
          ],
          OPERATION_TYPE_DELETE
        ],
        [
          [
            'deletedNodes'
          ],
          OPERATION_TYPE_PUSH_UNIQUE,
          '2'
        ],
        [
          [
            'totalEdgesPerNode',
            '2'
          ],
          OPERATION_TYPE_DELETE
        ],
        [
          [
            'nodesEdges',
            '2'
          ],
          OPERATION_TYPE_DELETE
        ],
        [
          [
            'classesFromApi',
            '2'
          ],
          OPERATION_TYPE_DELETE
        ]
      ]
    )

    expect(showNotification).toHaveBeenLastCalledWith(
      {
        message: 'Node deleted: 2',
        type: 'success'
      }
    )
  })
})
