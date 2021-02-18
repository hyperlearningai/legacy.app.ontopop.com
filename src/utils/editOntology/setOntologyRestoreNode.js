import flatten from 'flat'
import { SUBCLASSOF_PROPERTY, SUB_CLASS_OF_ID } from '../../constants/graph'
import store from '../../store'
import addEdge from '../nodesEdgesUtils/addEdge'
import addNode from '../nodesEdgesUtils/addNode'
import getNode from '../nodesEdgesUtils/getNode'
import getEdgeObject from '../graphVisualisation/getEdgeObject'
import setElementsStyle from '../networkStyling/setElementsStyle'

/**
 * Restore ontology nodes
 * @param  {Object}         params
 * @param  {String|Array}   params.selectedElement            Selected node(s)/edge(s) IDs
 * @param  {Function}       params.setStoreState              setStoreState action
 * @param  {Function}       params.addToObject                Add to object action
 * @return {undefined}
 */
const setOntologyRestoreNode = ({
  selectedElement,
  setStoreState,
}) => {
  const {
    classesFromApiBackup,
    classesFromApi,
    deletedNodes,
    objectPropertiesFromApi,
    stylingNodeCaptionProperty,
    nodesConnections,
    triplesPerNode,
    edgesConnections
  } = store.getState()

  const newClassesFromApi = JSON.parse(JSON.stringify(classesFromApi))
  const newClassesFromApiBackup = JSON.parse(JSON.stringify(classesFromApiBackup))
  const newNodesConnections = JSON.parse(JSON.stringify(nodesConnections))
  const newTriplesPerNode = JSON.parse(JSON.stringify(triplesPerNode))
  const newEdgesConnections = JSON.parse(JSON.stringify(edgesConnections))

  // Remove nodes from deletedNodes
  const newDeletedNodes = deletedNodes.slice().filter((nodeId) => !selectedElement.includes(nodeId))

  // add from and to connections back
  const flatClassesFromApi = flatten(newClassesFromApiBackup)

  if (selectedElement.length > 0) {
    // first add node and related connections back
    selectedElement.map((nodeId) => {
      const nodeObject = newClassesFromApiBackup[nodeId] || {}
      newClassesFromApi[nodeId] = JSON.parse(JSON.stringify(nodeObject))

      nodeObject.id = nodeId
      nodeObject.label = nodeObject[stylingNodeCaptionProperty]

      addNode(nodeObject)

      // add connection back
      newNodesConnections[nodeId] = []
      newTriplesPerNode[nodeId] = []

      return true
    })

    // needed to make getEdgeObject work
    setStoreState('classesFromApi', newClassesFromApi)

    // then add connections
    selectedElement.map((nodeId) => {
      const nodeObject = newClassesFromApiBackup[nodeId]

      // add from connections back
      const { rdfsSubClassOf } = nodeObject

      if (rdfsSubClassOf && rdfsSubClassOf.length > 0) {
        rdfsSubClassOf.map((subClassOf) => {
          const to = subClassOf.classRdfAbout

          if (newDeletedNodes.includes(to)) return false

          const { owlRestriction } = subClassOf
          const predicate = owlRestriction ? owlRestriction.objectPropertyRdfAbout : SUB_CLASS_OF_ID

          const {
            edge,
            edgeConnection
          } = getEdgeObject({
            classesFromApi,
            from: nodeId,
            objectPropertiesFromApi,
            predicate,
            to,
          })

          const edgeConnectionWithPredicate = {
            ...edgeConnection,
            predicate
          }

          if (newTriplesPerNode[nodeId]) {
            newTriplesPerNode[nodeId].push(edgeConnectionWithPredicate)
          }

          if (newTriplesPerNode[to]) {
            newTriplesPerNode[to].push(edgeConnectionWithPredicate)
          }

          // add to graph and to visible connections if to node on canvas
          if (getNode(to) !== null) {
            addEdge(edge)

            // add connections
            if (newEdgesConnections[predicate]) {
              newEdgesConnections[predicate].push(edgeConnection)
            }

            if (newNodesConnections[nodeId]) {
              newNodesConnections[nodeId].push(edgeConnectionWithPredicate)
            }

            if (newNodesConnections[to]) {
              newNodesConnections[to].push(edgeConnectionWithPredicate)
            }
          }

          return true
        })
      }

      // add to connections back
      const flatClassKeysWithToConnections = Object.keys(flatClassesFromApi).filter((flatKey) => flatKey.includes('classRdfAbout')
      && !flatKey.includes('owlRestriction') && flatClassesFromApi[flatKey] === nodeId)

      flatClassKeysWithToConnections.reverse().map((flatClassKey) => {
        if (selectedElement.includes(flatClassesFromApi[flatClassKey])) {
          const [from] = flatClassKey.split('.rdfsSubClassOf.')
          const to = nodeId

          if (newDeletedNodes.includes(from)) return false

          const owlRestriction = flatClassesFromApi[flatClassKey.replace('classRdfAbout', 'owlRestriction')]
          const predicate = owlRestriction ? owlRestriction.objectPropertyRdfAbout : SUB_CLASS_OF_ID

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

          // add relationships
          newClassesFromApi[from][SUBCLASSOF_PROPERTY].push(connectionOwlObject)

          const {
            edge,
            edgeConnection
          } = getEdgeObject({
            classesFromApi,
            from,
            objectPropertiesFromApi,
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

          // add to graph and to visible connections if from node on canvas
          if (getNode(from) !== null) {
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
        }
        return true
      })

      return true
    })
  }

  setStoreState('nodesConnections', newNodesConnections)
  setStoreState('edgesConnections', newEdgesConnections)
  setStoreState('triplesPerNode', newTriplesPerNode)
  setStoreState('classesFromApi', newClassesFromApi)
  setStoreState('deletedNodes', newDeletedNodes)
  setElementsStyle()
}

export default setOntologyRestoreNode
