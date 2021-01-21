import {
  HIGHLIGHT_NODE_BACKGROUND,
  EDGE_COLOR_SELECTED
} from '../constants/graph'
import store from '../store'

/**
 * Update VisJs network methods
 * @param  {Object}   params
 * @param  {Function} params.setStoreState             setStoreState action
 * @param  {Function} params.addToArray                addToArray action
 * @param  {Object}   params.network                   VisJs network object
 * @return
 */
const setNetworkMethods = async ({
  setStoreState,
  network,
  addToArray,
  nodesIdsToDisplay
}) => {
  network?.on('selectNode', (event) => {
    const {
      isNodeSelectable,
      isNeighbourNodeSelectable,
      availableNodes
    } = store.getState()

    if (event.nodes?.length === 1) {
      const nodeId = event.nodes[0]

      if (isNodeSelectable) {
        addToArray('selectedNodes', nodeId)
        availableNodes.update([{ id: nodeId, color: { background: HIGHLIGHT_NODE_BACKGROUND } }])
      }

      if (isNeighbourNodeSelectable) {
        setStoreState('selectedNeighbourNode', nodeId)
      }
    }
  })

  network?.on('selectEdge', (event) => {
    const {
      isEdgeSelectable,
      availableEdges
    } = store.getState()

    if (event.edges?.length === 1) {
      const edgeId = event.edges[0]

      if (isEdgeSelectable) {
        addToArray('selectedEdges', edgeId)
        availableEdges.update([{ id: edgeId, color: EDGE_COLOR_SELECTED }])
      }
    }
  })

  network?.on('stabilizationProgress', (params) => {
    if (nodesIdsToDisplay) {
      const percentage = parseFloat(params.iterations / params.total).toFixed(2)

      setStoreState('networkLoadingProgress', percentage * 100)
    }
  })

  network?.once('stabilizationIterationsDone', () => {
    setStoreState('networkLoadingProgress', 0)
    setStoreState('isNetworkLoading', false)
  })

  await network?.stabilize(2000)

  network?.fit({
    animation: true
  })
}

export default setNetworkMethods
