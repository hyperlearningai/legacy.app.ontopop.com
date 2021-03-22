import store from '../../store'
import addNode from '../nodesEdgesUtils/addNode'
import removeNode from '../nodesEdgesUtils/removeNode'
import checkNodeVisibility from './checkNodeVisibility'
import getNodeIds from '../nodesEdgesUtils/getNodeIds'
import setNodesStyle from '../networkStyling/setNodesStyle'
import toggleEdgesFromVisibleNodes from './toggleEdgesFromVisibleNodes'

/**
 * Check edge visibility
 * @param  {Object}    params
 * @param  {Function}  params.toggleFromSubArray    toggleFromSubArray action
 * @param  {Function}  params.addNumber             addNumber action
 * @param  {Function}  params.setStoreState         setStoreState action
 * @param  {Function}  params.toggleFromArrayInKey  toggleFromArrayInKey action
 * @return {undefined}
 */
const toggleElements = ({
  toggleFromSubArray,
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
    hiddenNodes,
  } = graphData[currentGraph]

  const visibleNodes = getNodeIds()

  const nodesToCheck = [
    ...visibleNodes,
    ...hiddenNodes
  ]

  const newVisibleNodes = []

  if (nodesToCheck.length === 0) return false

  addNumber('activeLoaders', 1)

  for (let index = 0; index < nodesToCheck.length; index++) {
    const nodeId = nodesToCheck[index]
    const node = classesFromApiBackup[nodeId]

    const isVisible = checkNodeVisibility({
      nodeId,
      toggleFromSubArray
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

      if (index === nodesToCheck.length - 1) {
        addNumber('activeLoaders', -1)

        setNodesStyle()

        toggleEdgesFromVisibleNodes({
          visibleNodes: newVisibleNodes,
          toggleFromArrayInKey,
          setStoreState,
          addNumber,
          toggleFromSubArray
        })
      }
    }, 1)
  }
}

export default toggleElements
