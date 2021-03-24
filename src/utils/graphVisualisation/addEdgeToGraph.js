import store from '../../store'
import getElementLabel from '../networkStyling/getElementLabel'
import addEdge from '../nodesEdgesUtils/addEdge'
import setEdgeStyle from '../networkStyling/setEdgeStyle'
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

  edge.label = getElementLabel({
    type: 'edge',
    id: edgeId
  })

  // add node
  addEdge({
    edge,
    updateStoreValue
  })

  setEdgeStyle({
    edge
  })

  if (isLast) {
    actionAfterNodesAdded({
      updateStoreValue
    })
  }
}

export default addEdgeToGraph
