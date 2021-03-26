// import axios from 'axios'
import {
  NOTIFY_WARNING
} from '../../constants/notifications'
import showNotification from '../notifications/showNotification'
import { API_ENDPOINT_GRAPH_QUERY } from '../../constants/api'
import store from '../../store'
import httpCall from '../apiCalls/httpCall'
import { OPERATION_TYPE_PUSH, OPERATION_TYPE_UPDATE } from '../../constants/store'

/**
 * Get graph data from API
 * @param  {Object}   params
 * @param  {Function} params.updateStoreValue           updateStoreValue action
 * @param  {Function} params.setLoader                  set query loader
 * @param  {Function} params.t                          i18n translation function
 * @return {undefined}
 */
const makeCustomQuery = async ({
  customQueryString,
  updateStoreValue,
  setLoader,
  t
}) => {
  const {
    user
  } = store.getState()

  setLoader(true)
  updateStoreValue(['customQueryFromLatestOutput'], OPERATION_TYPE_UPDATE, '')
  updateStoreValue(['customQueryStringHistory'], OPERATION_TYPE_PUSH, customQueryString)

  const withAuth = !!user.token

  const response = await httpCall({
    updateStoreValue,
    withAuth,
    body: {
      query: customQueryString
    },
    route: API_ENDPOINT_GRAPH_QUERY,
    method: 'post',
    t
  })

  setLoader(false)

  const {
    error,
    data
  } = response

  if (error) {
    return showNotification({
      message: t('couldNotQueryGraph'),
      type: NOTIFY_WARNING
    })
  }

  updateStoreValue(['customQueryFromLatestOutput'], OPERATION_TYPE_UPDATE, customQueryString)
  updateStoreValue(['customQueryOutput'], OPERATION_TYPE_UPDATE, data)
}

export default makeCustomQuery
