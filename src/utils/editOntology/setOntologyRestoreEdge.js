import store from '../../store'
import addEdge from '../nodesEdgesUtils/addEdge'
import getNode from '../nodesEdgesUtils/getNode'
import { API_ENDPOINT_GRAPH_EDGES_CREATE } from '../../constants/api'
import httpCall from '../apiCalls/httpCall'
import showNotification from '../notifications/showNotification'
import { NOTIFY_SUCCESS, NOTIFY_WARNING } from '../../constants/notifications'
import checkEdgeVisibility from '../networkGraphOptions/checkEdgeVisibility'
import {
  OPERATION_TYPE_ARRAY_DELETE, OPERATION_TYPE_OBJECT_ADD, OPERATION_TYPE_PUSH_UNIQUE
} from '../../constants/store'
import checkNodeSpiderability from '../networkStyling/checkNodeSpiderability'
import getEdgeIds from '../nodesEdgesUtils/getEdgeIds'

/**
 * ADd ontology edge
 * @param  {Object}         params
 * @param  {Function}       params.updateStoreValue           updateStoreValue action
 * @param  {Object}         params.selectedElement            Element properties with from,to,edge keys
 * @param  {Function}       params.t                          i18n function
 * @return {undefined}
 */
const setOntologyRestoreEdge = async ({
  updateStoreValue,
  selectedElement,
  t
}) => {
  const {
    objectPropertiesFromApiBackup,
    userDefinedEdgeStyling: {
      stylingEdgeCaptionProperty,
    }
  } = store.getState()

  // restore connections from graph
  if (selectedElement.length === 0) return false

  for (let index = 0; index < selectedElement.length; index++) {
    const oldId = selectedElement[index]

    const edge = objectPropertiesFromApiBackup[oldId] ? JSON.parse(JSON.stringify(objectPropertiesFromApiBackup[oldId])) : undefined

    if (!edge) return false

    const body = {
      edgeLabel: edge.rdfsLabel,
      sourceVertexId: parseInt(edge.from),
      targetVertexId: parseInt(edge.to),
    }

    const response = await httpCall({
      updateStoreValue,
      withAuth: true,
      route: API_ENDPOINT_GRAPH_EDGES_CREATE,
      method: 'post',
      body,
      t
    })

    const {
      error, data
    } = response

    const message = `${t('couldNotRestoreNode')}: ${oldId}`
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

    const { id } = data[Object.keys(data)[0]]

    // add to object properties
    const stringId = id.toString()

    edge.id = stringId

    updateStoreValue(['objectPropertiesFromApi'], OPERATION_TYPE_OBJECT_ADD, { [stringId]: edge })
    updateStoreValue(['deletedEdges'], OPERATION_TYPE_ARRAY_DELETE, oldId)

    const label = edge[stylingEdgeCaptionProperty]
    const restoreMessage = `${t('edgeRestored')}: ${label}`
    showNotification({
      message: restoreMessage,
      type: NOTIFY_SUCCESS
    })

    const {
      from,
      to
    } = edge

    // add to total edges per node
    updateStoreValue(['totalEdgesPerNodeBackup', from], OPERATION_TYPE_ARRAY_DELETE, oldId)
    updateStoreValue(['totalEdgesPerNodeBackup', from], OPERATION_TYPE_ARRAY_DELETE, oldId)
    updateStoreValue(['totalEdgesPerNode', from], OPERATION_TYPE_PUSH_UNIQUE, stringId)
    updateStoreValue(['totalEdgesPerNode', to], OPERATION_TYPE_PUSH_UNIQUE, stringId)

    const isFromVisible = getNode(from) !== null
    const isToVisible = getNode(to) !== null

    if (
      isFromVisible
        && isToVisible) {
      updateStoreValue(['nodesEdges', from], OPERATION_TYPE_PUSH_UNIQUE, stringId)
      updateStoreValue(['nodesEdges', to], OPERATION_TYPE_PUSH_UNIQUE, stringId)

      const isVisible = checkEdgeVisibility({
        edgeId: stringId,
      })

      if (isVisible) {
        addEdge({
          edge,
          updateStoreValue,
        })
      }
    }

    // restyle node and edge
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

export default setOntologyRestoreEdge
