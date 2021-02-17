import store from '../../store'
import {
  SUBCLASSOF_PROPERTY,
  SUB_CLASS_OF_ID
} from '../../constants/graph'
import getEdgeObject from '../graphVisualisation/getEdgeObject'
import addEdge from '../nodesEdgesUtils/addEdge'
import getEdge from '../nodesEdgesUtils/getEdge'
import showNotification from '../showNotification'
import { NOTIFY_WARNING } from '../../constants/notifications'
import setNodeStyle from '../networkStyling/setNodeStyle'
import setEdgeStylesByProperty from '../networkStyling/setEdgeStylesByProperty'
import { generatePredicateId } from '../../constants/functions'

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
    classesFromApi,
    objectPropertiesFromApi,
    addedConnections,
    nodesConnections,
    edgesConnections,
    triplesPerNode
  } = store.getState()

  const newClassesFromApi = JSON.parse(JSON.stringify(classesFromApi))
  const newNodesConnections = JSON.parse(JSON.stringify(nodesConnections))
  const newEdgesConnections = JSON.parse(JSON.stringify(edgesConnections))
  const newTriplesPerNode = JSON.parse(JSON.stringify(triplesPerNode))

  const {
    from, to, predicate
  } = selectedElementProperties

  // get edge object from objectPropertiesFromApi and add to graph
  const { edge } = getEdgeObject({
    classesFromApi,
    from,
    objectPropertiesFromApi,
    predicate,
    to,
  })

  if (getEdge(edge.id) !== null) {
    const message = `${t('connectionAlreadyExists')}: ${edge.id}`

    return showNotification({
      message,
      type: NOTIFY_WARNING
    })
  }

  // add connection to newClassesFromApi
  if (!newClassesFromApi[from][SUBCLASSOF_PROPERTY]) {
    newClassesFromApi[from][SUBCLASSOF_PROPERTY] = []
  }

  const connectionOwlObject = {
    classRdfAbout: to,
    owlRestriction: null
  }

  if (predicate !== SUB_CLASS_OF_ID) {
    connectionOwlObject.owlRestriction = {
      objectPropertyRdfAbout: predicate,
      classRdfAbout: to
    }
  }

  newClassesFromApi[from][SUBCLASSOF_PROPERTY].push(connectionOwlObject)

  // add connection to both to and from node
  const nodeConnection = {
    from,
    predicate,
    to,
  }

  newNodesConnections[from].push(nodeConnection)
  newNodesConnections[to].push(nodeConnection)
  newTriplesPerNode[from].push(nodeConnection)
  newTriplesPerNode[to].push(nodeConnection)

  // add connection to edge
  newEdgesConnections[predicate].push({
    from,
    to
  })

  // add data
  const newAddedConnections = [
    ...addedConnections,
    ...[edge.id]
  ]

  setStoreState('edgesConnections', newEdgesConnections)
  setStoreState('nodesConnections', newNodesConnections)
  setStoreState('triplesPerNode', newTriplesPerNode)
  setStoreState('classesFromApi', newClassesFromApi)
  setStoreState('addedConnections', newAddedConnections)

  // add edge to graph and style
  addEdge(edge)
  setNodeStyle({
    nodeId: from,
  })
  setNodeStyle({
    nodeId: to,
  })

  setEdgeStylesByProperty({
    edgeId: generatePredicateId(nodeConnection)
  })
}

export default setOntologyAddConnection
