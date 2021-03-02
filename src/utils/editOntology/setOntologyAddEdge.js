import store from '../../store'
import addEdge from '../nodesEdgesUtils/addEdge'
import showNotification from '../notifications/showNotification'
import { NOTIFY_SUCCESS, NOTIFY_WARNING } from '../../constants/notifications'
import setNodeStyle from '../networkStyling/setNodeStyle'
import setEdgeStylesByProperty from '../networkStyling/setEdgeStylesByProperty'
import getNode from '../nodesEdgesUtils/getNode'
import { POST_CREATE_EDGE } from '../../constants/api'
import httpCall from '../apiCalls/httpCall'

/**
 * ADd ontology edge
 * @param  {Object}         params
 * @param  {Function}       params.setStoreState              setStoreState action
 * @param  {Function}       params.t                          i18n function
 * @param  {Object}         params.selectedElementProperties  Element properties with from,to,edge keys
 * @return {undefined}
 */
const setOntologyAddEdge = async ({
  setStoreState,
  selectedElementProperties,
  t
}) => {
  const {
    objectPropertiesFromApi,
    objectPropertiesFromApiBackup,
    addedEdges,
    nodesEdges,
    edgesPerNode
  } = store.getState()

  const newObjectPropertiesFromApi = JSON.parse(JSON.stringify(objectPropertiesFromApi))
  const newObjectPropertiesFromApiBackup = JSON.parse(JSON.stringify(objectPropertiesFromApiBackup))
  const newNodesEdges = JSON.parse(JSON.stringify(nodesEdges))
  const newEdgesPerNode = JSON.parse(JSON.stringify(edgesPerNode))

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
    setStoreState,
    withAuth: true,
    route: POST_CREATE_EDGE,
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

  const { id, userDefined } = data[Object.keys(data)[0]]

  const edge = {
    from,
    to,
    edgeId: id,
    id,
    label: edgeLabel,
    rdfsLabel: edgeLabel,
    rdfAbout: edgeId,
    userDefined
  }

  newObjectPropertiesFromApi[id] = edge
  newObjectPropertiesFromApiBackup[id] = edge

  // add to triples
  newEdgesPerNode[from].push(id)
  newEdgesPerNode[to].push(id)

  const isFromVisible = getNode(from) !== null
  const isToVisible = getNode(from) !== null

  if (isFromVisible && isToVisible) {
    addEdge(edge)

    newNodesEdges[from].push(id)
    newNodesEdges[to].push(id)
  }

  // add data
  const newAddedEdges = [
    ...addedEdges,
    ...[id]
  ]

  setStoreState('objectPropertiesFromApi', newObjectPropertiesFromApi)
  setStoreState('objectPropertiesFromApiBackup', newObjectPropertiesFromApiBackup)
  setStoreState('nodesEdges', newNodesEdges)
  setStoreState('edgesPerNode', newEdgesPerNode)
  setStoreState('addedEdges', newAddedEdges)

  // add edge to graph and style
  setNodeStyle({
    nodeId: from,
  })
  setNodeStyle({
    nodeId: to,
  })

  setEdgeStylesByProperty({
    edgeId: id
  })

  message = `${t('edgeAdded')}: ${id}`

  showNotification({
    message,
    type: NOTIFY_SUCCESS
  })
}

export default setOntologyAddEdge
