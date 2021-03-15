/* eslint no-param-reassign:0 */
import addEdge from '../nodesEdgesUtils/addEdge'
import addNode from '../nodesEdgesUtils/addNode'
import getNode from '../nodesEdgesUtils/getNode'
import setEdgeStyle from '../networkStyling/setEdgeStyle'
import setNodeStyle from '../networkStyling/setNodeStyle'
import actionAfterNodesAdded from './actionAfterNodesAdded'
import getElementLabel from '../networkStyling/getElementLabel'

/**
 * Add nodes and/or edges to graph
 * @param  {Object}   params
 * @param  {Number}   params.nodeId           Selected node id
 * @param  {Number}   params.index            Item index in loop
 * @param  {Number}   params.edgesNumber      Total number of edges
 * @param  {Object}   params.edge             Edge object
 * @param  {Object}   params.nodesEdges       Edges per node
 * @param  {Object}   params.classesFromApi   All nodes with properties
 * @param  {Function} params.addNumber        addNumber action
 * @param  {Function} params.setStoreState    setStoreState action
 * @return {undefined}
 */
const addExpandedNode = ({
  nodeId,
  index,
  edgesNumber,
  edge,
  nodesEdges,
  setStoreState,
  classesFromApi,
  addNumber,
}) => {
  if (!edge) return false

  const {
    id,
    from,
    to
  } = edge

  // check if node exists
  const nodeIdToCheck = from === nodeId ? to : from

  const isNodeNotAvailable = getNode(nodeIdToCheck) === null

  if (isNodeNotAvailable) {
    const nodeIdObject = classesFromApi[nodeIdToCheck]

    nodeIdObject.label = getElementLabel({
      type: 'node',
      id: nodeIdToCheck
    })

    nodeIdObject.x = Math.floor((Math.random() * 100) + 1)
    nodeIdObject.y = Math.floor((Math.random() * 100) + 1)

    addNode({ node: nodeIdObject, addNumber })
    setNodeStyle({
      node: nodeIdObject,
      skipSpider: true
    })

    if (!nodesEdges[nodeIdToCheck]) {
      nodesEdges[nodeIdToCheck] = []
    }

    if (!nodesEdges[nodeId]) {
      nodesEdges[nodeId] = []
    }

    nodesEdges[nodeIdToCheck].push(id)
    nodesEdges[nodeId].push(id)
  }

  addEdge({ edge, addNumber })
  setEdgeStyle({
    edge
  })

  if (index === edgesNumber - 1) {
    actionAfterNodesAdded({
      setStoreState,
      addNumber,
      nodesEdges,
    })
  }
}

export default addExpandedNode
