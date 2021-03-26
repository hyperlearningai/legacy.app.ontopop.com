import store from '../../store'
import addEdge from '../nodesEdgesUtils/addEdge'
import actionAfterNodesAdded from './actionAfterNodesAdded'

/**
 * Add edges to graph
 * @param  {Object}   params
 * @param  {Function} params.updateStoreValue               updateStoreValue action
 * @param  {Function} params.visibleEdges                   Edges id to add
 * @param  {Boolean}  params.isLast                         Flag for last node
 * @return { undefined }
 */
const addEdgeToGraph = ({
  updateStoreValue,
  edgeId,
  isLast
}) => {
  const {
    objectPropertiesFromApi,
  } = store.getState()

  const edge = objectPropertiesFromApi[edgeId]

  // add node
  addEdge({
    edge,
    updateStoreValue
  })

  if (isLast) {
    actionAfterNodesAdded({
      updateStoreValue
    })
  }
}

export default addEdgeToGraph
