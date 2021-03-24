import store from '../../store'
import clearNodes from '../nodesEdgesUtils/clearNodes'
import clearEdges from '../nodesEdgesUtils/clearEdges'
import { OPERATION_TYPE_ADD, OPERATION_TYPE_UPDATE } from '../../constants/store'
import checkNodeVisibility from '../networkGraphOptions/checkNodeVisibility'
import checkEdgeVisibility from '../networkGraphOptions/checkEdgeVisibility'
import getElementLabel from '../networkStyling/getElementLabel'
import addNode from '../nodesEdgesUtils/addNode'
import setNodeStyle from '../networkStyling/setNodeStyle'
import addEdgeToGraph from './addEdgeToGraph'
import actionAfterNodesAdded from './actionAfterNodesAdded'

/**
 * Update store and graph based on node IDs to display
 * @param  {Object}   params
 * @param  {Function} params.updateStoreValue                   updateStoreValue action
 * @return { undefined }
 */
const queueGraphElements = ({
  updateStoreValue
}) => {
  const {
    classesFromApi,
    nodesIdsToDisplay,
    objectPropertiesFromApi,
    totalEdgesPerNode,
    isPhysicsOn,
    currentGraph
  } = store.getState()

  if (!nodesIdsToDisplay || nodesIdsToDisplay.length === 0) return false

  // reset nodes/edges (display at the end of the function)
  clearEdges()
  clearNodes()
  updateStoreValue(['availableNodesCount'], OPERATION_TYPE_UPDATE, 0)
  updateStoreValue(['availableEdgesCount'], OPERATION_TYPE_UPDATE, 0)
  updateStoreValue(['graphData', currentGraph, 'nodesIdsToDisplay'], OPERATION_TYPE_UPDATE, nodesIdsToDisplay)

  const currentPhysicsOnState = isPhysicsOn

  // turn physics off to speed up loading time when restoring large graphsa
  if (currentPhysicsOnState) {
    updateStoreValue(['isPhysicsOn'], OPERATION_TYPE_UPDATE, false)
  }

  updateStoreValue(['activeLoaders'], OPERATION_TYPE_ADD, 1)

  const visibleNodes = nodesIdsToDisplay.filter((nodeId) => checkNodeVisibility({
    nodeId
  }))

  const edgeIdsToDisplay = Object.keys(objectPropertiesFromApi).filter((edgeId) => {
    const { from, to } = objectPropertiesFromApi[edgeId]

    return visibleNodes.includes(from) && visibleNodes.includes(to)
  })

  const visibleEdges = edgeIdsToDisplay.filter((nodeId) => checkEdgeVisibility({
    nodeId
  }))

  visibleNodes.forEach((nodeId, index) => {
    const nodeEdges = totalEdgesPerNode[nodeId]

    let isNotSpiderable = true

    if (nodeEdges) {
      isNotSpiderable = nodeEdges.every((edgeId) => visibleEdges.includes(edgeId))
    }

    updateStoreValue(['nodesSpiderability', nodeId], OPERATION_TYPE_UPDATE, isNotSpiderable ? 'false' : 'true')

    // add node
    const nodeIdObject = classesFromApi[nodeId]

    nodeIdObject.label = getElementLabel({
      type: 'node',
      id: nodeId
    })
    nodeIdObject.title = nodeIdObject.label

    addNode({
      node: nodeIdObject,
      updateStoreValue,
    })

    setNodeStyle({ node: nodeIdObject })

    if (index === visibleNodes.length - 1) {
      const useTimeout = visibleEdges.length > 100

      if (visibleEdges.length === 0) {
        return actionAfterNodesAdded({
          updateStoreValue
        })
      }

      for (let edgeIindex = 0; edgeIindex < visibleEdges.length; edgeIindex++) {
        const edgeId = visibleEdges[edgeIindex]
        const isLast = edgeIindex === visibleEdges.length - 1

        if (useTimeout) {
          setTimeout(() => addEdgeToGraph({
            updateStoreValue,
            edgeId,
            isLast
          }), 1)
        } else {
          addEdgeToGraph({
            updateStoreValue,
            edgeId,
            isLast
          })
        }
      }
    }
  })
}

export default queueGraphElements
