/* eslint max-len:0 */
import setOntologyUpdateNode from '../../../utils/editOntology/setOntologyUpdateNode'
import store from '../../../store'
import { classesFromApi } from '../../fixtures/classesFromApi'
import updateNodes from '../../../utils/nodesEdgesUtils/updateNodes'
import httpCall from '../../../utils/apiCalls/httpCall'
import showNotification from '../../../utils/notifications/showNotification'
import en from '../../../i18n/en'
import { OPERATION_TYPE_UPDATE } from '../../../constants/store'

const updateStoreValue = jest.fn()
const selectedElementProperties = {
  rdfAbout: 'http://test.com/node',
  rdfsLabel: 'New node',
}
const selectedElement = '1'

const updatedNode = {
  id: '1',
  label: 'New\nnode',
  rdfsLabel: 'New node',
  name: 'Communication Document',
  'Business Area': 'Communications',
  nodeId: 1,
  nodeType: 'class',
  title: 'New\nnode',
  rdfAbout: 'http://test.com/node',
  skosComment: 'A communication will typically have the Licence Holder (Highways England) as one of the parties.',
  skosDefinition: 'Document storing the information conveyed between two or more parties.',
  userDefined: false,
  upperOntology: false,
}

const newClassesFromApi = JSON.parse(JSON.stringify(classesFromApi))
newClassesFromApi[selectedElement] = {
  ...newClassesFromApi[selectedElement],
  ...updatedNode,
  label: 'New node',
}

const t = (id) => en[id]

jest.mock('../../../utils/notifications/showNotification')
jest.mock('../../../utils/nodesEdgesUtils/updateNodes')
jest.mock('../../../utils/networkStyling/setNodeStyle')
jest.mock('../../../utils/apiCalls/httpCall')

describe('setOntologyUpdateNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when error', async () => {
    httpCall.mockImplementationOnce(() => ({ error: true }))

    store.getState = jest.fn().mockImplementation(() => ({
      userDefinedNodeStyling: { stylingNodeCaptionProperty: 'rdfsLabel' },
      classesFromApi,
      updatedNodes: [],
    }))

    await setOntologyUpdateNode({
      updateStoreValue,
      selectedElement,
      selectedElementProperties,
      t
    })

    expect(showNotification).toHaveBeenCalledWith(
      {
        message: 'Could not update node',
        type: 'warning'
      }
    )
  })

  it('should work correctly when no data', async () => {
    httpCall.mockImplementationOnce(() => ({ data: {} }))

    store.getState = jest.fn().mockImplementation(() => ({
      userDefinedNodeStyling: { stylingNodeCaptionProperty: 'rdfsLabel' },
      classesFromApi,
      updatedNodes: [],
    }))

    await setOntologyUpdateNode({
      updateStoreValue,
      selectedElement,
      selectedElementProperties,
      t
    })

    expect(showNotification).toHaveBeenCalledWith(
      {
        message: 'Could not update node',
        type: 'warning'
      }
    )
  })

  it('should work correctly', async () => {
    httpCall.mockImplementationOnce(() => ({
      data: {
        1: {
          id: '1',
          userDefined: true
        }
      }
    }))

    store.getState = jest.fn().mockImplementationOnce(() => ({
      userDefinedNodeStyling: { stylingNodeCaptionProperty: 'rdfsLabel' },
      classesFromApi,
      updatedNodes: [],
    }))

    await setOntologyUpdateNode({
      updateStoreValue,
      selectedElement,
      selectedElementProperties,
      t
    })

    expect(updateNodes).toHaveBeenLastCalledWith(
      updatedNode
    )

    const classesFromApiOutput = JSON.parse(JSON.stringify(newClassesFromApi))
    classesFromApiOutput['1'].label = 'New\nnode'

    expect(updateStoreValue.mock.calls).toEqual([
      [
        ['classesFromApi'],
        OPERATION_TYPE_UPDATE,
        classesFromApiOutput
      ],
      [
        ['updatedNodes'],
        OPERATION_TYPE_UPDATE,
        ['1']
      ]
    ])
  })
})
