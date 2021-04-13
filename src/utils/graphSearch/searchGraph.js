/* eslint max-len:0 */
import { API_ENDPOINT_SEARCH_KEY, API_ENDPOINT_SEARCH_POST } from '../../constants/api'
import { NOTIFY_WARNING } from '../../constants/notifications'
import { DISPLAYED_RESULTS_PER_PAGE, PROPERTY_ODATA_FILTER_MAPPING } from '../../constants/search'
import { OPERATION_TYPE_OBJECT_ADD, OPERATION_TYPE_PUSH, OPERATION_TYPE_UPDATE } from '../../constants/store'
import store from '../../store'
import httpCall from '../apiCalls/httpCall'
import showNotification from '../notifications/showNotification'

/**
 * Update element types
 * @param  {Object}   params
 * @param  {Array}    params.elements         updateStoreValue action
 * @param  {Object}   params.classesFromApi   Available nodes from API
 * @return {Array}    elements                Elements with updated type
 */
const getUpdatedElements = ({
  elements,
  classesFromApi
}) => (
  elements.length > 0
    ? elements.map((item) => {
      const {
        id,
        label,
      } = item

      const nodeElement = classesFromApi[id]

      switch (label) {
        case 'dataset':
          nodeElement.type = label
          break
        default:
          nodeElement.type = 'node'
          break
      }

      return nodeElement
    }) : [])

/**
 * Search graph
 * @param  {Object}   params
 * @param  {Function} params.updateStoreValue        updateStoreValue action
 * @param  {Function} params.t                       Internationalisation function
 * @return { undefined }
 */
const searchGraph = async ({
  updateStoreValue,
  t
}) => {
  const {
    classesFromApi,
    entrySearchValue,
    isFirstQuery,
    searchPageSelected,
    dataTypeSearch,
    upperOntologySearch,
    advancedSearchFilters
  } = store.getState()

  updateStoreValue(['entrySearchResults'], OPERATION_TYPE_UPDATE, [])
  updateStoreValue(['totalSearchCount'], OPERATION_TYPE_UPDATE, 0)

  if (!entrySearchValue || typeof entrySearchValue !== 'string' || entrySearchValue === '') {
    return updateStoreValue(['entrySearchResults'], OPERATION_TYPE_UPDATE, [])
  }

  updateStoreValue(['isSearchLoading'], OPERATION_TYPE_UPDATE, true)

  const startAtIndex = searchPageSelected * DISPLAYED_RESULTS_PER_PAGE

  const search = `${entrySearchValue}~`

  const body = {
    search,
    skip: startAtIndex,
    top: DISPLAYED_RESULTS_PER_PAGE,
    minimumCoverage: 99,
    queryType: 'full',
    count: true
  }

  if (dataTypeSearch !== 'any') {
    body.filter = `label eq '${dataTypeSearch}'`
  }

  if (upperOntologySearch !== 'any') {
    const upperOntologyFilter = `upperOntology eq ${upperOntologySearch}`

    body.filter = body.filter ? `${body.filter} and ${upperOntologyFilter}` : upperOntologyFilter
  }

  const advancedSearchFiltersKeys = Object.keys(advancedSearchFilters)

  if (advancedSearchFiltersKeys.length > 0) {
    advancedSearchFiltersKeys.forEach((searchFilter) => {
      const { property, value } = advancedSearchFilters[searchFilter]

      if (property === '' || value === '') return false

      const propertyQueryString = PROPERTY_ODATA_FILTER_MAPPING[property] || property
      const propertyValueString = `search.ismatchscoring('"${value}"', '${propertyQueryString}')` // `${property} eq '${value}'`

      body.filter = body.filter ? `${body.filter} and ${propertyValueString}` : propertyValueString
    })
  }

  const response = await httpCall({
    updateStoreValue,
    withAuth: false,
    route: API_ENDPOINT_SEARCH_POST,
    body,
    method: 'post',
    additionalHeaders: {
      'api-key': API_ENDPOINT_SEARCH_KEY
    },
    t
  })

  if (!isFirstQuery) {
    updateStoreValue(['isFirstQuery'], OPERATION_TYPE_UPDATE, true)
  }

  const {
    error,
    data
  } = response

  if (error || !data) {
    showNotification({
      message: t('couldNotGetSearchResults'),
      type: NOTIFY_WARNING
    })

    updateStoreValue(['isSearchLoading'], OPERATION_TYPE_UPDATE, false)

    updateStoreValue(['entrySearchResultsByPage'], OPERATION_TYPE_UPDATE, {})

    return updateStoreValue(['entrySearchResults'], OPERATION_TYPE_UPDATE, [])
  }

  const { value } = data

  updateStoreValue(['totalSearchCount'], OPERATION_TYPE_UPDATE, data['@odata.count'])

  const addedElements = getUpdatedElements({
    elements: value,
    classesFromApi
  })

  updateStoreValue(['entrySearchResultsByPage'], OPERATION_TYPE_OBJECT_ADD, {
    [searchPageSelected]: addedElements
  })

  if (addedElements.length > 0) {
    addedElements.forEach((element) => updateStoreValue(['entrySearchResults'], OPERATION_TYPE_PUSH, element))
  }

  updateStoreValue(['isSearchLoading'], OPERATION_TYPE_UPDATE, false)
  updateStoreValue(['searchPageSelected'], OPERATION_TYPE_UPDATE, searchPageSelected)
}

export default searchGraph
