import store from '../../store'
import addEdge from '../nodesEdgesUtils/addEdge'
import showNotification from '../notifications/showNotification'
import { NOTIFY_SUCCESS, NOTIFY_WARNING } from '../../constants/notifications'
import setNodeStyle from '../networkStyling/setNodeStyle'
import setEdgeStyleByProperty from '../networkStyling/setEdgeStyleByProperty'
import getNode from '../nodesEdgesUtils/getNode'
import { API_ENDPOINT_GRAPH_EDGES_CREATE } from '../../constants/api'
import httpCall from '../apiCalls/httpCall'
import checkEdgeVisibility from '../networkGraphOptions/checkEdgeVisibility'
import { OPERATION_TYPE_UPDATE } from '../../constants/store'

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
    objectPropertiesFromApi,
    objectPropertiesFromApiBackup,
    addedEdges,
    nodesEdges,
    totalEdgesPerNode,
    totalEdgesPerNodeBackup,
  } = store.getState()

  const newObjectPropertiesFromApi = JSON.parse(JSON.stringify(objectPropertiesFromApi))
  const newObjectPropertiesFromApiBackup = JSON.parse(JSON.stringify(objectPropertiesFromApiBackup))
  const newNodesEdges = JSON.parse(JSON.stringify(nodesEdges))
  const newEdgesPerNodeBackup = JSON.parse(JSON.stringify(totalEdgesPerNodeBackup))
  const newEdgesPerNode = JSON.parse(JSON.stringify(totalEdgesPerNode))

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

  const edge = {
    from,
    to,
    edgeId: id,
    id,
    label: edgeLabel,
    rdfsLabel: edgeLabel,
    rdfAbout: edgeId,
    userDefined,
    userId
  }

  newObjectPropertiesFromApi[id] = edge
  newObjectPropertiesFromApiBackup[id] = edge

  // add to triples
  newEdgesPerNode[from].push(id)
  newEdgesPerNodeBackup[from].push(id)
  newEdgesPerNode[to].push(id)
  newEdgesPerNodeBackup[to].push(id)

  const isFromVisible = getNode(from) !== null
  const isToVisible = getNode(from) !== null

  if (isFromVisible && isToVisible) {
    newNodesEdges[from].push(id)
    newNodesEdges[to].push(id)
  }

  // add data
  const newAddedEdges = [
    ...addedEdges,
    ...[id]
  ]

  updateStoreValue(['objectPropertiesFromApiBackup'], OPERATION_TYPE_UPDATE, newObjectPropertiesFromApiBackup)
  updateStoreValue(['objectPropertiesFromApi'], OPERATION_TYPE_UPDATE, newObjectPropertiesFromApi)
  updateStoreValue(['nodesEdges'], OPERATION_TYPE_UPDATE, newNodesEdges)
  updateStoreValue(['totalEdgesPerNode'], OPERATION_TYPE_UPDATE, newEdgesPerNode)
  updateStoreValue(['totalEdgesPerNodeBackup'], OPERATION_TYPE_UPDATE, newEdgesPerNodeBackup)
  updateStoreValue(['addedEdges'], OPERATION_TYPE_UPDATE, newAddedEdges)

  // add edge to graph and style
  if (isFromVisible && isToVisible) {
    const isVisible = checkEdgeVisibility({
      edgeId: edge.id,
    })

    if (isVisible) {
      addEdge({
        edge,
        updateStoreValue,
      })

      setNodeStyle({
        nodeId: from,
      })
      setNodeStyle({
        nodeId: to,
      })

      setEdgeStyleByProperty({
        edgeId: id
      })
    }
  }

  message = `${t('edgeAdded')}: ${id}`

  showNotification({
    message,
    type: NOTIFY_SUCCESS
  })
}

export default setOntologyAddEdge
