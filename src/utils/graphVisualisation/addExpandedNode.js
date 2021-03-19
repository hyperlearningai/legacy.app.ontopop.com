/* eslint no-param-reassign:0 */
import addEdge from '../nodesEdgesUtils/addEdge'
import addNode from '../nodesEdgesUtils/addNode'
import getNode from '../nodesEdgesUtils/getNode'
import setEdgeStyle from '../networkStyling/setEdgeStyle'
import setNodeStyle from '../networkStyling/setNodeStyle'
import actionAfterNodesAdded from './actionAfterNodesAdded'
import getElementLabel from '../networkStyling/getElementLabel'
import checkNodeVisibility from '../networkGraphOptions/checkNodeVisibility'
import checkEdgeVisibility from '../networkGraphOptions/checkEdgeVisibility'

/**
 * Add nodes and/or edges to graph
 * @param  {Object}   params
 * @param  {Number}   params.nodeId                 Selected node id
 * @param  {Number}   params.index                  Item index in loop
 * @param  {Number}   params.edgesNumber            Total number of edges
 * @param  {Number}   params.edgesNumber            Total number of edges
 * @param  {Object}   params.edge                   Edge object
 * @param  {Object}   params.classesFromApi         All nodes with properties
 * @param  {Function} params.addNumber              addNumber action
 * @param  {Function} params.setStoreState          setStoreState action
 * @param  {Function} params.toggleFromSubArray     toggleFromSubArray action
 * @param  {Function} params.toggleFromArrayInKey   toggleFromArrayInKey action
 * @return {undefined}
 */
const addExpandedNode = ({
  nodeId,
  index,
  edgesNumber,
  edge,
  toggleFromArrayInKey,
  setStoreState,
  classesFromApi,
  toggleFromSubArray,
  addNumber,
}) => {
  if (!edge) return false

  const {
    id,
    from,
    to
  } = edge

  // check if edge to be displayed
  const isEdgeVisible = checkEdgeVisibility({
    edgeId: id,
    toggleFromSubArray
  })

  if (isEdgeVisible) {
    // check if node exists
    const nodeIdToCheck = from === nodeId ? to : from

    const isNodeNotAvailable = getNode(nodeIdToCheck) === null

    if (isNodeNotAvailable) {
      // check visibility
      const isVisible = checkNodeVisibility({
        nodeId: nodeIdToCheck,
        toggleFromSubArray
      })

      if (isVisible) {
        const nodeIdObject = classesFromApi[nodeIdToCheck]

        nodeIdObject.label = getElementLabel({
          type: 'node',
          id: nodeIdToCheck
        })

        addNode({ node: nodeIdObject, addNumber })
        setNodeStyle({
          node: nodeIdObject,
          skipSpider: true
        })
      }
    }

    addEdge({
      edge,
      addNumber,
      toggleFromArrayInKey
    })
    setEdgeStyle({
      edge
    })
  }

  if (index === edgesNumber - 1) {
    actionAfterNodesAdded({
      setStoreState,
      addNumber,
      // nodesEdges,
    })
  }
}

export default addExpandedNode
