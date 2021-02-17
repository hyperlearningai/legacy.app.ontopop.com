/* eslint max-len:0 */
import setOntologyAddNode from '../../../utils/editOntology/setOntologyAddNode'
import store from '../../../store'
import { OwlClasses } from '../../fixtures/test-ontology-classes.json'
import en from '../../../i18n/en'
import addNode from '../../../utils/nodesEdgesUtils/addNode'
import { LABEL_PROPERTY, UNIQUE_PROPERTY } from '../../../constants/graph'
import showNotification from '../../../utils/showNotification'
import getNode from '../../../utils/nodesEdgesUtils/getNode'
import setNodeStyle from '../../../utils/networkStyling/setNodeStyle'

const setStoreState = jest.fn()
const t = (id) => en[id]
jest.mock('../../../utils/showNotification')
jest.mock('../../../utils/nodesEdgesUtils/addNode')
jest.mock('../../../utils/nodesEdgesUtils/getNode')
jest.mock('../../../utils/networkStyling/setNodeStyle')

describe('setOntologyAddNode', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when node exists', async () => {
    const selectedElementProperties = {
      rdfAbout: 'http://test.com/node',
      rdfsLabel: 'New node',
      'http://webprotege.stanford.edu/R8Zrr9RnWOq4DeZDzBOW2J4': 'Another node'
    }

    getNode.mockImplementationOnce(() => ({ id: 'http://test.com/node' }))

    store.getState = jest.fn().mockImplementation(() => ({
      nodesConnections: {},
      triplesPerNode: {},
      classesFromApi: OwlClasses,
      addedNodes: [],
      stylingNodeCaptionProperty: LABEL_PROPERTY
    }))

    await setOntologyAddNode({
      setStoreState,
      selectedElementProperties,
      t
    })

    expect(showNotification).toHaveBeenCalledWith(
      {
        message: 'Node ID already exists: http://test.com/node',
        type: 'warning'
      }
    )
  })

  it('should work correctly', async () => {
    const selectedElementProperties = {
      [UNIQUE_PROPERTY]: 'http://test.com/node',
      [LABEL_PROPERTY]: 'New node',
      'http://webprotege.stanford.edu/R8Zrr9RnWOq4DeZDzBOW2J4': 'Another node'
    }

    getNode.mockImplementationOnce(() => null)

    store.getState = jest.fn().mockImplementation(() => ({
      nodesConnections: {},
      triplesPerNode: {},
      classesFromApi: OwlClasses,
      addedNodes: [],
      stylingNodeCaptionProperty: LABEL_PROPERTY
    }))

    await setOntologyAddNode({
      setStoreState,
      selectedElementProperties,
      t
    })

    expect(addNode).toHaveBeenCalledWith(
      { id: 'http://test.com/node', label: 'New node', rdfsLabel: 'New node' }
    )

    expect(setNodeStyle).toHaveBeenCalledWith(
      { nodeId: 'http://test.com/node' }
    )

    expect(setStoreState.mock.calls).toEqual(
      [
        [
          'nodesConnections',
          {
            'http://test.com/node': []
          }
        ],
        [
          'triplesPerNode',
          {
            'http://test.com/node': []
          }
        ],
        [
          'classesFromApi',
          {
            'http://test.com/node': {
              label: 'New node',
              owlAnnotationProperties: {
                'http://webprotege.stanford.edu/R8Zrr9RnWOq4DeZDzBOW2J4': 'Another node',
              },
              rdfsLabel: 'New node',
            },
            ...OwlClasses
          },
        ],
        [
          'addedNodes',
          ['http://test.com/node']
        ]
      ]
    )
  })
})
