/* eslint max-len:0 */
import setOntologyRestoreNode from '../../../utils/editOntology/setOntologyRestoreNode'
import store from '../../../store'
import { classesFromApi } from '../../fixtures/classesFromApi'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import {
  setStoreStateFixture
} from '../../fixtures/setOntologyRestoreNode'
import { nodesConnections } from '../../fixtures/nodesConnectionsNew'
import { triplesPerNode } from '../../fixtures/triplesPerNodeNew'
import getNode from '../../../utils/nodesEdgesUtils/getNode'
import setElementsStyle from '../../../utils/networkStyling/setElementsStyle'
import getEdgeObject from '../../../utils/graphVisualisation/getEdgeObject'
import addNode from '../../../utils/nodesEdgesUtils/addNode'
import addEdge from '../../../utils/nodesEdgesUtils/addEdge'

const selectedElement = ['100', '40']
const deletedNodes = ['100', '33', '21', '40']

const setStoreState = jest.fn()

jest.mock('../../../utils/nodesEdgesUtils/getNode')
jest.mock('../../../utils/networkStyling/setElementsStyle')
jest.mock('../../../utils/graphVisualisation/getEdgeObject')
jest.mock('../../../utils/nodesEdgesUtils/addNode')
jest.mock('../../../utils/nodesEdgesUtils/addEdge')

describe('setOntologyRestoreNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const classesFromApiLatest = JSON.parse(JSON.stringify(classesFromApi))
    deletedNodes.map((nodeId) => delete classesFromApiLatest[nodeId])

    store.getState = jest.fn().mockImplementation(() => ({
      classesFromApiBackup: classesFromApi,
      classesFromApi,
      deletedNodes,
      objectPropertiesFromApi,
      stylingNodeCaptionProperty: 'rdfsLabel',
      objectPropertiesFromApiBackup: objectPropertiesFromApi,
      nodesConnections,
      triplesPerNode,
      triplesPerNodeBackup: triplesPerNode
    }))

    getNode.mockImplementation(() => ({ id: '123' }))

    getEdgeObject.mockImplementation(() => ({
      rdfAbout: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
      rdfsLabel: 'Provided to',
      label: 'Provided to',
      predicate: '11',
      id: '11',
      from: '1',
      to: '141',
    }))

    await setOntologyRestoreNode({
      selectedElement,
      setStoreState,
    })

    expect(setElementsStyle).toHaveBeenCalledWith()
    expect(addNode).toHaveBeenLastCalledWith(
      {
        'Business Area': 'Maintain Operate',
        Synonym: 'Warehouse',
        id: '40',
        label: 'Depot',
        nodeId: 40,
        rdfAbout: 'http://webprotege.stanford.edu/R83KomHAvFWv2pVoHXCAC7M',
        rdfsLabel: 'Depot',
        skosDefinition: 'A facility used by the License Holder or supplier for the purpose of storing the fleet and equipment to enable the maintenance and operation of the Strategic Road Network Assets.',
        userDefined: false,
      }
    )
    expect(addEdge).toHaveBeenLastCalledWith(
      {
        from: '1',
        id: '11',
        label: 'Provided to',
        predicate: '11',
        rdfAbout: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
        rdfsLabel: 'Provided to',
        to: '141'
      }
    )
    expect(setStoreState.mock.calls).toEqual(setStoreStateFixture)
  })
})
