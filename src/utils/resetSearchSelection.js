import { EDGE_COLOR, NODE_BACKGROUND } from '../constants/graph'

/**
 * Search free-text in elements' properties
 * @param  {Object}   params
 * @param  {Object}   params.availableEdges           Available edges on canvas (DataSet)
 * @param  {Object}   params.availableNodes           Available nodes on canvas DataSet
 * @param  {String}   params.prevSelectedEdges        Previously selected edges id
 * @param  {String}   params.prevSelectedNode         Previously selected node id
 * @param  {Function} params.setPrevSelectedEdges     update previously selected edges
 * @param  {Function} params.setPrevSelectedNode      update previously selected node
 * @return
 */
const resetSearchSelection = ({
  availableEdges,
  availableNodes,
  prevSelectedEdges,
  prevSelectedNode,
  setPrevSelectedEdges,
  setPrevSelectedNode,
}) => {
  // reset nodes
  if (prevSelectedNode !== '') {
    availableNodes.update(
      [{ id: prevSelectedNode, color: { background: NODE_BACKGROUND } }]
    )
  }

  setPrevSelectedNode('')

  // reset edges
  if (prevSelectedEdges && prevSelectedEdges.length > 0) {
    prevSelectedEdges.map((edge) => {
      availableEdges.update(
        [{ id: edge, color: EDGE_COLOR }]
      )
      return availableEdges.update(
        [{ id: edge, width: 1 }]
      )
    })
  }

  setPrevSelectedEdges([])
}

export default resetSearchSelection
