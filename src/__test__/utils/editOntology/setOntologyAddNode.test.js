/* eslint max-len:0 */
import setOntologyAddNode from '../../../utils/editOntology/setOntologyAddNode'
import store from '../../../store'
import { classesFromApi } from '../../fixtures/classesFromApi'
import { totalEdgesPerNode } from '../../fixtures/totalEdgesPerNode'
import en from '../../../i18n/en'
import addNode from '../../../utils/nodesEdgesUtils/addNode'
import { LABEL_PROPERTY, RDF_ABOUT_PROPERTY } from '../../../constants/graph'
import showNotification from '../../../utils/notifications/showNotification'
import httpCall from '../../../utils/apiCalls/httpCall'
import checkNodeVisibility from '../../../utils/networkGraphOptions/checkNodeVisibility'
import checkEdgeVisibility from '../../../utils/networkGraphOptions/checkEdgeVisibility'
import { OPERATION_TYPE_PUSH_UNIQUE, OPERATION_TYPE_UPDATE } from '../../../constants/store'

const updateStoreValue = jest.fn()

const t = (id) => en[id]
jest.mock('../../../utils/notifications/showNotification')
jest.mock('../../../utils/nodesEdgesUtils/addNode')
jest.mock('../../../utils/networkStyling/setNodeStyle')
jest.mock('../../../utils/apiCalls/httpCall')
jest.mock('../../../utils/networkGraphOptions/checkNodeVisibility')
jest.mock('../../../utils/networkGraphOptions/checkEdgeVisibility')

checkNodeVisibility.mockImplementation(() => true)
checkEdgeVisibility.mockImplementation(() => true)

describe('setOntologyAddNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when error', async () => {
    const selectedElementProperties = {
      rdfAbout: '123',
      rdfsLabel: 'New node',
      'http://webprotege.stanford.edu/R8Zrr9RnWOq4DeZDzBOW2J4': 'Another node'
    }

    httpCall.mockImplementationOnce(() => ({ error: true }))

    store.getState = jest.fn().mockImplementation(() => ({
      nodesEdges: {},
      totalEdgesPerNode,
      totalEdgesPerNodeBackup: totalEdgesPerNode,
      classesFromApi,
      classesFromApiBackup: classesFromApi,
      addedNodes: [],
      userDefinedNodeStyling: { stylingNodeCaptionProperty: LABEL_PROPERTY },
    }))

    await setOntologyAddNode({
      updateStoreValue,
      selectedElementProperties,
      t
    })

    expect(showNotification).toHaveBeenCalledWith(
      {
        message: 'Could not add node',
        type: 'warning'
      }
    )
  })

  it('should work correctly when no data', async () => {
    const selectedElementProperties = {
      rdfAbout: '123',
      rdfsLabel: 'New node',
      'http://webprotege.stanford.edu/R8Zrr9RnWOq4DeZDzBOW2J4': 'Another node'
    }

    httpCall.mockImplementationOnce(() => ({ data: {} }))

    store.getState = jest.fn().mockImplementation(() => ({
      nodesEdges: {},
      totalEdgesPerNode,
      totalEdgesPerNodeBackup: totalEdgesPerNode,
      classesFromApi,
      classesFromApiBackup: classesFromApi,
      addedNodes: [],
      userDefinedNodeStyling: { stylingNodeCaptionProperty: LABEL_PROPERTY },
    }))

    await setOntologyAddNode({
      updateStoreValue,
      selectedElementProperties,
      t
    })

    expect(showNotification).toHaveBeenCalledWith(
      {
        message: 'Could not add node',
        type: 'warning'
      }
    )
  })

  it('should work correctly', async () => {
    const selectedElementProperties = {
      [RDF_ABOUT_PROPERTY]: '123',
      [LABEL_PROPERTY]: 'New node',
      'http://webprotege.stanford.edu/R8Zrr9RnWOq4DeZDzBOW2J4': 'Another node'
    }

    httpCall.mockImplementationOnce(() => ({
      data: {
        123: {
          id: '123',
          userDefined: true,
          userId: 'valid@email.com'
        }
      }
    }))

    store.getState = jest.fn().mockImplementation(() => ({
      nodesEdges: {},
      totalEdgesPerNode,
      totalEdgesPerNodeBackup: totalEdgesPerNode,
      classesFromApi,
      classesFromApiBackup: classesFromApi,
      addedNodes: [],
      userDefinedNodeStyling: { stylingNodeCaptionProperty: LABEL_PROPERTY },
    }))

    await setOntologyAddNode({
      updateStoreValue,
      selectedElementProperties,
      t
    })

    expect(addNode).toHaveBeenCalledWith(
      {
        updateStoreValue,
        node: {
          'http://webprotege.stanford.edu/R8Zrr9RnWOq4DeZDzBOW2J4': 'Another node',
          id: '123',
          nodeType: undefined,
          rdfAbout: '123',
          rdfsLabel: 'New node',
          userDefined: true,
          userId: 'valid@email.com',
        }
      }
    )

    expect(updateStoreValue.mock.calls).toEqual(
      [
        [['classesFromApi', '123'], OPERATION_TYPE_UPDATE, {
          'http://webprotege.stanford.edu/R8Zrr9RnWOq4DeZDzBOW2J4': 'Another node',
          id: '123',
          nodeType: undefined,
          rdfAbout: '123',
          rdfsLabel: 'New node',
          userDefined: true,
          userId: 'valid@email.com'
        }],
        [['classesFromApiBackup', '123'], OPERATION_TYPE_UPDATE, {
          'http://webprotege.stanford.edu/R8Zrr9RnWOq4DeZDzBOW2J4': 'Another node',
          id: '123',
          nodeType: undefined,
          rdfAbout: '123',
          rdfsLabel: 'New node',
          userDefined: true,
          userId: 'valid@email.com'
        }],
        [['nodesEdges', '123'], OPERATION_TYPE_UPDATE, []],
        [['totalEdgesPerNode', '123'], OPERATION_TYPE_UPDATE, []],
        [['totalEdgesPerNodeBackup', '123'], OPERATION_TYPE_UPDATE, []],
        [['addedNodes'], OPERATION_TYPE_PUSH_UNIQUE, '123'],
        [['nodesSpiderability', '123'], OPERATION_TYPE_UPDATE, 'false']
      ]
    )
  })
})
