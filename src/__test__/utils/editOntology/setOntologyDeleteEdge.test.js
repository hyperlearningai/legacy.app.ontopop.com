/* eslint max-len:0 */
import setOntologyDeleteEdge from '../../../utils/editOntology/setOntologyDeleteEdge'
import store from '../../../store'
import { classesFromApi } from '../../fixtures/classesFromApi'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import {
  setStoreStateFixture
} from '../../fixtures/setOntologyDeleteEdge'
import removeEdge from '../../../utils/nodesEdgesUtils/removeEdge'
import { nodesEdges } from '../../fixtures/nodesEdgesNew'
import { edgesPerNode } from '../../fixtures/edgesPerNodeNew'
import getEdge from '../../../utils/nodesEdgesUtils/getEdge'
import getNode from '../../../utils/nodesEdgesUtils/getNode'
import en from '../../../i18n/en'
import httpCall from '../../../utils/apiCalls/httpCall'
import showNotification from '../../../utils/notifications/showNotification'
import countEdges from '../../../utils/nodesEdgesUtils/countEdges'
import countNodes from '../../../utils/nodesEdgesUtils/countNodes'

jest.mock('../../../utils/nodesEdgesUtils/removeEdge')
jest.mock('../../../utils/nodesEdgesUtils/getEdge')
jest.mock('../../../utils/nodesEdgesUtils/getNode')
jest.mock('../../../utils/apiCalls/httpCall')
jest.mock('../../../utils/notifications/showNotification')
jest.mock('../../../utils/nodesEdgesUtils/countEdges')
jest.mock('../../../utils/nodesEdgesUtils/countNodes')

countEdges.mockImplementation(() => 1)
countNodes.mockImplementation(() => 1)

const selectedElement = [
  '11'
]
const setStoreState = jest.fn()
const t = (id) => en[id]
const addNumber = jest.fn()

getEdge.mockImplementation(() => ({
  from: '1',
  to: '141'
}))
getNode.mockImplementation(() => ({
  id: '1',
}))

store.getState = jest.fn().mockImplementation(() => ({
  classesFromApi,
  deletedEdges: [],
  nodesEdges,
  edgesPerNode,
  objectPropertiesFromApi
}))

describe('setOntologyDeleteEdge', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when error', async () => {
    httpCall.mockImplementationOnce(() => ({ error: true }))

    await setOntologyDeleteEdge({
      addNumber,
      setStoreState,
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
      addNumber,
      setStoreState,
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
      addNumber,
      setStoreState,
      selectedElement,
      t
    })

    expect(removeEdge).toHaveBeenLastCalledWith(
      '11'
    )

    expect(setStoreState.mock.calls).toEqual(setStoreStateFixture)

    expect(showNotification).toHaveBeenLastCalledWith(
      {
        message: 'Edges deleted: 11',
        type: 'success'
      }
    )
  })
})
