import { NOTIFY_WARNING } from '../../constants/notifications'
import showNotification from '../notifications/showNotification'
import { API_ENDPOINT_STYLING } from '../../constants/api'
import httpCall from '../apiCalls/httpCall'

/**
 * Post styling data to API
 * @param  {Object}   params
 * @param  {Function} params.updateStoreValue                  updateStoreValue action
 * @param  {Function} params.t                          i18n translation function
 * @return {undefined}
 */
const updateNetworkStyling = async ({
  stylingJSON,
  updateStoreValue,
  t
}) => {
  const response = await httpCall({
    updateStoreValue,
    withAuth: true,
    body: stylingJSON,
    route: API_ENDPOINT_STYLING,
    method: 'post',
    t
  })

  const {
    error
  } = response

  if (error) {
    return showNotification({
      message: t('couldNotUpdateStyles'),
      type: NOTIFY_WARNING
    })
  }

  return false
}

export default updateNetworkStyling
