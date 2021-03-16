/* eslint max-len:0 */
import searchGraph from '../../../utils/graphSearch/searchGraph'
import store from '../../../store'
import { classesFromApi } from '../../fixtures/classesFromApi'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'

const setStoreState = jest.fn()
const setLoading = jest.fn()
const value = 'roa'

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
  {
    edgeId: 413,
    from: '41',
    id: '413',
    label: 'Associated with',
    rdfAbout: 'http://webprotege.stanford.edu/RoaVc0YAiyET5nKJSYJAoX',
    rdfsLabel: 'Associated with',
    role: 'Associated with',
    to: '152',
    type: 'edge',
    userDefined: false,
  },
  {
    edgeId: 417,
    from: '41',
    id: '417',
    label: 'Associated with',
    rdfAbout: 'http://webprotege.stanford.edu/RoaVc0YAiyET5nKJSYJAoX',
    rdfsLabel: 'Associated with',
    role: 'Associated with',
    to: '134',
    type: 'edge',
    userDefined: false,
  },
  {
    edgeId: 524,
    from: '52',
    id: '524',
    label: 'Associated with',
    rdfAbout: 'http://webprotege.stanford.edu/RoaVc0YAiyET5nKJSYJAoX',
    rdfsLabel: 'Associated with',
    role: 'Associated with',
    to: '107',
    type: 'edge',
    userDefined: false,
  },
  {
    edgeId: 533,
    from: '53',
    id: '533',
    label: 'Associated with',
    rdfAbout: 'http://webprotege.stanford.edu/RoaVc0YAiyET5nKJSYJAoX',
    rdfsLabel: 'Associated with',
    role: 'Associated with',
    to: '73',
    type: 'edge',
    userDefined: false,
  },
  {
    edgeId: 692,
    from: '69',
    id: '692',
    label: 'Associated with',
    rdfAbout: 'http://webprotege.stanford.edu/RoaVc0YAiyET5nKJSYJAoX',
    rdfsLabel: 'Associated with',
    role: 'Associated with',
    to: '73',
    type: 'edge',
    userDefined: false,
  },
  {
    edgeId: 941,
    from: '94',
    id: '941',
    label: 'Associated with',
    rdfAbout: 'http://webprotege.stanford.edu/RoaVc0YAiyET5nKJSYJAoX',
    rdfsLabel: 'Associated with',
    role: 'Associated with',
    to: '4',
    type: 'edge',
    userDefined: false,
  },
  {
    edgeId: 1074,
    from: '107',
    id: '1074',
    label: 'Associated with',
    rdfAbout: 'http://webprotege.stanford.edu/RoaVc0YAiyET5nKJSYJAoX',
    rdfsLabel: 'Associated with',
    role: 'Associated with',
    to: '152',
    type: 'edge',
    userDefined: false,
  },
  {
    edgeId: 1441,
    from: '144',
    id: '1441',
    label: 'Associated with',
    rdfAbout: 'http://webprotege.stanford.edu/RoaVc0YAiyET5nKJSYJAoX',
    rdfsLabel: 'Associated with',
    role: 'Associated with',
    to: '87',
    type: 'edge',
    userDefined: false,
  },
  {
    edgeId: 1551,
    from: '155',
    id: '1551',
    label: 'Associated with',
    rdfAbout: 'http://webprotege.stanford.edu/RoaVc0YAiyET5nKJSYJAoX',
    rdfsLabel: 'Associated with',
    role: 'Associated with',
    to: '137',
    type: 'edge',
    userDefined: false,
  },
  {
    edgeId: 1881,
    from: '188',
    id: '1881',
    label: 'Associated with',
    rdfAbout: 'http://webprotege.stanford.edu/RoaVc0YAiyET5nKJSYJAoX',
    rdfsLabel: 'Associated with',
    role: 'Associated with',
    to: '42',
    type: 'edge',
    userDefined: false,
  },
  {
    edgeId: 1952,
    from: '195',
    id: '1952',
    label: 'Associated with',
    rdfAbout: 'http://webprotege.stanford.edu/RoaVc0YAiyET5nKJSYJAoX',
    rdfsLabel: 'Associated with',
    role: 'Associated with',
    to: '183',
    type: 'edge',
    userDefined: false,
  },
  {
    edgeId: 1956,
    from: '195',
    id: '1956',
    label: 'Associated with',
    rdfAbout: 'http://webprotege.stanford.edu/RoaVc0YAiyET5nKJSYJAoX',
    rdfsLabel: 'Associated with',
    role: 'Associated with',
    to: '80',
    type: 'edge',
    userDefined: false,
  },
  {
    edgeId: 2011,
    from: '201',
    id: '2011',
    label: 'Associated with',
    rdfAbout: 'http://webprotege.stanford.edu/RoaVc0YAiyET5nKJSYJAoX',
    rdfsLabel: 'Associated with',
    role: 'Associated with',
    to: '73',
    type: 'edge',
    userDefined: false,
  },
  {
    edgeId: 2013,
    from: '201',
    id: '2013',
    label: 'Associated with',
    rdfAbout: 'http://webprotege.stanford.edu/RoaVc0YAiyET5nKJSYJAoX',
    rdfsLabel: 'Associated with',
    role: 'Associated with',
    to: '69',
    type: 'edge',
    userDefined: false,
  },
]

describe('searchGraph', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when all elements', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      classesFromApi,
      objectPropertiesFromApi,
      entrySearchFilter: 'all',
      entrySearchAnnotationProperties: [
        'rdfAbout',
        'rdfsLabel'
      ],
    }))

    await searchGraph({
      value,
      setStoreState,
      setLoading
    })

    expect(setLoading.mock.calls).toEqual(
      [[true], [false]]
    )
    expect(setStoreState.mock.calls).toEqual(
      [
        ['isQueried', true],
        ['entrySearchResults',
          entrySearchResults
        ]
      ]
    )
  })

  it('should work correctly when nodes elements', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      classesFromApi,
      objectPropertiesFromApi,
      entrySearchFilter: 'nodes',
      entrySearchAnnotationProperties: [
        'rdfAbout',
        'rdfsLabel'
      ],
    }))

    await searchGraph({
      value,
      setStoreState,
      setLoading
    })

    expect(setLoading.mock.calls).toEqual(
      [[true], [false]]
    )
    expect(setStoreState.mock.calls).toEqual(
      [
        ['isQueried', true],
        ['entrySearchResults',
          entrySearchResults.filter((result) => result.type === 'node')
        ]
      ]
    )
  })

  it('should work correctly when edges elements', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      classesFromApi,
      objectPropertiesFromApi,
      entrySearchFilter: 'edges',
      entrySearchAnnotationProperties: [
        'rdfAbout',
        'rdfsLabel'
      ],
    }))

    await searchGraph({
      value,
      setStoreState,
      setLoading
    })

    expect(setLoading.mock.calls).toEqual(
      [[true], [false]]
    )
    expect(setStoreState.mock.calls).toEqual(
      [
        ['isQueried', true],
        ['entrySearchResults',
          entrySearchResults.filter((result) => result.type === 'edge')
        ]
      ]
    )
  })
})
