/* eslint max-len:0 */
import setOntologyAddEdge from '../../../utils/editOntology/setOntologyAddEdge'
import store from '../../../store'
import { OwlObjectProperties } from '../../fixtures/test-ontology-object-properties.json'
import en from '../../../i18n/en'
import showNotification from '../../../utils/showNotification'
import { LABEL_PROPERTY } from '../../../constants/graph'

const t = (id) => en[id]
const setStoreState = jest.fn()

jest.mock('../../../utils/showNotification')

describe('setOntologyAddEdge', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when node exists', async () => {
    const selectedElementProperties = {
      rdfAbout: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
      rdfsLabel: 'New node',
      'http://webprotege.stanford.edu/R8Zrr9RnWOq4DeZDzBOW2J4': 'Another node'
    }

    store.getState = jest.fn().mockImplementation(() => ({
      edgesConnections: {},
      objectPropertiesFromApi: OwlObjectProperties,
      addedEdges: [],
      stylingEdgeCaptionProperty: LABEL_PROPERTY
    }))

    await setOntologyAddEdge({
      setStoreState,
      selectedElementProperties,
      t
    })

    expect(showNotification).toHaveBeenCalledWith(
      {
        message: 'Edge ID already exists: http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
        type: 'warning'
      }
    )
  })

  it('should work correctly', async () => {
    const selectedElementProperties = {
      rdfAbout: 'http://test.com/edge',
      rdfsLabel: 'New edge',
      'http://webprotege.stanford.edu/R8Zrr9RnWOq4DeZDzBOW2J4': 'Another edge'
    }

    const getState = jest.fn().mockImplementationOnce(() => ({
      edgesConnections: {},
      objectPropertiesFromApi: OwlObjectProperties,
      addedEdges: [],
      stylingEdgeCaptionProperty: LABEL_PROPERTY
    }))
    store.getState = getState

    await setOntologyAddEdge({
      setStoreState,
      selectedElementProperties,
      t
    })

    expect(setStoreState.mock.calls).toEqual([
      [
        'edgesConnections',
        {
          'http://test.com/edge': []
        }
      ],
      [
        'objectPropertiesFromApi',
        {
          'http://test.com/edge': {
            label: 'New edge',
            owlAnnotationProperties: {
              'http://webprotege.stanford.edu/R8Zrr9RnWOq4DeZDzBOW2J4': 'Another edge',
            },
            rdfsLabel: 'New edge',
          },
          ...OwlObjectProperties
        },
      ],
      [
        'addedEdges',
        ['http://test.com/edge']
      ]
    ])
  })
})
