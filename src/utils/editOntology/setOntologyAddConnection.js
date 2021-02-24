import store from '../../store'
import addEdge from '../nodesEdgesUtils/addEdge'
import getEdge from '../nodesEdgesUtils/getEdge'
import showNotification from '../notifications/showNotification'
import { NOTIFY_WARNING } from '../../constants/notifications'
import setNodeStyle from '../networkStyling/setNodeStyle'
import setEdgeStylesByProperty from '../networkStyling/setEdgeStylesByProperty'
import getNode from '../nodesEdgesUtils/getNode'
import { USER_DEFINED_PROPERTY } from '../../constants/graph'

/**
 * ADd ontology edge
 * @param  {Object}         params
 * @param  {Function}       params.setStoreState              setStoreState action
 * @param  {Function}       params.t                          i18n function
 * @param  {Object}         params.selectedElementProperties  Element properties with from,to,predicate keys
 * @return {undefined}
 */
const setOntologyAddConnection = ({
  setStoreState,
  selectedElementProperties,
  t
}) => {
  const {
    objectPropertiesFromApi,
    objectPropertiesFromApiBackup,
    addedConnections,
    nodesConnections,
    triplesPerNode
  } = store.getState()

  const newObjectPropertiesFromApi = JSON.parse(JSON.stringify(objectPropertiesFromApi))
  const newObjectPropertiesFromApiBackup = JSON.parse(JSON.stringify(objectPropertiesFromApiBackup))
  const newNodesConnections = JSON.parse(JSON.stringify(nodesConnections))
  const newTriplesPerNode = JSON.parse(JSON.stringify(triplesPerNode))

  const {
    from,
    to,
    predicate,
    optionEdges
  } = selectedElementProperties

  const predicateLabel = optionEdges.find((option) => option.value === predicate).label

  const id = Math.floor((Math.random() * 1000000) + 1).toString()

  const edge = {
    from,
    predicate,
    to,
    edgeId: id,
    id,
    role: predicateLabel,
    label: predicateLabel,
    rdfsLabel: predicateLabel,
    rdfAbout: predicate,
    [USER_DEFINED_PROPERTY]: true,
    edgeProperties: {
      id,
      label: 'subclass',
      objectPropertyRdfAbout: predicate,
      objectPropertyRdfsLabel: predicateLabel,
      edgeId: id
    },
    sourceNodeId: from,
    targetNodeId: from,
  }

  if (getEdge(id) !== null) {
    const message = `${t('connectionAlreadyExists')}: ${id}`

    return showNotification({
      message,
      type: NOTIFY_WARNING
    })
  }

  newObjectPropertiesFromApi[id] = edge
  newObjectPropertiesFromApiBackup[id] = edge

  // add to triples
  newTriplesPerNode[from].push(id)
  newTriplesPerNode[to].push(id)

  const isFromVisible = getNode(from) !== null
  const isToVisible = getNode(from) !== null

  if (isFromVisible && isToVisible) {
    addEdge(edge)

    newNodesConnections[from].push(id)
    newNodesConnections[to].push(id)
  }

  // add data
  const newAddedConnections = [
    ...addedConnections,
    ...[id]
  ]

  setStoreState('objectPropertiesFromApi', newObjectPropertiesFromApi)
  setStoreState('objectPropertiesFromApiBackup', newObjectPropertiesFromApiBackup)
  setStoreState('nodesConnections', newNodesConnections)
  setStoreState('triplesPerNode', newTriplesPerNode)
  setStoreState('addedConnections', newAddedConnections)

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
}

export default setOntologyAddConnection
