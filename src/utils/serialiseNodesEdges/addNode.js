import { SELECTED_NODE_COLOR } from '../../constants/graph'

/**
 * Add node to arrays/objects
 * @param  {Object}   params
 * @param  {Array}    params.addedNodes               Array of nodes IDs being added
 * @param  {Array}    params.availableNodesList       Array of available nodes
 * @param  {Object}   params.availableNodesNormalised Normalised list of available nodes
 * @param  {Array}    params.highlightedNodes         Array of nodes IDs to highlight
 * @param  {Boolean}  params.isNodeOverlay            Flag to make non-highlighted nodes transparent
 * @param  {String}   params.nodeId                   Node ID
 * @param  {Object}   params.nodeIdObject             Node ID object
 * @param  {Array}    params.shortestPathNodes        Array of nodes IDs in shortest path
 * @return
 */
const addNode = ({
  addedNodes,
  availableNodesList,
  availableNodesNormalised,
  isNodeOverlay,
  highlightedNodes,
  nodeId,
  nodeIdObject,
  shortestPathNodes,
}) => {
  if (!addedNodes.includes(nodeId)
  && nodeIdObject.label
  && nodeIdObject.label !== ''
  ) {
    const extendedNodeObject = JSON.parse(JSON.stringify(nodeIdObject))

    if (highlightedNodes.includes(nodeId)) {
      extendedNodeObject.color = {
        background: SELECTED_NODE_COLOR
      }
    } else if (isNodeOverlay && !shortestPathNodes.includes(nodeId)) {
      extendedNodeObject.opacity = 0.1
    }

    availableNodesNormalised[nodeId] = extendedNodeObject  // eslint-disable-line
    availableNodesList.push(extendedNodeObject)
    addedNodes.push(nodeId)
  }
}

export default addNode
