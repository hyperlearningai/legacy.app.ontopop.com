import store from '../../store'
import removeEdge from '../nodesEdgesUtils/removeEdge'
import getEdge from '../nodesEdgesUtils/getEdge'
import getNode from '../nodesEdgesUtils/getNode'

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
  } = store.getState()

  const newClassesFromApi = JSON.parse(JSON.stringify(classesFromApi))
  const newDeletedConnections = deletedConnections.slice()
  const newNodesConnections = JSON.parse(JSON.stringify(nodesConnections))
  const newTriplesPerNode = JSON.parse(JSON.stringify(triplesPerNode))

  // delete connections from graph and remove from graph
  if (selectedElement.length > 0) {
    selectedElement.map((element) => {
      if (!newDeletedConnections.includes(element)) {
        newDeletedConnections.push(element)
      }

      const {
        from,
        to
      } = getEdge(element)

      // delete from triples
      const fromPredicateIndex = newTriplesPerNode[from].indexOf(element)

      if (fromPredicateIndex > -1) {
        newTriplesPerNode[from].splice(fromPredicateIndex, 1)
      }

      const toPredicateIndex = newTriplesPerNode[to].indexOf(element)

      if (toPredicateIndex > -1) {
        newTriplesPerNode[to].splice(toPredicateIndex, 1)
      }

      // check if nodes are visible
      const isFromVisible = getNode(from)
      const isToVisible = getNode(to)

      if (isFromVisible === null || isToVisible === null) return false

      // delete from connections
      const fromPredicateConnectionIndex = newNodesConnections[from].indexOf(element)

      if (fromPredicateConnectionIndex > -1) {
        newTriplesPerNode[from].splice(fromPredicateConnectionIndex, 1)
      }

      const toPredicateConnectionIndex = newNodesConnections[to].indexOf(element)

      if (toPredicateConnectionIndex > -1) {
        newTriplesPerNode[to].splice(toPredicateConnectionIndex, 1)
      }

      removeEdge(element)

      return true
    })
  }

  setStoreState('nodesConnections', newNodesConnections)
  setStoreState('triplesPerNode', newTriplesPerNode)
  setStoreState('classesFromApi', newClassesFromApi)
  setStoreState('deletedConnections', newDeletedConnections)
}

export default setOntologyDeleteConnection
