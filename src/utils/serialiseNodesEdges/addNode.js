import { SELECTED_NODE_COLOR } from '../../constants/graph'

const addNode = ({
  availableNodesNormalised,
  availableNodesList,
  addedNodes,
  nodeId,
  nodeIdObject,
  highlightedNodes
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
    }

    availableNodesNormalised[nodeId] = extendedNodeObject  // eslint-disable-line
    availableNodesList.push(extendedNodeObject)
    addedNodes.push(nodeId)
  }
}

export default addNode
