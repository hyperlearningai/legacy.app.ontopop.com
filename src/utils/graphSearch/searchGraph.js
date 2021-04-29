/* eslint max-len:0 */
import { API_ENDPOINT_SEARCH_KEY, API_ENDPOINT_SEARCH_POST } from '../../constants/api'
import { NOTIFY_WARNING } from '../../constants/notifications'
import { OPERATION_TYPE_OBJECT_ADD, OPERATION_TYPE_PUSH, OPERATION_TYPE_UPDATE } from '../../constants/store'
import store from '../../store'
import setGaEvent from '../analytics/setGaEvent'
import httpCall from '../apiCalls/httpCall'
import showNotification from '../notifications/showNotification'
import generateSearchGraphQuery from './generateSearchGraphQuery'

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

      if (!nodeElement) return null

      switch (label) {
        case 'dataset':
          nodeElement.type = label
          break
        default:
          nodeElement.type = 'node'
          break
      }

      return nodeElement
    }).filter((item) => item !== null) : [])

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
  } = store.getState()

  updateStoreValue(['entrySearchResults'], OPERATION_TYPE_UPDATE, [])
  updateStoreValue(['totalSearchCount'], OPERATION_TYPE_UPDATE, 0)

  if (typeof entrySearchValue !== 'string') return updateStoreValue(['entrySearchResults'], OPERATION_TYPE_UPDATE, [])

  const body = generateSearchGraphQuery()

  if (!body.search || body.search === '') return updateStoreValue(['entrySearchResults'], OPERATION_TYPE_UPDATE, [])

  updateStoreValue(['isSearchLoading'], OPERATION_TYPE_UPDATE, true)

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

  if (isFirstQuery) {
    updateStoreValue(['isFirstQuery'], OPERATION_TYPE_UPDATE, false)
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

  // track search on ga
  setGaEvent({
    action: 'search',
    params: {
      search_term: body.search
    }
  })

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
