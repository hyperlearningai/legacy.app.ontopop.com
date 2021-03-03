/* eslint max-len:0 */
import setOntologyAddNode from '../../../utils/editOntology/setOntologyAddNode'
import store from '../../../store'
import { classesFromApi } from '../../fixtures/classesFromApi'
import { edgesPerNode } from '../../fixtures/edgesPerNodeNew'
import en from '../../../i18n/en'
import addNode from '../../../utils/nodesEdgesUtils/addNode'
import { LABEL_PROPERTY, UNIQUE_PROPERTY } from '../../../constants/graph'
import showNotification from '../../../utils/notifications/showNotification'
import setNodeStyle from '../../../utils/networkStyling/setNodeStyle'
import httpCall from '../../../utils/apiCalls/httpCall'

const setStoreState = jest.fn()
const t = (id) => en[id]
jest.mock('../../../utils/notifications/showNotification')
jest.mock('../../../utils/nodesEdgesUtils/addNode')
jest.mock('../../../utils/networkStyling/setNodeStyle')
jest.mock('../../../utils/apiCalls/httpCall')

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
      edgesPerNode,
      edgesPerNodeBackup: edgesPerNode,
      classesFromApi,
      classesFromApiBackup: classesFromApi,
      addedNodes: [],
      userDefinedNodeStyling: { stylingNodeCaptionProperty: LABEL_PROPERTY },
    }))

    await setOntologyAddNode({
      setStoreState,
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
      edgesPerNode,
      edgesPerNodeBackup: edgesPerNode,
      classesFromApi,
      classesFromApiBackup: classesFromApi,
      addedNodes: [],
      userDefinedNodeStyling: { stylingNodeCaptionProperty: LABEL_PROPERTY },
    }))

    await setOntologyAddNode({
      setStoreState,
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
      [UNIQUE_PROPERTY]: '123',
      [LABEL_PROPERTY]: 'New node',
      'http://webprotege.stanford.edu/R8Zrr9RnWOq4DeZDzBOW2J4': 'Another node'
    }

    httpCall.mockImplementationOnce(() => ({
      data: {
        123: {
          id: '123',
          userDefined: true
        }
      }
    }))

    store.getState = jest.fn().mockImplementation(() => ({
      nodesEdges: {},
      edgesPerNode,
      edgesPerNodeBackup: edgesPerNode,
      classesFromApi,
      classesFromApiBackup: classesFromApi,
      addedNodes: [],
      userDefinedNodeStyling: { stylingNodeCaptionProperty: LABEL_PROPERTY },
    }))

    await setOntologyAddNode({
      setStoreState,
      selectedElementProperties,
      t
    })

    expect(addNode).toHaveBeenCalledWith(
      {
        borderWidth: undefined,
        borderWidthSelected: undefined,
        color: {
          background: undefined,
          border: undefined,
          highlight: {
            background: undefined,
            border: undefined,
          },
          hover: {
            background: undefined,
            border: undefined,
          },
        },
        font: {
          align: undefined,
          bold: '700',
          color: undefined,
          face: 'Montserrat',
          size: undefined,
        },
        'http://webprotege.stanford.edu/R8Zrr9RnWOq4DeZDzBOW2J4': 'Another node',
        id: '123',
        label: 'New\nnode',
        rdfAbout: '123',
        rdfsLabel: 'New node',
        shape: undefined,
        size: undefined,
        userDefined: true,
      }
    )

    expect(setNodeStyle).toHaveBeenCalledWith(
      { nodeId: '123' }
    )

    expect(setStoreState.mock.calls).toEqual(
      [
        [
          'nodesEdges',
          {
            123: []
          }
        ],
        [
          'edgesPerNode',
          {
            ...edgesPerNode,
            123: []
          }
        ],
        [
          'edgesPerNodeBackup',
          {
            ...edgesPerNode,
            123: []
          }
        ],
        [
          'classesFromApi',
          {
            ...classesFromApi,
            123: {
              id: '123',
              'http://webprotege.stanford.edu/R8Zrr9RnWOq4DeZDzBOW2J4': 'Another node',
              label: 'New\nnode',
              rdfAbout: '123',
              rdfsLabel: 'New node',
              userDefined: true,
            },
          },
        ],
        [
          'classesFromApiBackup',
          {
            ...classesFromApi,
            123: {
              id: '123',
              'http://webprotege.stanford.edu/R8Zrr9RnWOq4DeZDzBOW2J4': 'Another node',
              label: 'New\nnode',
              rdfAbout: '123',
              rdfsLabel: 'New node',
              userDefined: true,
            },
          },
        ],
        [
          'addedNodes',
          ['123']
        ]
      ]
    )
  })
})
