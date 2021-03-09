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
import { ROUTE_INDEX } from '../../constants/routes'
import httpCall from './httpCall'

/**
 * Get graph data from API
 * @param  {Object}   params
 * @param  {Function} params.addNumber                  addNumber action
 * @param  {Function} params.setStoreState              setStoreState action
 * @param  {Function} params.t                          i18n translation function
 * @return {undefined}
 */
const getGraphData = async ({
  addNumber,
  setStoreState,
  t
}) => {
  const {
    user
  } = store.getState()

  const withAuth = !!user.token

  const response = await httpCall({
    addNumber,
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
      window.location.replace(ROUTE_INDEX)
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
    setStoreState,
    nodes: nodesJson
  })

  setClassesFromApi({
    setStoreState,
    nodes: nodesJson
  })

  setObjectPropertiesFromApi({
    setStoreState,
    edges: edgesJson
  })

  getTriplesFromApi({
    setStoreState,
    edges: edgesJson
  })
}

export default getGraphData
