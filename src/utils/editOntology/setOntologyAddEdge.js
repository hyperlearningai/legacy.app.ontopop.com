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

/**
 * ADd ontology edge
 * @param  {Object}         params
 * @param  {Function}       params.addNumber                  addNumber action
 * @param  {Function}       params.setStoreState              setStoreState action
 * @param  {Function}       params.toggleFromSubArray        toggleFromSubArray action
 * @param  {Function}       params.toggleFromArrayInKey        toggleFromSubArray action
 * @param  {Function}       params.t                          i18n function
 * @param  {Object}         params.selectedElementProperties  Element properties with from,to,edge keys
 * @return {undefined}
 */
const setOntologyAddEdge = async ({
  addNumber,
  setStoreState,
  selectedElementProperties,
  toggleFromSubArray,
  toggleFromArrayInKey,
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
    addNumber,
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

  setStoreState('objectPropertiesFromApiBackup', newObjectPropertiesFromApiBackup)
  setStoreState('objectPropertiesFromApi', newObjectPropertiesFromApi)
  setStoreState('nodesEdges', newNodesEdges)
  setStoreState('totalEdgesPerNode', newEdgesPerNode)
  setStoreState('totalEdgesPerNodeBackup', newEdgesPerNodeBackup)
  setStoreState('addedEdges', newAddedEdges)

  // add edge to graph and style
  if (isFromVisible && isToVisible) {
    const isVisible = checkEdgeVisibility({
      edgeId: edge.id,
      toggleFromSubArray
    })

    if (isVisible) {
      addEdge({
        edge,
        addNumber,
        toggleFromArrayInKey
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
