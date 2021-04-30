// import axios from 'axios'
import store from '../../store'
import {
  NOTIFY_WARNING
} from '../../constants/notifications'
import showNotification from '../notifications/showNotification'
import { API_ENDPOINT_GRAPH_MODEL_1 } from '../../constants/api'
import setClassesFromApi from './setClassesFromApi'
import getTriplesFromApi from './getTriplesFromApi'
import setObjectPropertiesFromApi from './setObjectPropertiesFromApi'
import setAnnotationProperties from './setAnnotationProperties'
import { AUTH_COOKIE } from '../../constants/auth'
import { ROUTE_LOGIN } from '../../constants/routes'
import httpCall from './httpCall'

/**
 * Get graph data from API
 * @param  {Object}   params
 * @param  {Function} params.updateStoreValue           updateStoreValue action
 * @param  {Function} params.t                          i18n translation function
 * @return {undefined}
 */
const getGraphData = async ({
  updateStoreValue,
  t
}) => {
  const {
    user
  } = store.getState()

  const withAuth = !!user.token

  const response = await httpCall({
    updateStoreValue,
    withAuth,
    route: API_ENDPOINT_GRAPH_MODEL_1,
    method: 'get',
    t
  })

  const {
    error,
    data
  } = response

  if (error) {
    setTimeout(() => {
      localStorage.removeItem(AUTH_COOKIE)
      window.location.replace(ROUTE_LOGIN)
    }, 2000)

    return showNotification({
      message: t('couldNotQueryGraph'),
      type: NOTIFY_WARNING
    })
  }

  const {
    nodes,
    edges
  } = data

  if (!nodes || !edges) {
    return showNotification({
      message: t('couldNotQueryGraph'),
      type: NOTIFY_WARNING
    })
  }

  const nodesJson = JSON.parse(nodes)
  const edgesJson = JSON.parse(edges)

  setAnnotationProperties({
    updateStoreValue,
    t,
    nodes: nodesJson
  })

  setClassesFromApi({
    updateStoreValue,
    nodes: nodesJson
  })

  setObjectPropertiesFromApi({
    updateStoreValue,
    edges: edgesJson
  })

  getTriplesFromApi({
    updateStoreValue,
    edges: edgesJson
  })
}

export default getGraphData
