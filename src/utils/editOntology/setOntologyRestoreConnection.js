import store from '../../store'
import {
  SUBCLASSOF_PROPERTY,
  SUB_CLASS_OF_ID
} from '../../constants/graph'
import getEdgeObject from '../graphVisualisation/getEdgeObject'
import { getEdgeAndNodes } from '../../constants/functions'
import addEdge from '../nodesEdgesUtils/addEdge'
import getNode from '../nodesEdgesUtils/getNode'
import setEdgeStylesByProperty from '../networkStyling/setEdgeStylesByProperty'
/**
 * ADd ontology edge
 * @param  {Object}         params
 * @param  {Function}       params.setStoreState              setStoreState action
 * @param  {Function}       params.addToObject                Add to object action
 * @param  {Object}         params.selectedElementProperties  Element properties with from,to,predicate keys
 * @return {undefined}
 */
const setOntologyRestoreConnection = ({
  setStoreState,
  selectedElement,
}) => {
  const {
    classesFromApi,
    objectPropertiesFromApi,
    deletedConnections,
    nodesConnections,
    triplesPerNode,
    edgesConnections
  } = store.getState()

  const newClassesFromApi = JSON.parse(JSON.stringify(classesFromApi))
  const newNodesConnections = JSON.parse(JSON.stringify(nodesConnections))
  const newTriplesPerNode = JSON.parse(JSON.stringify(triplesPerNode))
  const newEdgesConnections = JSON.parse(JSON.stringify(edgesConnections))

  // remove selected elements from deleted connection
  const newDeletedConnections = deletedConnections.filter((connection) => !selectedElement.includes(connection))
  setStoreState('deletedConnections', newDeletedConnections)

  // restore connections from graph
  if (selectedElement.length > 0) {
    selectedElement.map((element) => {
      const [predicate, from, to] = getEdgeAndNodes(element)

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

      // get edge object from objectPropertiesFromApi and add to graph
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

      if (
        getNode(from) !== null
        && getNode(to) !== null) {
        addEdge(edge)

        // add connections
        if (newEdgesConnections[predicate]) {
          newEdgesConnections[predicate].push(edgeConnection)
        }

        if (newNodesConnections[from]) {
          newNodesConnections[from].push(edgeConnectionWithPredicate)
        }

        if (newNodesConnections[to]) {
          newNodesConnections[to].push(edgeConnectionWithPredicate)
        }

        setEdgeStylesByProperty({
          edgeId: edge.id
        })
      }

      return true
    })
  }

  // add data
  setStoreState('nodesConnections', newNodesConnections)
  setStoreState('edgesConnections', newEdgesConnections)
  setStoreState('triplesPerNode', newTriplesPerNode)
  setStoreState('classesFromApi', newClassesFromApi)
}

export default setOntologyRestoreConnection
