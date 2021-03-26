import addEdge from '../nodesEdgesUtils/addEdge'
import showNotification from '../notifications/showNotification'
import { NOTIFY_SUCCESS, NOTIFY_WARNING } from '../../constants/notifications'
import getNode from '../nodesEdgesUtils/getNode'
import { API_ENDPOINT_GRAPH_EDGES_CREATE } from '../../constants/api'
import httpCall from '../apiCalls/httpCall'
import checkEdgeVisibility from '../networkGraphOptions/checkEdgeVisibility'
import { OPERATION_TYPE_PUSH_UNIQUE, OPERATION_TYPE_UPDATE } from '../../constants/store'
import getEdgeIds from '../nodesEdgesUtils/getEdgeIds'
import checkNodeSpiderability from '../networkStyling/checkNodeSpiderability'

/**
 * ADd ontology edge
 * @param  {Object}         params
 * @param  {Function}       params.updateStoreValue                  updateStoreValue action
 * @param  {Function}       params.t                          i18n function
 * @param  {Object}         params.selectedElementProperties  Element properties with from,to,edge keys
 * @return {undefined}
 */
const setOntologyAddEdge = async ({
  updateStoreValue,
  selectedElementProperties,
  t
}) => {
  const {
    from,
    to,
    edge: edgeId,
    optionEdges
  } = selectedElementProperties

  const edgeLabel = optionEdges.find((option) => option.value === edgeId).label

  const body = {
    edgeLabel,
    sourceVertexId: parseInt(from),
    targetVertexId: parseInt(to),
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

  let message = t('couldNotAddEdge')
  if (error) {
    return showNotification({
      message,
      type: NOTIFY_WARNING
    })
  }

  if (!data || Object.keys(data).length !== 1) {
    return showNotification({
      message,
      type: NOTIFY_WARNING
    })
  }

  const { id, userDefined, userId } = data[Object.keys(data)[0]]

  const stringId = id.toString()

  const edge = {
    from,
    to,
    edgeId: stringId,
    id: stringId,
    label: edgeLabel,
    rdfsLabel: edgeLabel,
    rdfAbout: edgeId,
    userDefined,
    userId
  }

  updateStoreValue(['objectPropertiesFromApi', stringId], OPERATION_TYPE_UPDATE, edge)
  updateStoreValue(['objectPropertiesFromApiBackup', stringId], OPERATION_TYPE_UPDATE, edge)

  // add to triples
  updateStoreValue(['totalEdgesPerNode', from], OPERATION_TYPE_PUSH_UNIQUE, stringId)
  updateStoreValue(['totalEdgesPerNode', from], OPERATION_TYPE_PUSH_UNIQUE, stringId)
  updateStoreValue(['totalEdgesPerNodeBackup', to], OPERATION_TYPE_PUSH_UNIQUE, stringId)
  updateStoreValue(['totalEdgesPerNodeBackup', to], OPERATION_TYPE_PUSH_UNIQUE, stringId)

  updateStoreValue(['addedEdges'], OPERATION_TYPE_PUSH_UNIQUE, stringId)

  const isFromVisible = getNode(from) !== null
  const isToVisible = getNode(from) !== null

  if (isFromVisible && isToVisible) {
    updateStoreValue(['nodesEdges', from], OPERATION_TYPE_PUSH_UNIQUE, stringId)
    updateStoreValue(['nodesEdges', to], OPERATION_TYPE_PUSH_UNIQUE, stringId)
  }

  // add edge to graph and style
  if (isFromVisible && isToVisible) {
    const isVisible = checkEdgeVisibility({
      edgeId: stringId,
    })

    if (isVisible) {
      addEdge({
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

  message = `${t('edgeAdded')}: ${stringId}`

  showNotification({
    message,
    type: NOTIFY_SUCCESS
  })
}

export default setOntologyAddEdge
