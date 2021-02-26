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
const setOntologyDeleteEdge = ({
  setStoreState,
  selectedElement,
}) => {
  const {
    classesFromApi,
    deletedEdges,
    nodesEdges,
    edgesPerNode,
  } = store.getState()

  const newClassesFromApi = JSON.parse(JSON.stringify(classesFromApi))
  const newDeletedEdges = deletedEdges.slice()
  const newNodesEdges = JSON.parse(JSON.stringify(nodesEdges))
  const newEdgesPerNode = JSON.parse(JSON.stringify(edgesPerNode))

  // delete connections from graph and remove from graph
  if (selectedElement.length > 0) {
    selectedElement.map((element) => {
      if (!newDeletedEdges.includes(element)) {
        newDeletedEdges.push(element)
      }

      const {
        from,
        to
      } = getEdge(element)

      // delete from triples
      const fromPredicateIndex = newEdgesPerNode[from].indexOf(element)

      if (fromPredicateIndex > -1) {
        newEdgesPerNode[from].splice(fromPredicateIndex, 1)
      }

      const toPredicateIndex = newEdgesPerNode[to].indexOf(element)

      if (toPredicateIndex > -1) {
        newEdgesPerNode[to].splice(toPredicateIndex, 1)
      }

      // check if nodes are visible
      const isFromVisible = getNode(from) === null
      const isToVisible = getNode(to) === null

      if (isFromVisible || isToVisible) return false

      // delete from connections
      const fromPredicateConnectionIndex = newNodesEdges[from].indexOf(element)

      if (fromPredicateConnectionIndex > -1) {
        newEdgesPerNode[from].splice(fromPredicateConnectionIndex, 1)
      }

      const toPredicateConnectionIndex = newNodesEdges[to].indexOf(element)

      if (toPredicateConnectionIndex > -1) {
        newEdgesPerNode[to].splice(toPredicateConnectionIndex, 1)
      }

      removeEdge(element)

      return true
    })
  }

  setStoreState('nodesEdges', newNodesEdges)
  setStoreState('edgesPerNode', newEdgesPerNode)
  setStoreState('classesFromApi', newClassesFromApi)
  setStoreState('deletedEdges', newDeletedEdges)
}

export default setOntologyDeleteEdge
