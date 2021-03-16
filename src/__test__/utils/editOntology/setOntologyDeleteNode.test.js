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
import { totalEdgesPerNode } from '../../fixtures/totalEdgesPerNode'
import removeEdge from '../../../utils/nodesEdgesUtils/removeEdge'
import setElementsStyle from '../../../utils/networkStyling/setElementsStyle'
import httpCall from '../../../utils/apiCalls/httpCall'
import showNotification from '../../../utils/notifications/showNotification'
import en from '../../../i18n/en'
import countEdges from '../../../utils/nodesEdgesUtils/countEdges'
import countNodes from '../../../utils/nodesEdgesUtils/countNodes'

const setStoreState = jest.fn()
const t = (id) => en[id]
const addNumber = jest.fn()

jest.mock('../../../utils/notifications/showNotification')
jest.mock('../../../utils/nodesEdgesUtils/addNode')
jest.mock('../../../utils/networkStyling/setNodeStyle')
jest.mock('../../../utils/apiCalls/httpCall')
jest.mock('../../../utils/nodesEdgesUtils/removeEdge')
jest.mock('../../../utils/networkStyling/setElementsStyle')
jest.mock('../../../utils/nodesEdgesUtils/countEdges')
jest.mock('../../../utils/nodesEdgesUtils/countNodes')

const selectedElement = Object.keys(classesFromApi).slice(0, Object.keys(classesFromApi).length - 2)

countEdges.mockImplementation(() => 1)
countNodes.mockImplementation(() => 1)

store.getState = jest.fn().mockImplementation(() => ({
  classesFromApi,
  objectPropertiesFromApi,
  deletedNodes: [],
  deletedEdges: [],
  nodesEdges,
  totalEdgesPerNode,
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
      addNumber,
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
      addNumber,
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
        12: {
          id: '12'
        }
      }
    }))

    await setOntologyDeleteNode({
      addNumber,
      selectedElement,
      setStoreState,
      t
    })

    expect(removeEdge).toHaveBeenLastCalledWith(
      '4093'
    )

    expect(setElementsStyle).toHaveBeenCalledWith()

    expect(setStoreState.mock.calls).toEqual(setStoreStateFixture)

    expect(showNotification).toHaveBeenLastCalledWith(
      {
        message: 'Nodes deleted: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 1813, 1842, 1870, 1898, 1927, 1948, 1980, 2016, 2037, 2054, 2075, 2092, 2109, 2128, 2146, 2164, 2181, 2201, 2220, 2238, 2256, 2274, 2293, 2311, 2330, 2348, 2366, 2384, 2401, 2420, 2441, 2459, 2478, 2496, 2517, 2538, 2556, 2573, 2590, 2609, 2628, 2645, 2662, 2680, 2700, 2719, 2737, 2754, 2772, 2793, 2811, 2829, 2849, 2874, 2892, 2910, 2928, 2946, 2964, 2981, 3000, 3022, 3044, 3066, 3088, 3106, 3124, 3142, 3160, 3178, 3203, 3222, 3241, 3261, 3279, 3297, 3314, 3332, 3352, 3371, 3389, 3407, 3425, 3444, 3462, 3480, 3501, 3519, 3537, 3555, 3573, 3592, 3611, 3631, 3651, 3670, 3689, 3707, 3725, 3743, 3760, 3778, 3796, 3814, 3832, 3850, 3868, 3886, 3908, 3926, 3943, 3961, 3979, 3996, 4000',
        type: 'success'
      }
    )
  })
})
