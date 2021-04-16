/* eslint max-len:0 */
import searchGraph from '../../../utils/graphSearch/searchGraph'
import store from '../../../store'
import { classesFromApi } from '../../fixtures/classesFromApi'
import { OPERATION_TYPE_OBJECT_ADD, OPERATION_TYPE_PUSH, OPERATION_TYPE_UPDATE } from '../../../constants/store'
import en from '../../../i18n/en'
import httpCall from '../../../utils/apiCalls/httpCall'
import showNotification from '../../../utils/notifications/showNotification'
import { ADVANCED_SEARCH_TEMPLATE } from '../../../constants/search'

const updateStoreValue = jest.fn()
const setLoading = jest.fn()
const t = (id) => en[id]
const value = 'roa'

jest.mock('../../../utils/apiCalls/httpCall')
jest.mock('../../../utils/notifications/showNotification')

const entrySearchResults = [
  {
    'Business Area': 'Maintain Plan Operate Construct Plan',
    'Data Source': 'Confirm',
    Subdomain: 'Construction phase',
    id: '73',
    label: 'Strategic Road Network Asset',
    name: 'Strategic Road Network Asset',
    nodeId: 73,
    nodeType: 'class',
    rdfAbout: 'http://webprotege.stanford.edu/R9H3QGGtwC0XhV4Mfk6Ceep',
    rdfsLabel: 'Strategic Road Network Asset',
    skosDefinition: 'Assets that, when combined, create and support the physical network of roads managed by the Licence Holder known as the Strategic Road Network Asset (which are represented by a Network Model).',
    type: 'node',
    upperOntology: false,
    userDefined: false,
  },
  {
    'Business Area': 'Maintain Construct Plan',
    'Data Source': 'Confirm',
    id: '103',
    label: 'Road Restraint',
    name: 'Road Restraint',
    nodeId: 103,
    nodeType: 'class',
    rdfAbout: 'http://webprotege.stanford.edu/RBBDxx5ZaIbg5ASqGAeyKGg',
    rdfsLabel: 'Road Restraint',
    skosDefinition: 'Assets designed to contain, slow down, and stop errant vehicles, and to protect other Assets and Customers from errant Vehicles.',
    type: 'node',
    upperOntology: false,
    userDefined: false,
  },
  {
    'Business Area': 'Maintain Construct Operate Plan',
    'Data Source': 'NTIS Confirm',
    Subdomain: 'NTIS',
    id: '128',
    label: 'Roadside Operational Technology',
    name: 'Roadside Operational Technology',
    nodeId: 128,
    nodeType: 'class',
    rdfAbout: 'http://webprotege.stanford.edu/RCOdkBizz0dWtRTEjZSfqP8',
    rdfsLabel: 'Roadside Operational Technology',
    skosDefinition: 'Items involved in the digital capture, transfer, or analysis of information specifically related to the Strategic Road Network Asset.',
    skosExample: 'Speed Camera',
    type: 'node',
    upperOntology: false,
    userDefined: false,
  },
  {
    'Business Area': 'Maintain Construct',
    Subdomain: 'Construction phase',
    id: '187',
    label: 'Road Safety Measure',
    name: 'Road Safety Measure',
    nodeId: 187,
    nodeType: 'class',
    rdfAbout: 'http://webprotege.stanford.edu/Rigjqi5P4ZscabU1Pot3hK',
    rdfsLabel: 'Road Safety Measure',
    skosDefinition: 'Methods and measures used to prevent road users and workers from being killed or seriously injured.',
    type: 'node',
    upperOntology: false,
    userDefined: false,
  },
]

describe('searchGraph', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when query error', async () => {
    httpCall.mockImplementation(() => (
      { error: 'apiRequestError' }
    ))

    store.getState = jest.fn().mockImplementation(() => ({
      classesFromApi,
      entrySearchValue: value,
      isFirstQuery: false,
      searchPageSelected: 0,
      dataTypeSearch: 'any',
      upperOntologySearch: 'any',
      advancedSearchFilters: [ADVANCED_SEARCH_TEMPLATE]
    }))

    await searchGraph({
      updateStoreValue,
      setLoading,
      t
    })

    expect(showNotification).toHaveBeenCalledWith(
      { message: 'Could not get search results', type: 'warning' }
    )
    expect(updateStoreValue.mock.calls).toEqual(
      [
        [
          [
            'entrySearchResults',
          ],
          OPERATION_TYPE_UPDATE,
          [],
        ],
        [
          [
            'totalSearchCount',
          ],
          OPERATION_TYPE_UPDATE,
          0,
        ],
        [
          [
            'isSearchLoading',
          ],
          OPERATION_TYPE_UPDATE,
          true,
        ],
        [
          [
            'isSearchLoading',
          ],
          OPERATION_TYPE_UPDATE,
          false,
        ],
        [
          [
            'entrySearchResultsByPage',
          ],
          OPERATION_TYPE_UPDATE,
          {},
        ],
        [
          [
            'entrySearchResults',
          ],
          OPERATION_TYPE_UPDATE,
          [],
        ],
      ]
    )
  })

  it('should work correctly when no search value', async () => {
    httpCall.mockImplementation(() => (
      {
        data: {
          value: entrySearchResults,
          '@odata.count': 80
        }
      }
    ))

    store.getState = jest.fn().mockImplementation(() => ({
      classesFromApi,
      entrySearchValue: '',
      isFirstQuery: false,
      searchPageSelected: 0,
      dataTypeSearch: 'any',
      upperOntologySearch: 'any',
      advancedSearchFilters: [ADVANCED_SEARCH_TEMPLATE]
    }))

    await searchGraph({
      updateStoreValue,
      setLoading,
      t
    })

    expect(updateStoreValue.mock.calls).toEqual(
      [
        [
          [
            'entrySearchResults',
          ],
          OPERATION_TYPE_UPDATE,
          [],
        ],
        [
          [
            'totalSearchCount',
          ],
          OPERATION_TYPE_UPDATE,
          0,
        ],
        [
          [
            'entrySearchResults',
          ],
          OPERATION_TYPE_UPDATE,
          [],
        ],
      ]
    )
  })

  it('should work correctly when all elements', async () => {
    httpCall.mockImplementation(() => (
      {
        data: {
          value: entrySearchResults,
          '@odata.count': 80
        }
      }
    ))

    store.getState = jest.fn().mockImplementation(() => ({
      classesFromApi,
      entrySearchValue: value,
      isFirstQuery: true,
      searchPageSelected: 0,
      dataTypeSearch: 'any',
      upperOntologySearch: 'any',
      advancedSearchFilters: [ADVANCED_SEARCH_TEMPLATE]
    }))

    await searchGraph({
      updateStoreValue,
      setLoading,
      t
    })

    expect(updateStoreValue.mock.calls).toEqual(
      [
        [
          [
            'entrySearchResults',
          ],
          OPERATION_TYPE_UPDATE,
          [],
        ],
        [
          [
            'totalSearchCount',
          ],
          OPERATION_TYPE_UPDATE,
          0,
        ],
        [
          [
            'isSearchLoading',
          ],
          OPERATION_TYPE_UPDATE,
          true,
        ],
        [
          [
            'isFirstQuery',
          ],
          OPERATION_TYPE_UPDATE,
          false,
        ],

        [
          [
            'totalSearchCount',
          ],
          OPERATION_TYPE_UPDATE,
          80,
        ],
        [
          [
            'entrySearchResultsByPage',
          ],
          OPERATION_TYPE_OBJECT_ADD,
          {
            0: [
              {
                'Business Area': 'Maintain Plan Operate Construct Plan',
                'Data Source': 'Confirm',
                Subdomain: 'Construction phase',
                id: '73',
                label: 'Strategic Road Network Asset',
                name: 'Strategic Road Network Asset',
                nodeId: 73,
                nodeType: 'class',
                rdfAbout: 'http://webprotege.stanford.edu/R9H3QGGtwC0XhV4Mfk6Ceep',
                rdfsLabel: 'Strategic Road Network Asset',
                skosDefinition: 'Assets that, when combined, create and support the physical network of roads managed by the Licence Holder known as the Strategic Road Network Asset (which are represented by a Network Model).',
                type: 'node',
                upperOntology: false,
                userDefined: false,
              },
              {
                'Business Area': 'Maintain Construct Plan',
                'Data Source': 'Confirm',
                id: '103',
                label: 'Road Restraint',
                name: 'Road Restraint',
                nodeId: 103,
                nodeType: 'class',
                rdfAbout: 'http://webprotege.stanford.edu/RBBDxx5ZaIbg5ASqGAeyKGg',
                rdfsLabel: 'Road Restraint',
                skosDefinition: 'Assets designed to contain, slow down, and stop errant vehicles, and to protect other Assets and Customers from errant Vehicles.',
                type: 'node',
                upperOntology: false,
                userDefined: false,
              },
              {
                'Business Area': 'Maintain Construct Operate Plan',
                'Data Source': 'NTIS Confirm',
                Subdomain: 'NTIS',
                id: '128',
                label: 'Roadside Operational Technology',
                name: 'Roadside Operational Technology',
                nodeId: 128,
                nodeType: 'class',
                rdfAbout: 'http://webprotege.stanford.edu/RCOdkBizz0dWtRTEjZSfqP8',
                rdfsLabel: 'Roadside Operational Technology',
                skosDefinition: 'Items involved in the digital capture, transfer, or analysis of information specifically related to the Strategic Road Network Asset.',
                skosExample: 'Speed Camera',
                type: 'node',
                upperOntology: false,
                userDefined: false,
              },
              {
                'Business Area': 'Maintain Construct',
                Subdomain: 'Construction phase',
                id: '187',
                label: 'Road Safety Measure',
                name: 'Road Safety Measure',
                nodeId: 187,
                nodeType: 'class',
                rdfAbout: 'http://webprotege.stanford.edu/Rigjqi5P4ZscabU1Pot3hK',
                rdfsLabel: 'Road Safety Measure',
                skosDefinition: 'Methods and measures used to prevent road users and workers from being killed or seriously injured.',
                type: 'node',
                upperOntology: false,
                userDefined: false,
              },
            ],
          },
        ],
        [
          [
            'entrySearchResults',
          ],
          OPERATION_TYPE_PUSH,
          {
            'Business Area': 'Maintain Plan Operate Construct Plan',
            'Data Source': 'Confirm',
            Subdomain: 'Construction phase',
            id: '73',
            label: 'Strategic Road Network Asset',
            name: 'Strategic Road Network Asset',
            nodeId: 73,
            nodeType: 'class',
            rdfAbout: 'http://webprotege.stanford.edu/R9H3QGGtwC0XhV4Mfk6Ceep',
            rdfsLabel: 'Strategic Road Network Asset',
            skosDefinition: 'Assets that, when combined, create and support the physical network of roads managed by the Licence Holder known as the Strategic Road Network Asset (which are represented by a Network Model).',
            type: 'node',
            upperOntology: false,
            userDefined: false,
          },
        ],
        [
          [
            'entrySearchResults',
          ],
          OPERATION_TYPE_PUSH,
          {
            'Business Area': 'Maintain Construct Plan',
            'Data Source': 'Confirm',
            id: '103',
            label: 'Road Restraint',
            name: 'Road Restraint',
            nodeId: 103,
            nodeType: 'class',
            rdfAbout: 'http://webprotege.stanford.edu/RBBDxx5ZaIbg5ASqGAeyKGg',
            rdfsLabel: 'Road Restraint',
            skosDefinition: 'Assets designed to contain, slow down, and stop errant vehicles, and to protect other Assets and Customers from errant Vehicles.',
            type: 'node',
            upperOntology: false,
            userDefined: false,
          },
        ],
        [
          [
            'entrySearchResults',
          ],
          OPERATION_TYPE_PUSH,
          {
            'Business Area': 'Maintain Construct Operate Plan',
            'Data Source': 'NTIS Confirm',
            Subdomain: 'NTIS',
            id: '128',
            label: 'Roadside Operational Technology',
            name: 'Roadside Operational Technology',
            nodeId: 128,
            nodeType: 'class',
            rdfAbout: 'http://webprotege.stanford.edu/RCOdkBizz0dWtRTEjZSfqP8',
            rdfsLabel: 'Roadside Operational Technology',
            skosDefinition: 'Items involved in the digital capture, transfer, or analysis of information specifically related to the Strategic Road Network Asset.',
            skosExample: 'Speed Camera',
            type: 'node',
            upperOntology: false,
            userDefined: false,
          },
        ],
        [
          [
            'entrySearchResults',
          ],
          'push',
          {
            'Business Area': 'Maintain Construct',
            Subdomain: 'Construction phase',
            id: '187',
            label: 'Road Safety Measure',
            name: 'Road Safety Measure',
            nodeId: 187,
            nodeType: 'class',
            rdfAbout: 'http://webprotege.stanford.edu/Rigjqi5P4ZscabU1Pot3hK',
            rdfsLabel: 'Road Safety Measure',
            skosDefinition: 'Methods and measures used to prevent road users and workers from being killed or seriously injured.',
            type: 'node',
            upperOntology: false,
            userDefined: false,
          },
        ],
        [
          [
            'isSearchLoading',
          ],
          OPERATION_TYPE_UPDATE,
          false,
        ],
        [
          [
            'searchPageSelected',
          ],
          OPERATION_TYPE_UPDATE,
          0,
        ],
      ]
    )
  })
})
