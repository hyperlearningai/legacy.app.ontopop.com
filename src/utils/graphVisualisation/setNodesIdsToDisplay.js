import { uniq } from 'lodash'
import {
  ALGO_TYPE_FULL,
  ALGO_TYPE_NEIGHBOURHOOD,
  ALGO_TYPE_SHORTEST_PATH,
  ALGO_TYPE_BOUNDING_BOX,
  ALGO_TYPE_NODES_FILTER,
  ALGO_TYPE_SEARCH_NEIGHBOURHOOD,
} from '../../constants/algorithms'
import getNodesFromPaths from '../shortestPath/getNodesFromPaths'
import getNeighbours from '../nodeNeighbourhood/getNeighbours'
import getNodesFromNodesFilters from '../nodesFilter/getNodesFromNodesFilters'
import getNodesEdgesFromEdgesFilters from '../edgesFilter/getNodesEdgesFromEdgesFilters'
import store from '../../store'
import showNotification from '../notifications/showNotification'
import {
  NOTIFY_WARNING
} from '../../constants/notifications'
import { OPERATION_TYPE_DELETE, OPERATION_TYPE_UPDATE } from '../../constants/store'

/**
 * Updates nodes and edges to display
 * @param  {Object}     params
 * @param  {Function}   params.updateStoreValue          updateStoreValue action
 * @param  {Function}   params.t                         i18n internationalisazion function
 * @return { undefined }
 */
const setNodesIdsToDisplay = async ({
  updateStoreValue,
  t
}) => {
  const {
    classesFromApi,
    nodesIdsToDisplay,
    deletedNodes,
    currentGraph,
    graphData
  } = store.getState()

  const {
    type,
    options,
    nodesIds
  } = graphData[currentGraph]

  if (type !== ALGO_TYPE_FULL && !options) return false

  let nodesToDisplay = [] //eslint-disable-line
  let highlightedNodesNew = []
  let highlightedEdgesNew = []
  let isNodeOverlayNew = false
  let shortestPathNodesNew = []
  let shortestPathResultsNew = []

  if (nodesIds && nodesIds.length > 0) {
    let highlightedNodesUpdate = []
    let highlightedEdgesUpdate = []
    let isNodeOverlayUpdate = false
    let shortestPathNodesUpdate = []
    let shortestPathResultsUpdate = []

    switch (type) {
      case ALGO_TYPE_SEARCH_NEIGHBOURHOOD:
        const {
          selectedNodesId,
          selectedEdgesId,
        } = options

        highlightedNodesUpdate = selectedNodesId
        highlightedEdgesUpdate = selectedEdgesId
        break

      case ALGO_TYPE_NEIGHBOURHOOD:
        const {
          selectedNodeId
        } = options
        highlightedNodesUpdate = [selectedNodeId]

        break

      case ALGO_TYPE_SHORTEST_PATH:
        const {
          shortestPathSelectedNodes,
          shortestPathResults,
          isNodeOverlay
        } = options

        highlightedNodesUpdate = shortestPathSelectedNodes
        isNodeOverlayUpdate = isNodeOverlay
        shortestPathResultsUpdate = shortestPathResults
        shortestPathNodesUpdate = shortestPathSelectedNodes
        break
      default:
        break
    }

    updateStoreValue(['highlightedNodes'], OPERATION_TYPE_UPDATE, highlightedNodesUpdate)
    updateStoreValue(['highlightedEdges'], OPERATION_TYPE_UPDATE, highlightedEdgesUpdate)
    updateStoreValue(['isNodeOverlay'], OPERATION_TYPE_UPDATE, isNodeOverlayUpdate)
    updateStoreValue(['shortestPathNodes'], OPERATION_TYPE_UPDATE, shortestPathNodesUpdate)
    updateStoreValue(['shortestPathResults'], OPERATION_TYPE_UPDATE, shortestPathResultsUpdate)
    updateStoreValue(['nodesIdsToDisplay'], OPERATION_TYPE_UPDATE, nodesIds)

    return true
  }

  switch (type) {
    case ALGO_TYPE_FULL:
      nodesToDisplay = Object.keys(classesFromApi).filter((nodeId) => !deletedNodes.includes(nodeId)) //eslint-disable-line
      break

    case ALGO_TYPE_BOUNDING_BOX:
      const {
        selectedBoundingBoxNodes,
      } = options

      nodesToDisplay = selectedBoundingBoxNodes.map((node) => node.id)
      break

    case ALGO_TYPE_SEARCH_NEIGHBOURHOOD:
      const {
        selectedNodesId,
        selectedEdgesId,
        separationDegree: searchSeparationDegree,
      } = options

      if (selectedNodesId.length > 0) {
        let allNeighbourNodes = []

        selectedNodesId.map((selectedNodeId) => {
          const neighbourNodes = getNeighbours({
            selectedNodeId,
            separationDegree: searchSeparationDegree,
          })

          if (neighbourNodes.length > 0) {
            allNeighbourNodes = [
              ...allNeighbourNodes,
              ...neighbourNodes
            ]
          }

          return true
        })

        nodesToDisplay = uniq(allNeighbourNodes)

        highlightedNodesNew = selectedNodesId
      }

      if (selectedEdgesId.length > 0) {
        highlightedEdgesNew = selectedEdgesId
      }

      break

    case ALGO_TYPE_NEIGHBOURHOOD:
      const {
        selectedNodeId,
        separationDegree,
      } = options

      nodesToDisplay = getNeighbours({
        selectedNodeId,
        separationDegree,
      })

      highlightedNodesNew = [selectedNodeId]

      break

    case ALGO_TYPE_SHORTEST_PATH:
      const {
        shortestPathSelectedNodes,
        shortestPathResults,
        isNodeOverlay
      } = options

      shortestPathResultsNew = shortestPathResults

      const shortestPathNodes = await getNodesFromPaths({
        shortestPathResults
      })

      isNodeOverlayNew = isNodeOverlay
      highlightedNodesNew = shortestPathSelectedNodes

      if (!isNodeOverlay) {
        nodesToDisplay = shortestPathNodes
      } else {
        // duplicated array to trigger new graph
        shortestPathNodesNew = shortestPathNodes
        nodesToDisplay = nodesIdsToDisplay.slice()
      }
      break

    case ALGO_TYPE_NODES_FILTER:
      const {
        nodesFilters
      } = options

      const filteredNodes = await getNodesFromNodesFilters({ nodesFilters })
      if (filteredNodes.length === 0) break

      nodesToDisplay = filteredNodes.filter((nodeId) => !deletedNodes.includes(nodeId))
      break

    default:
      const {
        edgesFilters
      } = options

      const nodesFiltered = await getNodesEdgesFromEdgesFilters({ edgesFilters })

      if (nodesFiltered.length === 0) break
      nodesToDisplay = nodesFiltered.filter((nodeId) => !deletedNodes.includes(nodeId))

      break
  }

  if (!nodesToDisplay || nodesToDisplay.length === 0) {
    updateStoreValue(['currentGraph'], OPERATION_TYPE_UPDATE, 'graph-0')

    if (currentGraph !== 'graph-0') {
      updateStoreValue(['graphData', currentGraph], OPERATION_TYPE_DELETE)

      return showNotification({
        message: t('noNodesToDisplay'),
        type: NOTIFY_WARNING
      })
    }
  }

  updateStoreValue(['graphData', currentGraph, 'nodesIds'], OPERATION_TYPE_UPDATE, nodesToDisplay)
  updateStoreValue(['highlightedNodes'], OPERATION_TYPE_UPDATE, highlightedNodesNew)
  updateStoreValue(['highlightedEdges'], OPERATION_TYPE_UPDATE, highlightedEdgesNew)
  updateStoreValue(['isNodeOverlay'], OPERATION_TYPE_UPDATE, isNodeOverlayNew)
  updateStoreValue(['shortestPathNodes'], OPERATION_TYPE_UPDATE, shortestPathNodesNew)
  updateStoreValue(['shortestPathResults'], OPERATION_TYPE_UPDATE, shortestPathResultsNew)
  updateStoreValue(['nodesIdsToDisplay'], OPERATION_TYPE_UPDATE, nodesToDisplay)

  return true
}

export default setNodesIdsToDisplay
