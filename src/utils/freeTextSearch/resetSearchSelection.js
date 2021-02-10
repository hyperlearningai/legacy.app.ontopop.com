import { EDGE_COLOR, NODE_BACKGROUND } from '../../constants/graph'
import updateEdges from '../nodesEdgesUtils/updateEdges'
import updateNodes from '../nodesEdgesUtils/updateNodes'

/**
 * Search free-text in elements' properties
 * @param  {Object}   params
 * @param  {String}   params.prevSelectedEdges        Previously selected edges id
 * @param  {String}   params.prevSelectedNode         Previously selected node id
 * @param  {Function} params.setPrevSelectedEdges     update previously selected edges
 * @param  {Function} params.setPrevSelectedNode      update previously selected node
 * @return { undefined }
 */
const resetSearchSelection = ({
  prevSelectedEdges,
  prevSelectedNode,
  setPrevSelectedEdges,
  setPrevSelectedNode,
}) => {
  // reset nodes
  if (prevSelectedNode !== '') {
    updateNodes(
      [{ id: prevSelectedNode, color: { background: NODE_BACKGROUND } }]
    )
  }

  setPrevSelectedNode('')

  // reset edges
  if (prevSelectedEdges && prevSelectedEdges.length > 0) {
    prevSelectedEdges.map((edge) => updateEdges(
      [{ id: edge, color: EDGE_COLOR, width: 1 }]
    ))
  }

  setPrevSelectedEdges([])
}

export default resetSearchSelection
