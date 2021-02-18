import flatten from 'flat'
import store from '../../store'
import addEdge from '../nodesEdgesUtils/addEdge'
import getNode from '../nodesEdgesUtils/getNode'
import getEdgeObject from '../graphVisualisation/getEdgeObject'
import { generatePredicateId } from '../../constants/functions'
import setElementsStyle from '../networkStyling/setElementsStyle'

/**
 * Restore ontology nodes
 * @param  {Object}         params
 * @param  {String|Array}   params.selectedElement            Selected node(s)/edge(s) IDs
 * @param  {Function}       params.setStoreState              setStoreState action
 * @param  {Function}       params.addToObject                Add to object action
 * @return {undefined}
 */
const setOntologyRestoreEdge = ({
  selectedElement,
  setStoreState,
}) => {
  const {
    classesFromApi,
    objectPropertiesFromApi,
    deletedEdges,
    nodesConnections,
    triplesPerNode,
    objectPropertiesFromApiBackup,
    classesFromApiBackup,
    edgesConnections,
    deletedConnections,
    deletedNodes
  } = store.getState()

  const newClassesFromApi = JSON.parse(JSON.stringify(classesFromApi))
  const newClassesFromApiBackup = JSON.parse(JSON.stringify(classesFromApiBackup))
  const newObjectPropertiesFromApiBackup = JSON.parse(JSON.stringify(objectPropertiesFromApiBackup))
  const newObjectPropertiesFromApi = JSON.parse(JSON.stringify(objectPropertiesFromApi))
  const newNodesConnections = JSON.parse(JSON.stringify(nodesConnections))
  const newTriplesPerNode = JSON.parse(JSON.stringify(triplesPerNode))
  const newEdgesConnections = JSON.parse(JSON.stringify(edgesConnections))

  // remove selected elements from deleted connection
  const newDeletedEdges = deletedEdges.filter((edge) => !selectedElement.includes(edge))
  setStoreState('deletedEdges', newDeletedEdges)

  if (selectedElement.length > 0) {
    // restore edge from backup to objectPropertiesFromApi
    selectedElement.map((edgeId) => {
      const edgeObjectBackup = newObjectPropertiesFromApiBackup[edgeId] || {}

      newObjectPropertiesFromApi[edgeId] = edgeObjectBackup
      edgesConnections[edgeId] = []
      return true
    })
  }

  // needed to make getEdgeObject work
  setStoreState('objectPropertiesFromApi', newObjectPropertiesFromApi)

  const flatClassesFromApiBackup = flatten(newClassesFromApiBackup)
  const flatObjectPropertiesKeys = Object.keys(flatClassesFromApiBackup).filter((flatKey) => flatKey.includes('objectPropertyRdfAbout') && selectedElement.includes(
    flatClassesFromApiBackup[flatKey]
  ))

  flatObjectPropertiesKeys.map((flatObjectPropertiesKey) => {
    const [from] = flatObjectPropertiesKey.split('.rdfsSubClassOf.')
    const to = flatClassesFromApiBackup[flatObjectPropertiesKey.replace('objectPropertyRdfAbout', 'classRdfAbout')]
    const predicate = flatClassesFromApiBackup[flatObjectPropertiesKey]

    const edgeId = generatePredicateId({
      from,
      to,
      predicate
    })

    if (deletedConnections.includes(edgeId)) return false
    if (deletedNodes.includes(from)) return false
    if (deletedNodes.includes(to)) return false

    const {
      edge,
      edgeConnection
    } = getEdgeObject({
      from,
      predicate,
      to,
    })

    const edgeConnectionWithPredicate = {
      ...edgeConnection,
      predicate
    }

    if (newTriplesPerNode[from]) {
      newTriplesPerNode[from].push(edgeConnectionWithPredicate)
    }

    if (newTriplesPerNode[to]) {
      newTriplesPerNode[to].push(edgeConnectionWithPredicate)
    }

    if (getNode(from) !== null
      && getNode(to) !== null) {
      addEdge(edge)

      // add edge connections
      if (newEdgesConnections[predicate]) {
        newEdgesConnections[predicate].push(edgeConnection)
      }

      if (newNodesConnections[from]) {
        newNodesConnections[from].push(edgeConnectionWithPredicate)
      }

      if (newNodesConnections[to]) {
        newNodesConnections[to].push(edgeConnectionWithPredicate)
      }
    }

    return true
  })

  setStoreState('nodesConnections', newNodesConnections)
  setStoreState('edgesConnections', newEdgesConnections)
  setStoreState('triplesPerNode', newTriplesPerNode)
  setStoreState('classesFromApi', newClassesFromApi)
  setStoreState('objectPropertiesFromApi', newObjectPropertiesFromApi)
  setElementsStyle()
}

export default setOntologyRestoreEdge
