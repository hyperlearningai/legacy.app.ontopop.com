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

jest.mock('../../../utils/nodesEdgesUtils/removeEdge')
jest.mock('../../../utils/networkStyling/setElementsStyle')

const selectedElement = Object.keys(classesFromApi).slice(0, Object.keys(classesFromApi).length - 2)

const setStoreState = jest.fn()
const addToObject = jest.fn()

describe('setOntologyDeleteNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const getState = jest.fn().mockImplementation(() => ({
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
    store.getState = getState

    await setOntologyDeleteNode({
      selectedElement,
      setStoreState,
      addToObject
    })

    expect(removeEdge).toHaveBeenLastCalledWith(
      '1913'
    )

    expect(setElementsStyle).toHaveBeenCalledWith()

    expect(setStoreState.mock.calls).toEqual(setStoreStateFixture)
  })
})
