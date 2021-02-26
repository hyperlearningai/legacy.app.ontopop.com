import axios from 'axios'
import {
  NOTIFY_WARNING
} from '../../constants/notifications'
import showNotification from '../notifications/showNotification'
import { GET_GRAPH_QUERY } from '../../constants/api'
import store from '../../store'

/**
 * Get graph data from API
 * @param  {Object}   params
 * @param  {Function} params.setStoreState              setStoreState action
 * @param  {Function} params.t                          i18n translation function
 * @return {undefined}
 */
const makeCustomQuery = async ({
  customQueryString,
  setStoreState,
  addToArray,
  t
}) => {
  const {
    user
  } = store.getState()

  setStoreState('loading', true)

  setStoreState('customQueryFromLatestOutput', '')
  addToArray('customQueryStringHistory', customQueryString, { alwaysAdd: true })

  try {
    const response = await axios.post(GET_GRAPH_QUERY, {
      query: customQueryString
    }, {
      headers: {
        Authorization: user.token
      }
    })

    setStoreState('loading', false)

    if (response.status !== 200) {
      return showNotification({
        message: t('couldNotQueryGraph'),
        type: NOTIFY_WARNING
      })
    }

    setStoreState('customQueryFromLatestOutput', customQueryString)
    setStoreState('customQueryOutput', response.data)
  } catch (error) {
    setStoreState('loading', false)

    showNotification({
      message: t('couldNotQueryGraph'),
      type: NOTIFY_WARNING
    })
  }
}

export default makeCustomQuery
