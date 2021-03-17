import { NOTIFY_WARNING } from '../../constants/notifications'
import showNotification from '../notifications/showNotification'
import { API_ENDPOINT_STYLING } from '../../constants/api'
import store from '../../store'
import httpCall from '../apiCalls/httpCall'

/**
 * Get styling data from API
 * @param  {Object}   params
 * @param  {Function} params.addNumber                  addNumber action
 * @param  {Function} params.t                          i18n translation function
 * @return {undefined}
 */
const getNetworkStyling = async ({
  addNumber,
  t
}) => {
  const {
    user
  } = store.getState()

  const withAuth = !!user.token

  const response = await httpCall({
    addNumber,
    withAuth,
    route: API_ENDPOINT_STYLING,
    method: 'get',
    t
  })

  const {
    error,
    data
  } = response

  if (error) {
    return showNotification({
      message: t('couldNotQueryStyles'),
      type: NOTIFY_WARNING
    })
  }

  return data.configuration
}

export default getNetworkStyling
