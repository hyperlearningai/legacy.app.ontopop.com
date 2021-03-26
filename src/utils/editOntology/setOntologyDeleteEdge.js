import store from '../../store'
import removeEdge from '../nodesEdgesUtils/removeEdge'
import httpCall from '../apiCalls/httpCall'
import { API_ENDPOINT_GRAPH_EDGES_ID } from '../../constants/api'
import showNotification from '../notifications/showNotification'
import { NOTIFY_SUCCESS, NOTIFY_WARNING } from '../../constants/notifications'
import { OPERATION_TYPE_ARRAY_DELETE, OPERATION_TYPE_DELETE, OPERATION_TYPE_PUSH_UNIQUE } from '../../constants/store'
import checkNodeSpiderability from '../networkStyling/checkNodeSpiderability'
import getEdgeIds from '../nodesEdgesUtils/getEdgeIds'

/**
 * Remove connection from ontology
 * @param  {Object}         params
 * @param  {Function}       params.updateStoreValue           updateStoreValue action
 * @param  {Object}         params.selectedElement            Array of edge IDs
 * @param  {Function}       params.t                          i18n function
 * @return {undefined}
 */
const setOntologyDeleteEdge = async ({
  updateStoreValue,
  selectedElement,
  t
}) => {
  const {
    objectPropertiesFromApi
  } = store.getState()

  // delete connections from graph and remove from graph
  if (selectedElement.length === 0) return false

  for (let index = 0; index < selectedElement.length; index++) {
    const edgeId = selectedElement[index]

    const response = await httpCall({
      updateStoreValue,
      withAuth: true,
      route: API_ENDPOINT_GRAPH_EDGES_ID.replace('{id}', edgeId),
      method: 'delete',
      body: {},
      t
    })

    const {
      error, data
    } = response

    const message = `${t('couldNotDeleteEdge')}: ${edgeId}`

    if (error) {
      showNotification({
        message,
        type: NOTIFY_WARNING
      })

      continue
    }

    if (!data || Object.keys(data).length !== 1) {
      showNotification({
        message,
        type: NOTIFY_WARNING
      })

      continue
    }

    const edge = objectPropertiesFromApi[edgeId]

    const {
      from,
      to
    } = edge

    // delete from triples
    updateStoreValue(['totalEdgesPerNode', from], OPERATION_TYPE_ARRAY_DELETE, edgeId)
    updateStoreValue(['totalEdgesPerNode', to], OPERATION_TYPE_ARRAY_DELETE, edgeId)

    // add to deleted edges
    updateStoreValue(['deletedEdges'], OPERATION_TYPE_PUSH_UNIQUE, edgeId)
    updateStoreValue(['objectPropertiesFromApi', edgeId], OPERATION_TYPE_DELETE)

    const deleteMessage = `${t('edgeDeleted')}: ${edgeId}`
    showNotification({
      message: deleteMessage,
      type: NOTIFY_SUCCESS
    })

    removeEdge({
      edge,
      updateStoreValue,
    })

    const visibleEdges = getEdgeIds()

    checkNodeSpiderability({
      nodeId: from,
      updateStoreValue,
      visibleEdges
    })

    checkNodeSpiderability({
      nodeId: to,
      updateStoreValue,
      visibleEdges
    })
  }
}

export default setOntologyDeleteEdge
