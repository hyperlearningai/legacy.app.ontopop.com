/* eslint no-param-reassign:0 */
import addEdge from '../nodesEdgesUtils/addEdge'
import addNode from '../nodesEdgesUtils/addNode'
import getNode from '../nodesEdgesUtils/getNode'
import setEdgeStyle from '../networkStyling/setEdgeStyle'
import setNodeStyle from '../networkStyling/setNodeStyle'
import actionAfterNodesAdded from './actionAfterNodesAdded'

/**
 * Add nodes and/or edges to graph
 * @param  {Object}   params
 * @param  {Number}   params.nodeId           Selected node id
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
  globalNodeStyling,
  userDefinedNodeStyling,
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

    const { stylingNodeCaptionProperty } = nodeIdObject.userDefined ? userDefinedNodeStyling : globalNodeStyling

    nodeIdObject.label = nodeIdObject[stylingNodeCaptionProperty]
      ? nodeIdObject[stylingNodeCaptionProperty].replace(/ /g, '\n') : ''

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
