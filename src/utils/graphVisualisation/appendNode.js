import addNode from '../nodesEdgesUtils/addNode'
import getNode from '../nodesEdgesUtils/getNode'

/**
 * Add node to arrays/objects
 * @param  {Object}   params
 * @param  {Array}    params.addedNodes               Array of nodes IDs being added
 * @param  {String}   params.nodeId                   Node ID
 * @param  {Object}   params.nodeIdObject             Node ID object
 * @return { undefined }
 */
const appendNode = ({
  addedNodes,
  nodeId,
  nodeIdObject,
}) => {
  if (!addedNodes.includes(nodeId)
    && getNode(nodeId) === null
    && nodeIdObject.label
    && nodeIdObject.label !== ''
  ) {
    addNode(JSON.parse(JSON.stringify({
      ...nodeIdObject,
      x: Math.floor((Math.random() * 100) + 1),
      y: Math.floor((Math.random() * 100) + 1),
    })))
    addedNodes.push(nodeId)
  }
}

export default appendNode
