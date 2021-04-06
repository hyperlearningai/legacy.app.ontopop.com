import {
  API_ENDPOINT_GRAPH_PROPERTY,
} from '../../constants/api'
import { NOTIFY_WARNING } from '../../constants/notifications'
import httpCall from '../apiCalls/httpCall'
import showNotification from '../notifications/showNotification'

/**
 * Get search suggestions
 * @param  {Object}   params
 * @param  {String}   params.property               Selected property
 * @param  {Function} params.setSuggestions         Set suggestions function
 * @param  {Function} params.updateStoreValue       updateStoreValue function
 * @param  {Function} params.t                      Internationalisation function
 * @return { undefined }
 */
const getEnumeration = async ({
  property,
  setSuggestions,
  updateStoreValue,
  t
}) => {
  const newSuggestions = []

  const route = API_ENDPOINT_GRAPH_PROPERTY.replace('{property}', property)

  const response = await httpCall({
    updateStoreValue,
    withAuth: true,
    route,
    method: 'get',
    t
  })

  const {
    error,
    data
  } = response

  if (error || !data) {
    showNotification({
      message: t('couldNotGetSuggestedTerms'),
      type: NOTIFY_WARNING
    })

    return setSuggestions(newSuggestions)
  }

  if (data.length > 0) {
    setSuggestions(data.map((value) => ({
      label: value,
      value
    })))
  }
}

export default getEnumeration
