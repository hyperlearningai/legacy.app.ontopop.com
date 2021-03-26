/* eslint max-len:0 */
import setOntologyRestoreNode from '../../../utils/editOntology/setOntologyRestoreNode'
import store from '../../../store'
import { classesFromApi } from '../../fixtures/classesFromApi'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import { totalEdgesPerNode } from '../../fixtures/totalEdgesPerNode'
import getNode from '../../../utils/nodesEdgesUtils/getNode'
import addNode from '../../../utils/nodesEdgesUtils/addNode'
import addEdge from '../../../utils/nodesEdgesUtils/addEdge'
import en from '../../../i18n/en'
import httpCall from '../../../utils/apiCalls/httpCall'
import showNotification from '../../../utils/notifications/showNotification'

import checkNodeVisibility from '../../../utils/networkGraphOptions/checkNodeVisibility'
import checkEdgeVisibility from '../../../utils/networkGraphOptions/checkEdgeVisibility'
import {
  OPERATION_TYPE_ARRAY_DELETE,
  OPERATION_TYPE_DELETE,
  OPERATION_TYPE_PUSH_UNIQUE,
  OPERATION_TYPE_UPDATE
} from '../../../constants/store'

const selectedElement = ['100', '40']

const updateStoreValue = jest.fn()
const t = (id) => en[id]

jest.mock('../../../utils/nodesEdgesUtils/getNode')
jest.mock('../../../utils/networkStyling/getElementLabel')
jest.mock('../../../utils/nodesEdgesUtils/addNode')
jest.mock('../../../utils/nodesEdgesUtils/addEdge')
jest.mock('../../../utils/apiCalls/httpCall')
jest.mock('../../../utils/notifications/showNotification')
jest.mock('../../../utils/networkGraphOptions/checkNodeVisibility')
jest.mock('../../../utils/networkGraphOptions/checkEdgeVisibility')

store.getState = jest.fn().mockImplementation(() => ({
  classesFromApiBackup: classesFromApi,
  objectPropertiesFromApiBackup: objectPropertiesFromApi,
  totalEdgesPerNodeBackup: totalEdgesPerNode,
}))

checkNodeVisibility.mockImplementation(() => true)
checkEdgeVisibility.mockImplementation(() => true)

describe('setOntologyRestoreNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when error', async () => {
    httpCall.mockImplementation(() => ({ error: true }))

    await setOntologyRestoreNode({
      updateStoreValue,
      selectedElement,
      t
    })

    expect(showNotification).toHaveBeenLastCalledWith(
      {
        message: 'Could not restore node: 40',
        type: 'warning'
      }
    )
  })

  it('should work correctly when no data', async () => {
    httpCall.mockImplementation(() => ({ data: {} }))

    await setOntologyRestoreNode({
      updateStoreValue,
      selectedElement,
      t
    })

    expect(showNotification).toHaveBeenLastCalledWith(
      {
        message: 'Could not restore node: 40',
        type: 'warning'
      }
    )
  })

  it('should work correctly', async () => {
    httpCall.mockImplementation(() => ({
      data: {
        12: { id: '12' }
      }
    }))

    getNode.mockImplementation(() => ({ id: '123' }))

    await setOntologyRestoreNode({
      updateStoreValue,
      selectedElement,
      t
    })

    expect(addNode).toHaveBeenLastCalledWith(
      {
        node: {
          Type: 'Sketch',
          id: '12',
          label: 'class',
          name: 'Drawing',
          nodeId: 40,
          nodeType: 'class',
          rdfAbout: 'http://webprotege.stanford.edu/R7ziZlwBCU3dDShTGeoBjYR',
          rdfsLabel: 'Drawing',
          skosDefinition: 'A Design Representation intended to visually communicate the properties of an Asset or system of Assets.',
          upperOntology: false,
          userDefined: false
        },
        updateStoreValue
      }
    )
    expect(addEdge).toHaveBeenLastCalledWith(
      {
        edge: {
          edgeId: 1062,
          from: '106',
          id: '1062',
          label: 'Subclass of',
          rdfsLabel: 'Subclass of',
          role: 'Subclass of',
          to: '100',
          userDefined: false
        },
        updateStoreValue
      }
    )
    expect(updateStoreValue.mock.calls).toEqual(
      [[['deletedNodes'], OPERATION_TYPE_ARRAY_DELETE, '100'],
        [['addedNodes'], OPERATION_TYPE_PUSH_UNIQUE, '12'],
        [['classesFromApiBackup', '100'], OPERATION_TYPE_DELETE],
        [['classesFromApi', '12'], OPERATION_TYPE_UPDATE, {
          id: '12',
          label: 'class',
          name: 'Geometric Component',
          nodeId: 100,
          nodeType: 'class',
          rdfAbout: 'http://webprotege.stanford.edu/RB6vzK57zLwceWuRwWA1usg',
          rdfsLabel: 'Geometric Component',
          skosDefinition: 'The basic building blocks of geometric objects.',
          upperOntology: false,
          userDefined: false
        }], [['classesFromApiBackup', '12'], OPERATION_TYPE_UPDATE, {
          id: '12',
          label: 'class',
          name:
          'Geometric Component',
          nodeId: 100,
          nodeType: 'class',
          rdfAbout: 'http://webprotege.stanford.edu/RB6vzK57zLwceWuRwWA1usg',
          rdfsLabel: 'Geometric Component',
          skosDefinition: 'The basic building blocks of geometric objects.',
          upperOntology: false,
          userDefined: false
        }], [['totalEdgesPerNode', '12'], OPERATION_TYPE_UPDATE, []], [['totalEdgesPerNodeBackup', '12'], OPERATION_TYPE_UPDATE, []], [['nodesEdges', '12'], OPERATION_TYPE_UPDATE, []], [['deletedNodes'], OPERATION_TYPE_ARRAY_DELETE, '40'], [['addedNodes'], OPERATION_TYPE_PUSH_UNIQUE, '12'], [['classesFromApiBackup', '40'], OPERATION_TYPE_DELETE], [['classesFromApi', '12'], OPERATION_TYPE_UPDATE, {
          Type: 'Sketch',
          id: '12',
          label: 'class',
          name: 'Drawing',
          nodeId: 40,
          nodeType: 'class',
          rdfAbout: 'http://webprotege.stanford.edu/R7ziZlwBCU3dDShTGeoBjYR',
          rdfsLabel: 'Drawing',
          skosDefinition: 'A Design Representation intended to visually communicate the properties of an Asset or system of Assets.',
          upperOntology: false,
          userDefined: false
        }], [['classesFromApiBackup', '12'], OPERATION_TYPE_UPDATE, {
          Type: 'Sketch',
          id: '12',
          label: 'class',
          name: 'Drawing',
          nodeId: 40,
          nodeType: 'class',
          rdfAbout: 'http://webprotege.stanford.edu/R7ziZlwBCU3dDShTGeoBjYR',
          rdfsLabel: 'Drawing',
          skosDefinition: 'A Design Representation intended to visually communicate the properties of an Asset or system of Assets.',
          upperOntology: false,
          userDefined: false
        }], [['totalEdgesPerNode', '12'], OPERATION_TYPE_UPDATE, []], [['totalEdgesPerNodeBackup', '12'], OPERATION_TYPE_UPDATE, []], [['nodesEdges', '12'], OPERATION_TYPE_UPDATE, []], [['objectPropertiesFromApi', '401'], OPERATION_TYPE_UPDATE, {
          edgeId: 401,
          from: '40',
          id: '401',
          label: 'Subclass of',
          rdfsLabel: 'Subclass of',
          role: 'Subclass of',
          to: '162',
          userDefined: false
        }], [['objectPropertiesFromApiBackup', '401'], OPERATION_TYPE_UPDATE, {
          edgeId: 401, from: '40', id: '401', label: 'Subclass of', rdfsLabel: 'Subclass of', role: 'Subclass of', to: '162', userDefined: false
        }], [['totalEdgesPerNode', '40'], OPERATION_TYPE_PUSH_UNIQUE, '401'], [['totalEdgesPerNodeBackup', '162'], OPERATION_TYPE_PUSH_UNIQUE, '401'], [['nodesEdges', '40'], OPERATION_TYPE_PUSH_UNIQUE, '401'], [['nodesEdges', '162'], OPERATION_TYPE_PUSH_UNIQUE, '401'], [['objectPropertiesFromApi', '421'], OPERATION_TYPE_UPDATE, {
          edgeId: 421,
          from: '42',
          id: '421',
          label: 'Composed of',
          rdfAbout: 'http://webprotege.stanford.edu/RqeoNxhIUKNWDOrBxWFusJ',
          rdfsLabel: 'Composed of',
          role: 'Composed of',
          to: '100',
          userDefined: false
        }], [['objectPropertiesFromApiBackup', '421'], OPERATION_TYPE_UPDATE, {
          edgeId: 421,
          from: '42',
          id: '421',
          label: 'Composed of',
          rdfAbout: 'http://webprotege.stanford.edu/RqeoNxhIUKNWDOrBxWFusJ',
          rdfsLabel: 'Composed of',
          role: 'Composed of',
          to: '100',
          userDefined: false
        }], [['totalEdgesPerNode', '42'], OPERATION_TYPE_PUSH_UNIQUE, '421'], [['totalEdgesPerNodeBackup', '100'], OPERATION_TYPE_PUSH_UNIQUE, '421'], [['nodesEdges', '42'], OPERATION_TYPE_PUSH_UNIQUE, '421'], [['nodesEdges', '100'], OPERATION_TYPE_PUSH_UNIQUE, '421'], [['objectPropertiesFromApi', '511'], OPERATION_TYPE_UPDATE, {
          edgeId: 511,
          from: '51',
          id: '511',
          label: 'Subclass of',
          rdfsLabel: 'Subclass of',
          role: 'Subclass of',
          to: '100',
          userDefined: false
        }], [['objectPropertiesFromApiBackup', '511'], OPERATION_TYPE_UPDATE, {
          edgeId: 511,
          from: '51',
          id: '511',
          label: 'Subclass of',
          rdfsLabel: 'Subclass of',
          role: 'Subclass of',
          to: '100',
          userDefined: false
        }], [['totalEdgesPerNode', '51'], OPERATION_TYPE_PUSH_UNIQUE, '511'], [['totalEdgesPerNodeBackup', '100'], OPERATION_TYPE_PUSH_UNIQUE, '511'], [['nodesEdges', '51'], OPERATION_TYPE_PUSH_UNIQUE, '511'], [['nodesEdges', '100'], OPERATION_TYPE_PUSH_UNIQUE, '511'], [['objectPropertiesFromApi', '1001'], OPERATION_TYPE_UPDATE, {
          edgeId: 1001, from: '100', id: '1001', label: 'Subclass of', rdfsLabel: 'Subclass of', role: 'Subclass of', to: '18', userDefined: false
        }], [['objectPropertiesFromApiBackup', '1001'], OPERATION_TYPE_UPDATE, {
          edgeId: 1001,
          from: '100',
          id: '1001',
          label: 'Subclass of',
          rdfsLabel: 'Subclass of',
          role: 'Subclass of',
          to: '18',
          userDefined: false
        }], [['totalEdgesPerNode', '100'], OPERATION_TYPE_PUSH_UNIQUE, '1001'], [['totalEdgesPerNodeBackup', '18'], OPERATION_TYPE_PUSH_UNIQUE, '1001'], [['nodesEdges', '100'], OPERATION_TYPE_PUSH_UNIQUE, '1001'], [['nodesEdges', '18'], OPERATION_TYPE_PUSH_UNIQUE, '1001'], [['objectPropertiesFromApi', '1021'], OPERATION_TYPE_UPDATE, {
          edgeId: 1021,
          from: '102',
          id: '1021',
          label: 'Subclass of',
          rdfsLabel: 'Subclass of',
          role: 'Subclass of',
          to: '100',
          userDefined: false
        }], [['objectPropertiesFromApiBackup', '1021'], OPERATION_TYPE_UPDATE, {
          edgeId: 1021,
          from: '102',
          id: '1021',
          label: 'Subclass of',
          rdfsLabel: 'Subclass of',
          role: 'Subclass of',
          to: '100',
          userDefined: false
        }], [['totalEdgesPerNode', '102'], OPERATION_TYPE_PUSH_UNIQUE, '1021'], [['totalEdgesPerNodeBackup', '100'], OPERATION_TYPE_PUSH_UNIQUE, '1021'], [['nodesEdges', '102'], OPERATION_TYPE_PUSH_UNIQUE, '1021'], [['nodesEdges', '100'], OPERATION_TYPE_PUSH_UNIQUE, '1021'], [['objectPropertiesFromApi', '1041'], OPERATION_TYPE_UPDATE, {
          edgeId: 1041,
          from: '104',
          id: '1041',
          label: 'Subclass of',
          rdfsLabel: 'Subclass of',
          role: 'Subclass of',
          to: '100',
          userDefined: false
        }], [['objectPropertiesFromApiBackup', '1041'], OPERATION_TYPE_UPDATE, {
          edgeId: 1041,
          from: '104',
          id: '1041',
          label: 'Subclass of',
          rdfsLabel: 'Subclass of',
          role: 'Subclass of',
          to: '100',
          userDefined: false
        }], [
          ['totalEdgesPerNode', '104'], OPERATION_TYPE_PUSH_UNIQUE, '1041'], [
          ['totalEdgesPerNodeBackup', '100'], OPERATION_TYPE_PUSH_UNIQUE, '1041'], [['nodesEdges', '104'], OPERATION_TYPE_PUSH_UNIQUE, '1041'], [['nodesEdges', '100'], OPERATION_TYPE_PUSH_UNIQUE, '1041'], [['objectPropertiesFromApi', '1062'], OPERATION_TYPE_UPDATE, {
          edgeId: 1062,
          from: '106',
          id: '1062',
          label: 'Subclass of',
          rdfsLabel: 'Subclass of',
          role: 'Subclass of',
          to: '100',
          userDefined: false
        }], [['objectPropertiesFromApiBackup', '1062'], OPERATION_TYPE_UPDATE, {
          edgeId: 1062,
          from: '106',
          id: '1062',
          label: 'Subclass of',
          rdfsLabel: 'Subclass of',
          role: 'Subclass of',
          to: '100',
          userDefined: false
        }], [['totalEdgesPerNode', '106'], OPERATION_TYPE_PUSH_UNIQUE,
          '1062'], [['totalEdgesPerNodeBackup', '100'],
          OPERATION_TYPE_PUSH_UNIQUE, '1062'], [['nodesEdges', '106'],
          OPERATION_TYPE_PUSH_UNIQUE, '1062'], [['nodesEdges', '100'],
          OPERATION_TYPE_PUSH_UNIQUE, '1062']]

    )
  })
})
