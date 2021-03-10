// import axios from 'axios'
import {
  NOTIFY_WARNING
} from '../../constants/notifications'
import showNotification from '../notifications/showNotification'
import { API_ENDPOINT_GRAPH_QUERY } from '../../constants/api'
import store from '../../store'
import httpCall from '../apiCalls/httpCall'

/**
 * Get graph data from API
 * @param  {Object}   params
 * @param  {Function} params.setStoreState              setStoreState action
 * @param  {Function} params.addNumber                  addNumber action
 * @param  {Function} params.addToArray                 addToArray action
 * @param  {Function} params.setLoader                  set query loader
 * @param  {Function} params.t                          i18n translation function
 * @return {undefined}
 */
const makeCustomQuery = async ({
  customQueryString,
  addNumber,
  setStoreState,
  addToArray,
  setLoader,
  t
}) => {
  const {
    user
  } = store.getState()

  setLoader(true)
  setStoreState('customQueryFromLatestOutput', '')
  addToArray('customQueryStringHistory', customQueryString, { alwaysAdd: true })

  const withAuth = !!user.token

  const response = await httpCall({
    addNumber,
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

  setStoreState('customQueryFromLatestOutput', customQueryString)
  setStoreState('customQueryOutput', data)
}

export default makeCustomQuery
