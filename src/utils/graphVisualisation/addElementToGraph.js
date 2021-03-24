import addNode from '../nodesEdgesUtils/addNode'
import setNodeStyle from '../networkStyling/setNodeStyle'
import actionAfterNodesAdded from './actionAfterNodesAdded'
import addEdge from '../nodesEdgesUtils/addEdge'
import getElementLabel from '../networkStyling/getElementLabel'
import checkEdgeVisibility from '../networkGraphOptions/checkEdgeVisibility'
import checkNodeVisibility from '../networkGraphOptions/checkNodeVisibility'
import setEdgeStyle from '../networkStyling/setEdgeStyle'

/**
 * Node queue to avoid browser freezing
 * @param  {Object}   params
 * @param  {Object}   params.classesFromApi                 All available nodes
 * @param  {Array}    params.nodesIdsToDisplay              Node IDs to visualisa
 * @param  {Object}   params.objectPropertiesFromApi        All avilable edges
 * @param  {Object}   params.totalEdgesPerNode              List of edges per node
 * @param  {Function} params.updateStoreValue               updateStoreValue action
 * @param  {Number}   params.i                              Current node index
 * @param  {Number}   params.nodeIdsLength                  Total nodes number
 * @param  {Array}    params.processedEdges                 Edges already processed
 * @return { undefined }
 */
const addElementToGraph = ({
  updateStoreValue,
  classesFromApi,
  nodesIdsToDisplay,
  objectPropertiesFromApi,
  totalEdgesPerNode,
  i,
  nodeIdsLength,
  processedEdges,
}) => {
  const nodeId = nodesIdsToDisplay[i]
  const nodeIdObject = classesFromApi[nodeId]
  const triples = totalEdgesPerNode[nodeId]

  // add node
  nodeIdObject.label = getElementLabel({
    type: 'node',
    id: nodeId
  })
  nodeIdObject.title = nodeIdObject.label

  const isNodeVisible = checkNodeVisibility({
    nodeId,
  })

  if (isNodeVisible) {
    addNode({
      node: nodeIdObject,
      updateStoreValue,
    })

    setNodeStyle({ node: nodeIdObject, skipSpider: true })

    if (triples && triples.length > 0) {
      triples.map((edgeId) => {
        const edge = objectPropertiesFromApi[edgeId]

        const {
          from,
          to,
          id
        } = edge

        // check if edge to be displayed
        const isEdgeVisible = checkEdgeVisibility({
          edgeId: id,
        })

        if (!isEdgeVisible) return false
        if (!from || !to) return false

        const isEdgeDisplayable = nodesIdsToDisplay.includes(to.toString())
        && nodesIdsToDisplay.includes(from.toString())

        if (!isEdgeDisplayable) return false

        const nodeToAdd = to.toString() === nodeId.toString() ? from.toString() : to.toString()

        const isNodeToAddVisible = checkNodeVisibility({
          nodeId: nodeToAdd,
        })

        if (!isNodeToAddVisible) return false

        edge.label = getElementLabel({
          type: 'edge',
          id: edgeId
        })

        const isEdgeExisting = processedEdges.includes(edgeId)

        if (isEdgeExisting) return false

        processedEdges.push(edgeId)

        addEdge({
          edge,
          updateStoreValue
        })

        setEdgeStyle({
          edge
        })

        const nodeToAddObject = classesFromApi[nodeToAdd]

        nodeToAddObject.label = getElementLabel({
          type: 'node',
          id: nodeToAdd
        })
        nodeToAddObject.title = nodeToAddObject.label

        addNode({
          node: nodeToAddObject,
          updateStoreValue
        })

        return setNodeStyle({ node: nodeToAddObject, skipSpider: true })
      })
    }
  }

  if (i === nodeIdsLength - 1) {
    actionAfterNodesAdded({
      updateStoreValue
    })
  }
}

export default addElementToGraph
