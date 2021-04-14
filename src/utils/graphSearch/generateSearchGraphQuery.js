/* eslint max-len:0 */
import { DISPLAYED_RESULTS_PER_PAGE, PROPERTY_ODATA_FILTER_MAPPING } from '../../constants/search'
import store from '../../store'

/**
 * Search graph
 * @param  {Object}   params
 * @param  {Function} params.updateStoreValue        updateStoreValue action
 * @param  {Function} params.t                       Internationalisation function
 * @return { undefined }
 */
const generateSearchGraphQuery = () => {
  const {
    entrySearchValue,
    searchPageSelected,
    dataTypeSearch,
    upperOntologySearch,
    advancedSearchFilters
  } = store.getState()

  const startAtIndex = searchPageSelected * DISPLAYED_RESULTS_PER_PAGE

  const commonBodyProperties = {
    skip: startAtIndex,
    top: DISPLAYED_RESULTS_PER_PAGE,
    minimumCoverage: 99,
    queryType: 'full',
    count: true
  }

  const search = entrySearchValue !== '' ? `${entrySearchValue}~` : ''
  const isSearchQueryPresent = entrySearchValue !== ''

  const customBodyProperties = {
    search
  }

  const advancedSearchFiltersKeys = Object.keys(advancedSearchFilters)

  if (advancedSearchFiltersKeys.length > 0) {
    advancedSearchFiltersKeys.forEach((searchFilter) => {
      const { property, value } = advancedSearchFilters[searchFilter]

      if (property === '' || value === '') return false

      const propertyQueryString = PROPERTY_ODATA_FILTER_MAPPING[property] || property

      if (isSearchQueryPresent) {
        const propertyValueString = `search.ismatchscoring('"${value}"', '${propertyQueryString}')` // `${property} eq '${value}'`
        customBodyProperties.filter = customBodyProperties.filter ? `${customBodyProperties.filter} and ${propertyValueString}` : propertyValueString
      } else {
        customBodyProperties.search = customBodyProperties.search ? `${customBodyProperties.search} ${value}~` : `${value}~`
        customBodyProperties.searchFields = customBodyProperties.searchFields ? `${customBodyProperties.searchFields},${propertyQueryString}` : propertyQueryString
      }
    })
  }

  if (dataTypeSearch !== 'any') {
    const dataTypeFilter = `label eq '${dataTypeSearch}'`
    customBodyProperties.filter = customBodyProperties.filter ? `${customBodyProperties.filter} and ${dataTypeFilter}` : dataTypeFilter
  }

  if (upperOntologySearch !== 'any') {
    const upperOntologyFilter = `upperOntology eq ${upperOntologySearch}`

    customBodyProperties.filter = customBodyProperties.filter ? `${customBodyProperties.filter} and ${upperOntologyFilter}` : upperOntologyFilter
  }

  return {
    ...commonBodyProperties,
    ...customBodyProperties
  }
}

export default generateSearchGraphQuery
