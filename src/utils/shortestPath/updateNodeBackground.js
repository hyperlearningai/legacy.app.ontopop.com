import updateNodes from '../nodesEdgesUtils/updateNodes'

/**
 * Update node background
 * @param  {Object}   params
 * @param  {Boolean}  params.background         HEX background color
 * @param  {String}   params.nodeId             Selected node id
 * @param  {Object}   params.originalNode       Original Node object
 * @param  {Boolean}  params.restore            Prev node object to restore
 * @return { undefined }
 */
const updateNodeBackground = ({
  background,
  nodeId,
  originalNode,
  restore
}) => {
  if (!nodeId || nodeId === '') return false

  const color = originalNode.color || {}

  if (!restore || !color.background) {
    color.background = background
  }

  updateNodes({
    id: nodeId,
    color
  })
}

export default updateNodeBackground
