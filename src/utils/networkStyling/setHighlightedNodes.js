import store from '../../store'
import getNode from '../nodesEdgesUtils/getNode'
import updateNodes from '../nodesEdgesUtils/updateNodes'
import getStylingProperty from './getStylingProperty'

/**
 * Set node background as highlighted
 * @return { undefined }
 */
const setHighlightedNodes = () => {
  const {
    highlightedNodes,
  } = store.getState()

  if (highlightedNodes.length === 0) return false

  const highlightedNodesObjects = getNode({
    filter: (node) => highlightedNodes.includes(node.id)
  })

  if (highlightedNodesObjects.length === 0) return false

  const highlightedNodesObjectsLength = highlightedNodesObjects.length - 1

  for (let index = highlightedNodesObjectsLength; index >= 0; index--) {
    const node = highlightedNodesObjects[highlightedNodesObjectsLength - index]

    const color = node.color || {}

    color.background = getStylingProperty({
      type: 'node',
      property: 'stylingNodeHighlightBackgroundColor',
      element: node
    })

    updateNodes({
      id: node.id,
      color
    })
  }
}

export default setHighlightedNodes
