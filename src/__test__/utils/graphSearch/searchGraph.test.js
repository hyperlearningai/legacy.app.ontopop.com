/* eslint max-len:0 */
import searchGraph from '../../../utils/graphSearch/searchGraph'
import store from '../../../store'
import { classesFromApi } from '../../fixtures/classesFromApi'
import { objectPropertiesFromApi } from '../../fixtures/objectPropertiesFromApi'

const setStoreState = jest.fn()
const setLoading = jest.fn()
const value = 'roa'

const entrySearchResults = [{
  'Business Area': 'Maintain Plan Operate Construct Plan',
  Subdomain: 'Construction phase',
  id: '70',
  label: 'Strategic Road Network Asset',
  nodeId: 70,
  rdfAbout: 'http://webprotege.stanford.edu/R9H3QGGtwC0XhV4Mfk6Ceep',
  rdfsLabel: 'Strategic Road Network Asset',
  skosDefinition: 'Assets that, when combined, create and support the physical network of roads managed by the Licence Holder known as the Strategic Road Network Asset (which are represented by a Network Model).',
  type: 'node',
  userDefined: false
}, {
  'Business Area': 'Maintain Construct Plan', id: '99', label: 'Road Restraint', nodeId: 99, rdfAbout: 'http://webprotege.stanford.edu/RBBDxx5ZaIbg5ASqGAeyKGg', rdfsLabel: 'Road Restraint', skosDefinition: 'Assets designed to contain, slow down, and stop errant vehicles, and to protect other Assets and Customers from errant Vehicles.', type: 'node', userDefined: false
}, {
  'Business Area': 'Maintain Construct Operate Plan', 'Data Source': 'MIDAS', Subdomain: 'MIDAS', id: '122', label: 'Roadside Operational Technology', nodeId: 122, rdfAbout: 'http://webprotege.stanford.edu/RCOdkBizz0dWtRTEjZSfqP8', rdfsLabel: 'Roadside Operational Technology', skosDefinition: 'Items involved in the digital capture, transfer, or analysis of information specifically related to the Strategic Road Network Asset.', skosExample: 'MIDAS Conduction Loop', type: 'node', userDefined: false
}, {
  'Business Area': 'Maintain Construct', Subdomain: 'Construction phase', id: '180', label: 'Road Safety Measure', nodeId: 180, rdfAbout: 'http://webprotege.stanford.edu/Rigjqi5P4ZscabU1Pot3hK', rdfsLabel: 'Road Safety Measure', skosDefinition: 'Methods and measures used to prevent road users and workers from being killed or seriously injured.', type: 'node', userDefined: false
}, {
  edgeId: 383, from: '38', id: '383', label: 'Associated with', rdfAbout: 'http://webprotege.stanford.edu/RoaVc0YAiyET5nKJSYJAoX', rdfsLabel: 'Associated with', role: 'Associated with', to: '146', type: 'edge', userDefined: false
}, {
  edgeId: 384, from: '38', id: '384', label: 'Associated with', rdfAbout: 'http://webprotege.stanford.edu/RoaVc0YAiyET5nKJSYJAoX', rdfsLabel: 'Associated with', role: 'Associated with', to: '128', type: 'edge', userDefined: false
}, {
  edgeId: 493, from: '49', id: '493', label: 'Associated with', rdfAbout: 'http://webprotege.stanford.edu/RoaVc0YAiyET5nKJSYJAoX', rdfsLabel: 'Associated with', role: 'Associated with', to: '103', type: 'edge', userDefined: false
}, {
  edgeId: 502, from: '50', id: '502', label: 'Associated with', rdfAbout: 'http://webprotege.stanford.edu/RoaVc0YAiyET5nKJSYJAoX', rdfsLabel: 'Associated with', role: 'Associated with', to: '70', type: 'edge', userDefined: false
}, {
  edgeId: 663, from: '66', id: '663', label: 'Associated with', rdfAbout: 'http://webprotege.stanford.edu/RoaVc0YAiyET5nKJSYJAoX', rdfsLabel: 'Associated with', role: 'Associated with', to: '70', type: 'edge', userDefined: false
}, {
  edgeId: 911, from: '91', id: '911', label: 'Associated with', rdfAbout: 'http://webprotege.stanford.edu/RoaVc0YAiyET5nKJSYJAoX', rdfsLabel: 'Associated with', role: 'Associated with', to: '4', type: 'edge', userDefined: false
}, {
  edgeId: 1032, from: '103', id: '1032', label: 'Associated with', rdfAbout: 'http://webprotege.stanford.edu/RoaVc0YAiyET5nKJSYJAoX', rdfsLabel: 'Associated with', role: 'Associated with', to: '146', type: 'edge', userDefined: false
}, {
  edgeId: 1386, from: '138', id: '1386', label: 'Associated with', rdfAbout: 'http://webprotege.stanford.edu/RoaVc0YAiyET5nKJSYJAoX', rdfsLabel: 'Associated with', role: 'Associated with', to: '84', type: 'edge', userDefined: false
}, {
  edgeId: 1811, from: '181', id: '1811', label: 'Associated with', rdfAbout: 'http://webprotege.stanford.edu/RoaVc0YAiyET5nKJSYJAoX', rdfsLabel: 'Associated with', role: 'Associated with', to: '39', type: 'edge', userDefined: false
}, {
  edgeId: 1883, from: '188', id: '1883', label: 'Associated with', rdfAbout: 'http://webprotege.stanford.edu/RoaVc0YAiyET5nKJSYJAoX', rdfsLabel: 'Associated with', role: 'Associated with', to: '77', type: 'edge', userDefined: false
}, {
  edgeId: 1887, from: '188', id: '1887', label: 'Associated with', rdfAbout: 'http://webprotege.stanford.edu/RoaVc0YAiyET5nKJSYJAoX', rdfsLabel: 'Associated with', role: 'Associated with', to: '176', type: 'edge', userDefined: false
}, {
  edgeId: 1941, from: '194', id: '1941', label: 'Associated with', rdfAbout: 'http://webprotege.stanford.edu/RoaVc0YAiyET5nKJSYJAoX', rdfsLabel: 'Associated with', role: 'Associated with', to: '66', type: 'edge', userDefined: false
}, {
  edgeId: 1942, from: '194', id: '1942', label: 'Associated with', rdfAbout: 'http://webprotege.stanford.edu/RoaVc0YAiyET5nKJSYJAoX', rdfsLabel: 'Associated with', role: 'Associated with', to: '70', type: 'edge', userDefined: false
}]

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
