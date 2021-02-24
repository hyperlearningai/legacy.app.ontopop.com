/* eslint max-len:0 */
import { DataSet } from 'vis-data'
import setOntologyDeleteNode from '../../../utils/editOntology/setOntologyDeleteNode'
import store from '../../../store'
import { classesFromApi } from '../../fixtures/classesFromApi'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import {
  setStoreStateFixture
} from '../../fixtures/setOntologyDeleteNode'
import { nodesConnections } from '../../fixtures/nodesConnectionsNew'
import { triplesPerNode } from '../../fixtures/triplesPerNodeNew'
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
      deletedConnections: [],
      nodesConnections,
      triplesPerNode,
      availableNodes: new DataSet(
        Object.keys(classesFromApi).map((property) => ({
          ...classesFromApi[property],
        }))
      ),
      availableEdges: new DataSet(
        Object.keys(objectPropertiesFromApi).map((property) => ({
          ...objectPropertiesFromApi[property],
          from: objectPropertiesFromApi[property].sourceNodeId.toString(),
          to: objectPropertiesFromApi[property].targetNodeId.toString(),
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
      '1942'
    )

    expect(setElementsStyle).toHaveBeenCalledWith()

    expect(setStoreState.mock.calls).toEqual(setStoreStateFixture)
  })
})
