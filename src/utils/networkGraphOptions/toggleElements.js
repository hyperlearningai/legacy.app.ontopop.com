import store from '../../store'
import addNode from '../nodesEdgesUtils/addNode'
import removeNode from '../nodesEdgesUtils/removeNode'
import checkNodeVisibility from './checkNodeVisibility'
import setNodesStyle from '../networkStyling/setNodesStyle'
import toggleEdgesFromVisibleNodes from './toggleEdgesFromVisibleNodes'
import { OPERATION_TYPE_ADD } from '../../constants/store'

/**
 * Check edge visibility
 * @param  {Object}    params
 * @param  {Function}  params.updateStoreValue         updateStoreValue action
 * @return {undefined}
 */
const toggleElements = ({
  updateStoreValue
}) => {
  const {
    currentGraph,
    graphData,
    classesFromApiBackup,
  } = store.getState()

  const {
    nodesIdsToDisplay
  } = graphData[currentGraph]

  const newVisibleNodes = []

  if (nodesIdsToDisplay.length === 0) return false

  updateStoreValue(['activeLoaders'], OPERATION_TYPE_ADD, 1)

  for (let index = 0; index < nodesIdsToDisplay.length; index++) {
    const nodeId = nodesIdsToDisplay[index]
    const node = classesFromApiBackup[nodeId]

    const isVisible = checkNodeVisibility({
      nodeId,
    })

    setTimeout(() => {
      if (isVisible) {
        newVisibleNodes.push(nodeId)

        addNode({
          node,
          updateStoreValue
        })
      } else {
        removeNode({
          nodeId,
          updateStoreValue,
        })
      }

      if (index === nodesIdsToDisplay.length - 1) {
        updateStoreValue(['activeLoaders'], OPERATION_TYPE_ADD, -1)

        setNodesStyle()

        toggleEdgesFromVisibleNodes({
          visibleNodes: newVisibleNodes,
          updateStoreValue
        })
      }
    }, 1)
  }
}

export default toggleElements
