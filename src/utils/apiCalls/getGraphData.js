import axios from 'axios'
import store from '../../store'
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
  const {
    user
  } = store.getState()

  setStoreState('loading', true)

  try {
    const config = {
      headers: {
        Authorization: user.token
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

    const nodesObjects = JSON.parse(nodes)
    const edgesObjects = JSON.parse(edges)

    setAnnotationProperties({
      setStoreState,
      nodes: nodesObjects
    })

    setClassesFromApi({
      setStoreState,
      nodes: nodesObjects
    })

    setObjectPropertiesFromApi({
      setStoreState,
      edges: edgesObjects
    })

    getTriplesFromApi({
      setStoreState,
      edges: edgesObjects
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
