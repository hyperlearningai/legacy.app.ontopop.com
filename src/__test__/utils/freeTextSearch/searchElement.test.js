import searchElement from '../../../utils/freeTextSearch/searchElement'
import { classesFromApi } from '../../fixtures/classesFromApi'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'
import store from '../../../store'
import getNodeIds from '../../../utils/nodesEdgesUtils/getNodeIds'
import getEdgeIds from '../../../utils/nodesEdgesUtils/getEdgeIds'

const setStoreState = jest.fn()

store.getState = jest.fn().mockImplementation(() => ({
  classesFromApi,
  objectPropertiesFromApi,
}))

jest.mock('../../../utils/nodesEdgesUtils/getNodeIds')
jest.mock('../../../utils/nodesEdgesUtils/getEdgeIds')

describe('searchElement', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should set freeTextSelection as empty when no seasrch', async () => {
    const search = ''

    await searchElement({
      search,
      setStoreState
    })

    expect(setStoreState).toHaveBeenCalledWith(
      'freeTextSelection', { }
    )
  })

  it('should set freeTextSelection', async () => {
    const search = 'pro'

    getNodeIds.mockImplementation(() => ([
      '1',
      '2'
    ]))
    getEdgeIds.mockImplementation(() => ([
      '11',
      '12'
    ]))

    await searchElement({
      search,
      setStoreState
    })

    expect(setStoreState).toHaveBeenCalledWith(
      'freeTextSelection', {
        1: {
          'Business Area': 'Communications',
          id: '1',
          label: 'Communication Document',
          name: 'Communication Document',
          nodeId: 1,
          nodeType: 'class',
          rdfAbout: 'http://webprotege.stanford.edu/R0jI731hv09ZcJeji1fbtY',
          rdfsLabel: 'Communication Document',
          skosComment: 'A communication will typically have the Licence Holder (Highways England) as one of the parties.',
          skosDefinition: 'Document storing the information conveyed between two or more parties.',
          type: 'node',
          upperOntology: false,
          userDefined: false,
        },
        11: {
          edgeId: 11,
          from: '1',
          id: '11',
          label: 'Provided to',
          rdfAbout: 'http://webprotege.stanford.edu/RXaMAxdkuV5CvgEpovEVvp',
          rdfsLabel: 'Provided to',
          role: 'Provided to',
          to: '177',
          type: 'edge',
          userDefined: false,
        },
        2: {
          'Business Area': 'Maintain Plan',
          id: '2',
          label: 'Programme',
          name: 'Programme',
          nodeId: 2,
          nodeType: 'class',
          rdfAbout: 'http://webprotege.stanford.edu/R0qk59fxFmgNbyUncZoU8M',
          rdfsLabel: 'Programme',
          skosComment: 'A strategic goal that is achieved through a number of projects.',
          skosDefinition: 'A collection of projects or tasks undertaken to realise a strategic goal.',
          skosExample: 'Develop connectivity between London and Inverness.',
          type: 'node',
          upperOntology: false,
          userDefined: false,
        },
      }
    )
  })
})
