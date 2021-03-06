/* eslint max-len:0 */
import setOntologyRestoreEdge from '../../../utils/editOntology/setOntologyRestoreEdge'
import store from '../../../store'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import { totalEdgesPerNode } from '../../fixtures/totalEdgesPerNode'
import {
  setStoreStateFixture
} from '../../fixtures/setOntologyRestoreEdge'
import addEdge from '../../../utils/nodesEdgesUtils/addEdge'
import setEdgeStyleByProperty from '../../../utils/networkStyling/setEdgeStyleByProperty'
import getNode from '../../../utils/nodesEdgesUtils/getNode'
import httpCall from '../../../utils/apiCalls/httpCall'
import showNotification from '../../../utils/notifications/showNotification'
import en from '../../../i18n/en'
import countEdges from '../../../utils/nodesEdgesUtils/countEdges'
import countNodes from '../../../utils/nodesEdgesUtils/countNodes'

const selectedElement = [
  '11'
]
const setStoreState = jest.fn()
const t = (id) => en[id]
const addNumber = jest.fn()

jest.mock('../../../utils/nodesEdgesUtils/getNode')
jest.mock('../../../utils/networkStyling/setEdgeStyleByProperty')
jest.mock('../../../utils/nodesEdgesUtils/addEdge')
jest.mock('../../../utils/apiCalls/httpCall')
jest.mock('../../../utils/notifications/showNotification')
jest.mock('../../../utils/nodesEdgesUtils/countEdges')
jest.mock('../../../utils/nodesEdgesUtils/countNodes')

store.getState = jest.fn().mockImplementation(() => ({
  objectPropertiesFromApi,
  deletedEdges: [selectedElement[0]],
  nodesEdges: {
    1: [],
    141: [],
  },
  totalEdgesPerNode,
  objectPropertiesFromApiBackup: objectPropertiesFromApi,
  stylingEdgeCaptionProperty: 'rdfsLabel',
}))

getNode.mockImplementation(() => ({ id: '123' }))

countEdges.mockImplementation(() => 1)
countNodes.mockImplementation(() => 1)

describe('setOntologyRestoreEdge', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when error', async () => {
    httpCall.mockImplementation(() => ({ error: true }))

    await setOntologyRestoreEdge({
      addNumber,
      setStoreState,
      selectedElement,
      t
    })

    expect(showNotification).toHaveBeenCalledWith(
      {
        message: 'Could not restore node: 11',
        type: 'warning'
      }
    )
  })

  it('should work correctly when no data', async () => {
    httpCall.mockImplementation(() => ({ data: {} }))

    await setOntologyRestoreEdge({
      addNumber,
      setStoreState,
      selectedElement,
      t
    })

    expect(showNotification).toHaveBeenLastCalledWith(
      {
        message: 'Could not restore node: 11',
        type: 'warning'
      }
    )
  })

  it('should work correctly', async () => {
    httpCall.mockImplementation(() => ({
      data: {
        11: {
          id: '11'
        }
      }
    }))

    await setOntologyRestoreEdge({
      addNumber,
      setStoreState,
      selectedElement,
      t
    })

    expect(addEdge).toHaveBeenLastCalledWith({
      edgeId: 11,
      from: '1',
      id: '11',
      label: 'Subclass of',
      rdfsLabel: 'Subclass of',
      role: 'Subclass of',
      to: '141',
      userDefined: false,
    })

    expect(setEdgeStyleByProperty).toHaveBeenLastCalledWith(
      { edgeId: '11' }
    )

    expect(setStoreState.mock.calls).toEqual(setStoreStateFixture)
  })
})
