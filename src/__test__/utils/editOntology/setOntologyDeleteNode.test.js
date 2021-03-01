/* eslint max-len:0 */
import { DataSet } from 'vis-data'
import setOntologyDeleteNode from '../../../utils/editOntology/setOntologyDeleteNode'
import store from '../../../store'
import { classesFromApi } from '../../fixtures/classesFromApi'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import {
  setStoreStateFixture
} from '../../fixtures/setOntologyDeleteNode'
import { nodesEdges } from '../../fixtures/nodesEdgesNew'
import { edgesPerNode } from '../../fixtures/edgesPerNodeNew'
import removeEdge from '../../../utils/nodesEdgesUtils/removeEdge'
import setElementsStyle from '../../../utils/networkStyling/setElementsStyle'
import httpCall from '../../../utils/apiCalls/httpCall'
import showNotification from '../../../utils/notifications/showNotification'
import en from '../../../i18n/en'

const setStoreState = jest.fn()
const t = (id) => en[id]
jest.mock('../../../utils/notifications/showNotification')
jest.mock('../../../utils/nodesEdgesUtils/addNode')
jest.mock('../../../utils/networkStyling/setNodeStyle')
jest.mock('../../../utils/apiCalls/httpCall')
jest.mock('../../../utils/nodesEdgesUtils/removeEdge')
jest.mock('../../../utils/networkStyling/setElementsStyle')

const selectedElement = Object.keys(classesFromApi).slice(0, Object.keys(classesFromApi).length - 2)

store.getState = jest.fn().mockImplementation(() => ({
  classesFromApi,
  deletedNodes: [],
  deletedEdges: [],
  nodesEdges,
  edgesPerNode,
  availableNodes: new DataSet(
    Object.keys(classesFromApi).map((property) => ({
      ...classesFromApi[property],
    }))
  ),
  availableEdges: new DataSet(
    Object.keys(objectPropertiesFromApi).map((property) => ({
      ...objectPropertiesFromApi[property],
      from: objectPropertiesFromApi[property].to.toString(),
      to: objectPropertiesFromApi[property].from.toString(),
    }))
  )
}))

describe('setOntologyDeleteNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when error', async () => {
    httpCall.mockImplementation(() => ({ error: true }))

    await setOntologyDeleteNode({
      selectedElement,
      setStoreState,
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
      selectedElement,
      setStoreState,
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
        1913: {
          id: '1913'
        }
      }
    }))

    await setOntologyDeleteNode({
      selectedElement,
      setStoreState,
      t
    })

    expect(removeEdge).toHaveBeenLastCalledWith(
      '1913'
    )

    expect(setElementsStyle).toHaveBeenCalledWith()

    expect(setStoreState.mock.calls).toEqual(setStoreStateFixture)

    expect(showNotification).toHaveBeenLastCalledWith(
      {
        message: 'Node deleted: 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194',
        type: 'success'
      }
    )
  })
})
