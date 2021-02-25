import axios from 'axios'
import {
  NOTIFY_WARNING
} from '../../constants/notifications'
import showNotification from '../notifications/showNotification'
import { GET_GRAPH } from '../../constants/api'
import setClassesFromApi from './setClassesFromApi'
import getTriplesFromApi from './getTriplesFromApi'
import setObjectPropertiesFromApi from './setObjectPropertiesFromApi'
import setAnnotationProperties from './setAnnotationProperties'
import { AUTH_COOKIE } from '../../constants/auth'
import { ROUTE_INDEX } from '../../constants/routes'

/**
 * Get graph data from API
 * @param  {Object}   params
 * @param  {Function} params.setStoreState              setStoreState action
 * @param  {Function} params.t                          i18n translation function
 * @return {undefined}
 */
const getGraphData = async ({
  setStoreState,
  t
}) => {
  setStoreState('loading', true)

  try {
    const authCookie = localStorage.getItem(AUTH_COOKIE)
    const { bearer } = JSON.parse(authCookie)

    const config = {
      headers: {
        Authorization: bearer
      }
    }

    const response = await axios.get(GET_GRAPH, config)
    setStoreState('loading', false)

    if (response.status !== 200) {
      return showNotification({
        message: t('couldNotQueryGraph'),
        type: NOTIFY_WARNING
      })
    }

    const {
      nodes,
      edges
    } = response.data

    if (!nodes || !edges) {
      return showNotification({
        message: t('couldNotQueryGraph'),
        type: NOTIFY_WARNING
      })
    }

    setAnnotationProperties({
      setStoreState,
      nodes
    })

    setClassesFromApi({
      setStoreState,
      nodes
    })

    setObjectPropertiesFromApi({
      setStoreState,
      edges
    })

    getTriplesFromApi({
      setStoreState,
      edges
    })
  } catch (error) {
    setStoreState('loading', false)

    setTimeout(() => {
      localStorage.removeItem(AUTH_COOKIE)
      window.location.replace(ROUTE_INDEX)
    }, 2000)

    return showNotification({
      message: t('couldNotQueryGraph'),
      type: NOTIFY_WARNING
    })
  }
}

export default getGraphData
