import { NOTIFY_SUCCESS, NOTIFY_WARNING } from '../../constants/notifications'
import showNotification from '../notifications/showNotification'
import { POST_CREATE_NODE_SYNONYM } from '../../constants/api'
import store from '../../store'
import httpCall from '../apiCalls/httpCall'

/**
 * Create Synonym
 * @param  {Object}   params
 * @param  {String}   params.selectedElement            Selected node/edge ID
 * @param  {String}   params.synonymText                Synonym Text
 * @param  {Function} params.addNumber                  addNumber action
 * @param  {Function} params.setStoreState              setStoreState action
 * @param  {Function} params.t                          i18n translation function
 * @return {undefined}
 */
const synonymsCreateSynonym = async ({
  selectedElement,
  synonymText,
  addNumber,
  setStoreState,
  t
}) => {
  const {
    user,
    nodesSynonyms,
  } = store.getState()

  const withAuth = !!user.token

  const route = POST_CREATE_NODE_SYNONYM.replace('{node_id}', selectedElement)
  const modifiedSynonyms = nodesSynonyms.slice()
  const synonymsState = 'nodesSynonyms'

  const response = await httpCall({
    addNumber,
    setStoreState,
    withAuth,
    route,
    method: 'post',
    body: {
      synonym: synonymText
    },
    t
  })

  const {
    error,
    data
  } = response


  console.log('response', response)

  modifiedSynonyms.push(data)

  setStoreState(synonymsState, modifiedSynonyms)

  if (error) {
    return showNotification({
      message: t('couldNotCreateSynonym'),
      type: NOTIFY_WARNING
    })
  }

  if (data) {
    return showNotification({
      message: t('synonymCreated'),
      type: NOTIFY_SUCCESS
    })
  }
}

export default synonymsCreateSynonym
