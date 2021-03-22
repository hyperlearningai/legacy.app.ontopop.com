import store from '../../store'
import addNode from '../nodesEdgesUtils/addNode'
import removeNode from '../nodesEdgesUtils/removeNode'
import checkNodeVisibility from './checkNodeVisibility'
import setNodesStyle from '../networkStyling/setNodesStyle'
import toggleEdgesFromVisibleNodes from './toggleEdgesFromVisibleNodes'

/**
 * Check edge visibility
 * @param  {Object}    params
 * @param  {Function}  params.addNumber             addNumber action
 * @param  {Function}  params.setStoreState         setStoreState action
 * @param  {Function}  params.toggleFromArrayInKey  toggleFromArrayInKey action
 * @return {undefined}
 */
const toggleElements = ({
  addNumber,
  toggleFromArrayInKey,
  setStoreState
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

  addNumber('activeLoaders', 1)

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
          addNumber
        })
      } else {
        removeNode({
          nodeId,
          addNumber,
          toggleFromArrayInKey
        })
      }

      if (index === nodesIdsToDisplay.length - 1) {
        addNumber('activeLoaders', -1)

        setNodesStyle()

        toggleEdgesFromVisibleNodes({
          visibleNodes: newVisibleNodes,
          toggleFromArrayInKey,
          setStoreState,
          addNumber
        })
      }
    }, 1)
  }
}

export default toggleElements
