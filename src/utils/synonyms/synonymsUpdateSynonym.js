import { NOTIFY_WARNING } from '../../constants/notifications'
import showNotification from '../notifications/showNotification'
import { PATCH_UPDATE_NODE_SYNONYM } from '../../constants/api'
import store from '../../store'
import httpCall from '../apiCalls/httpCall'

/**
 * Update Synonym
 * @param  {Object}   params
 * @param  {String}   params.selectedElement            Selected node/edge ID
 * @param  {String}   params.selectedSynonymID             Selected synonym ID
 * @param  {Function} params.addNumber                  addNumber action
 * @param  {Function} params.setStoreState              setStoreState action
 * @param  {Function} params.t                          i18n translation function
 * @return {undefined}
 */
const synonymsUpdateSynonym = async ({
  selectedElement,
  selectedSynonymID,
  synonymText,
  addNumber,
  setStoreState,
  t
}) => {
  const {
    user,
    nodesSynonyms
  } = store.getState()

  const withAuth = !!user.token

  const route = PATCH_UPDATE_NODE_SYNONYM.replace('{node_id}', selectedElement).replace('{id}', selectedSynonymID)
  const modifiedSynonyms = nodesSynonyms.slice()
  const synonymsState = 'nodesSynonyms'

  const response = await httpCall({
    addNumber,
    setStoreState,
    withAuth,
    route,
    method: 'patch',
    body: {
      synonym: synonymText
    },
    t
  })

  const {
    error,
    data
  } = response

  if (error || !data.id) {
    return showNotification({
      message: t('couldNotUpdateSynonym'),
      type: NOTIFY_WARNING
    })
  }

  const updatedSynonyms = modifiedSynonyms.map((synonym) => (synonym.id === data.id ? data : synonym))

  setStoreState(synonymsState, updatedSynonyms)
}

export default synonymsUpdateSynonym
