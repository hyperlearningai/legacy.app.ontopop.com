import { NOTIFY_WARNING } from '../../constants/notifications'
import showNotification from '../notifications/showNotification'
import { GET_NODE_SYNONYMS } from '../../constants/api'
import store from '../../store'
import httpCall from '../apiCalls/httpCall'
import { OPERATION_TYPE_UPDATE } from '../../constants/store'

/**
 * Get synonyms data from API
 * @param  {Object}   params
 * @param  {String}   params.selectedElement            Selected node/edge ID
 * @param  {Function} params.updateStoreValue           updateStoreValue action
 * @param  {Function} params.t                          i18n translation function
 * @return {undefined}
 */
const synonymsGetSynonyms = async ({
  selectedElement,
  updateStoreValue,
  t
}) => {
  const {
    user
  } = store.getState()

  const withAuth = !!user.token

  const route = GET_NODE_SYNONYMS.replace('{node_id}', selectedElement)
  const synonymsState = 'nodesSynonyms'

  const response = await httpCall({
    updateStoreValue,
    withAuth,
    route,
    method: 'get',
    t
  })

  const {
    error,
    data
  } = response

  if (error) {
    return showNotification({
      message: t('couldNotQuerySynonyms'),
      type: NOTIFY_WARNING
    })
  }

  updateStoreValue([synonymsState], OPERATION_TYPE_UPDATE, data)
}

export default synonymsGetSynonyms
