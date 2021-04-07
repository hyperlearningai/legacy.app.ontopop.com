import {
  API_ENDPOINT_SEARCH_AUTOCOMPLETE,
  API_ENDPOINT_SEARCH_KEY,
  API_ENDPOINT_SEARCH_SUGGESTER,
  API_ENDPOINT_SEARCH_VERSION
} from '../../constants/api'
import { NOTIFY_WARNING } from '../../constants/notifications'
import httpCall from '../apiCalls/httpCall'
import showNotification from '../notifications/showNotification'

/**
 * Get search suggestions
 * @param  {Object}   params
 * @param  {String}   params.query                  Search query
 * @param  {Function} params.setSuggestions         Set suggestions function
 * @param  {Function} params.updateStoreValue       updateStoreValue function
 * @param  {Function} params.t                      Internationalisation function
 * @return { undefined }
 */
const getSuggestions = async ({
  query,
  setSuggestions,
  updateStoreValue,
  t
}) => {
  if (query.length < 3) return false

  const newSuggestions = []

  const firstSuggestion = {
    label: query,
    value: query
  }

  newSuggestions.push(firstSuggestion)

  // eslint-disable-next-line
  const route = `${API_ENDPOINT_SEARCH_AUTOCOMPLETE}?search=${query}&suggesterName=${API_ENDPOINT_SEARCH_SUGGESTER}&api-version=${API_ENDPOINT_SEARCH_VERSION}&fuzzy=true&$top=10&minimumCoverage=99&autocompleteMode=twoTerms`

  const response = await httpCall({
    updateStoreValue,
    withAuth: false,
    route,
    method: 'get',
    additionalHeaders: {
      'api-key': API_ENDPOINT_SEARCH_KEY
    },
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

  const { value } = data

  if (value.length > 0) {
    value.forEach((suggestion) => {
      const {
        text
      } = suggestion

      newSuggestions.push({
        label: text,
        value: text
      })
    })
  }

  setSuggestions(newSuggestions)
}

export default getSuggestions
