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

/**
 * Updates nodes and edges to display
 * @param  {Object}     params
 * @param  {Function}   params.setStoreState             setStoreState action
 * @param  {Function}   params.removeFromObject          removeFromObject action
 * @param  {Function}   params.t                         i18n internationalisazion function
 * @return { undefined }
 */
const setNodesIdsToDisplay = async ({
  setStoreState,
  removeFromObject,
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
    options
  } = graphData[currentGraph]

  if (type !== ALGO_TYPE_FULL && !options) return false

  let nodesToDisplay = [] //eslint-disable-line
  let highlightedNodesNew = []
  let highlightedEdgesNew = []
  let isNodeOverlayNew = false
  let shortestPathNodesNew = []
  let shortestPathResultsNew = []

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
    setStoreState('currentGraph', 'graph-0')
    removeFromObject('graphData', currentGraph)

    return showNotification({
      message: t('noNodesToDisplay'),
      type: NOTIFY_WARNING
    })
  }

  setStoreState('highlightedNodes', highlightedNodesNew)
  setStoreState('highlightedEdges', highlightedEdgesNew)
  setStoreState('isNodeOverlay', isNodeOverlayNew)
  setStoreState('shortestPathNodes', shortestPathNodesNew)
  setStoreState('shortestPathResults', shortestPathResultsNew)
  setStoreState('nodesIdsToDisplay', nodesToDisplay)

  return true
}

export default setNodesIdsToDisplay
