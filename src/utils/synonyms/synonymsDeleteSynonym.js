import { NOTIFY_SUCCESS, NOTIFY_WARNING } from '../../constants/notifications'
import showNotification from '../notifications/showNotification'
import { DELETE_NODE_SYNONYM } from '../../constants/api'
import store from '../../store'
import httpCall from '../apiCalls/httpCall'

/**
 * Get graph data from API
 * @param  {Object}   params
 * @param  {String}   params.selectedElement            Selected node/edge ID
 * @param  {String}   params.selectedSynonymID             Selected synonym ID
 * @param  {Function} params.addNumber                  addNumber action
 * @param  {Function} params.setStoreState              setStoreState action
 * @param  {Function} params.t                          i18n translation function
 * @return {undefined}
 */

const synonymsDeleteSynonym = async ({
  selectedElement,
  selectedSynonymID,
  addNumber,
  setStoreState,
  t
}) => {
  const {
    user,
    nodesSynonyms
  } = store.getState()

  const withAuth = !!user.token

  const route = DELETE_NODE_SYNONYM.replace('{node_id}', selectedElement).replace('{id}', selectedSynonymID)
  const modifiedSynonym = nodesSynonyms.slice()
  const synonymsState = 'nodesSynonyms'

  const response = await httpCall({
    addNumber,
    setStoreState,
    withAuth,
    route,
    method: 'delete',
    t
  })

  const {
    error,
    data
  } = response

  const dataIndex = modifiedSynonym.findIndex((synonym) => synonym.id.toString() === selectedSynonymID.toString())

  modifiedSynonym.splice(dataIndex, 1)

  setStoreState(synonymsState, modifiedSynonym)

  if (data && data.message) {
    return showNotification({
      message: data.message,
      type: NOTIFY_SUCCESS
    })
  }

  if (error) {
    showNotification({
      message: t('couldNotDeleteSynonym'),
      type: NOTIFY_WARNING
    })
  }
}

export default synonymsDeleteSynonym
