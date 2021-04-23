/* eslint max-len:0 */
import generateSearchGraphQuery from '../../../utils/graphSearch/generateSearchGraphQuery'
import store from '../../../store'

const value = 'roa'

describe('generateSearchGraphQuery', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when entrySearchValue is empty, dataset type and not upper ontology', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      entrySearchValue: '',
      searchPageSelected: 0,
      dataTypeSearch: 'dataset',
      upperOntologySearch: 'false',
      advancedSearchFilters: [{
        property: 'Business Area',
        value: 'test'
      }, {
        property: 'name',
        value: 'link'
      }]
    }))

    expect(generateSearchGraphQuery()).toEqual(
      {
        count: true,
        filter: "label eq 'dataset' and upperOntology eq false",
        minimumCoverage: 99,
        queryType: 'full',
        search: 'test~ link~',
        searchFields: 'business_area,name',
        skip: 0,
        top: 10
      }
    )
  })

  it('should work correctly when entrySearchValue has value and any type', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      entrySearchValue: value,
      searchPageSelected: 0,
      dataTypeSearch: 'any',
      upperOntologySearch: 'any',
      advancedSearchFilters: [{
        property: 'Business Area',
        value: 'test'
      }, {
        property: 'name',
        value: 'link'
      }]
    }))

    expect(generateSearchGraphQuery()).toEqual(
      {
        count: true,
        filter: "search.ismatchscoring('\"test\"', 'business_area') and search.ismatchscoring('\"link\"', 'name')",
        minimumCoverage: 99,
        queryType: 'full',
        search: 'roa~',
        skip: 0,
        top: 10
      }
    )
  })

  it('should work correctly when entrySearchValue has value and specific type', async () => {
    store.getState = jest.fn().mockImplementation(() => ({
      entrySearchValue: value,
      searchPageSelected: 0,
      dataTypeSearch: 'class',
      upperOntologySearch: 'true',
      advancedSearchFilters: [{
        property: 'Business Area',
        value: 'test'
      }, {
        property: 'name',
        value: 'link'
      }]
    }))

    expect(generateSearchGraphQuery()).toEqual(
      {
        count: true,
        filter: "search.ismatchscoring('\"test\"', 'business_area') and search.ismatchscoring('\"link\"', 'name') and label eq 'class' and upperOntology eq true",
        minimumCoverage: 99,
        queryType: 'full',
        search: 'roa~',
        skip: 0,
        top: 10
      }
    )
  })
})
