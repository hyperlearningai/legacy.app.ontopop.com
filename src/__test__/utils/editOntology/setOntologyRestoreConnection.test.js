/* eslint max-len:0 */
import setOntologyRestoreConnection from '../../../utils/editOntology/setOntologyRestoreConnection'
import store from '../../../store'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import { triplesPerNode } from '../../fixtures/triplesPerNodeNew'
import {
  setStoreStateFixture
} from '../../fixtures/setOntologyRestoreConnection'
import addEdge from '../../../utils/nodesEdgesUtils/addEdge'
import setEdgeStylesByProperty from '../../../utils/networkStyling/setEdgeStylesByProperty'
import getNode from '../../../utils/nodesEdgesUtils/getNode'

const selectedElement = [
  '11'
]
const setStoreState = jest.fn()

jest.mock('../../../utils/nodesEdgesUtils/getNode')
jest.mock('../../../utils/networkStyling/setEdgeStylesByProperty')
jest.mock('../../../utils/nodesEdgesUtils/addEdge')

describe('setOntologyRestoreConnection', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const objectPropertiesFromApiLatest = JSON.parse(JSON.stringify(objectPropertiesFromApi))
    delete objectPropertiesFromApiLatest[selectedElement[0]]

    store.getState = jest.fn().mockImplementation(() => ({
      objectPropertiesFromApi,
      deletedConnections: [selectedElement[0]],
      nodesConnections: {
        1: [],
        141: [],
      },
      triplesPerNode,
      objectPropertiesFromApiBackup: objectPropertiesFromApi,
      stylingEdgeCaptionProperty: 'rdfsLabel',
    }))

    getNode.mockImplementation(() => ({ id: '123' }))

    await setOntologyRestoreConnection({
      selectedElement,
      setStoreState,
    })

    expect(addEdge).toHaveBeenLastCalledWith({
      edgeId: '11',
      edgeProperties: {
        edgeId: '11',
        id: '11',
        label: 'subclass',
        objectPropertyRdfAbout: '11',
        objectPropertyRdfsLabel: 'Subclass of',
      },
      from: '1',
      id: '11',
      label: 'Subclass of',
      predicate: '11',
      rdfAbout: '11',
      rdfsLabel: 'Subclass of',
      role: 'Subclass of',
      sourceNodeId: '1',
      targetNodeId: '141',
      to: '141',
    })

    expect(setEdgeStylesByProperty).toHaveBeenLastCalledWith(
      { edgeId: '11' }
    )

    expect(setStoreState.mock.calls).toEqual(setStoreStateFixture)
  })
})
