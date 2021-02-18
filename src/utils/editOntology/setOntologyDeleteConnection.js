import store from '../../store'
import {
  SUBCLASSOF_PROPERTY,
  SUB_CLASS_OF_ID,
  OWL_RESTRICTION
} from '../../constants/graph'
import {
  getEdgeAndNodes
} from '../../constants/functions'
import removeEdge from '../nodesEdgesUtils/removeEdge'

/**
 * Filter array utility
 * @param  {Object}         params
 * @param  {Array}          params.arrayToFilter              array to filter
 * @param  {String}         params.from                       Starting node id
 * @param  {String}         params.predicate                  Predicate id
 * @param  {String}         params.to                         Ending node id
 * @return {Array}          filtered array
 */
const filterArray = ({
  arrayToFilter,
  predicate,
  from,
  to
}) => arrayToFilter.filter((triple) => {
  const isTriple = triple.from === from
  && triple.predicate === predicate
  && triple.to === to

  return !isTriple
})

/**
 * Remove connection from ontology
 * @param  {Object}         params
 * @param  {Function}       params.setStoreState              setStoreState action
 * @param  {Object}         params.selectedElement            Array of edge IDs
 * @return {undefined}
 */
const setOntologyDeleteConnection = ({
  setStoreState,
  selectedElement,
}) => {
  const {
    classesFromApi,
    deletedConnections,
    nodesConnections,
    triplesPerNode,
    edgesConnections
  } = store.getState()

  const newClassesFromApi = JSON.parse(JSON.stringify(classesFromApi))
  const newDeletedConnections = deletedConnections.slice()
  const newNodesConnections = JSON.parse(JSON.stringify(nodesConnections))
  const newTriplesPerNode = JSON.parse(JSON.stringify(triplesPerNode))
  const newEdgesConnections = JSON.parse(JSON.stringify(edgesConnections))

  // delete connections from graph and remove from graph
  if (selectedElement.length > 0) {
    selectedElement.map((element) => {
      if (!newDeletedConnections.includes(element)) {
        newDeletedConnections.push(element)
      }

      const [predicate, from, to] = getEdgeAndNodes(element)

      // remove connections
      if (newNodesConnections[from]) {
        const updatedConnections = filterArray({
          arrayToFilter: newNodesConnections[from],
          predicate,
          from,
          to
        })

        newNodesConnections[from] = updatedConnections
      }

      if (newTriplesPerNode[from]) {
        const updatedConnections = filterArray({
          arrayToFilter: newTriplesPerNode[from],
          predicate,
          from,
          to
        })

        newTriplesPerNode[from] = updatedConnections
      }

      if (newNodesConnections[to]) {
        const updatedConnections = filterArray({
          arrayToFilter: newNodesConnections[to],
          predicate,
          from,
          to
        })

        newNodesConnections[to] = updatedConnections
      }

      if (newTriplesPerNode[to]) {
        const updatedConnections = filterArray({
          arrayToFilter: newTriplesPerNode[to],
          predicate,
          from,
          to
        })

        newTriplesPerNode[to] = updatedConnections
      }

      if (newEdgesConnections[predicate]) {
        const updatedConnections = filterArray({
          arrayToFilter: newEdgesConnections[predicate],
          predicate,
          from,
          to
        })

        newEdgesConnections[predicate] = updatedConnections
      }

      //  remove from class
      const nodeConnections = newClassesFromApi[from][SUBCLASSOF_PROPERTY]
      const initialNodeConnectionsLength = nodeConnections.length

      nodeConnections.reverse().map((connection, index) => {
        if (connection.classRdfAbout === to) {
          const isSubClassOf = predicate === SUB_CLASS_OF_ID
          const isSamePredicate = connection[OWL_RESTRICTION]
            ? predicate === connection[OWL_RESTRICTION].objectPropertyRdfAbout
            : false

          if (isSubClassOf || isSamePredicate) {
            newClassesFromApi[from][SUBCLASSOF_PROPERTY]
              .splice((initialNodeConnectionsLength - 1) - index, 1)

            removeEdge(element)
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
  setStoreState('deletedConnections', newDeletedConnections)
}

export default setOntologyDeleteConnection
