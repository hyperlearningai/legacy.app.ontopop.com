import {
  HIGHLIGHT_NODE_BACKGROUND,
  EDGE_COLOR_SELECTED,
  SPIDERABLE_NODE_BORDER_COLOR,
} from '../constants/graph'
import store from '../store'
import addNodesEdgesToGraph from './addNodesEdgesToGraph'

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
  addToArray,
  network,
}) => {
  network?.on('selectNode', (event) => {
    const {
      availableNodes,
      isNodeSelectable,
      isNeighbourNodeSelectable,
      isShortestPathNodeSelectable,
      shortestPathSelectedNodes
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

      if (isShortestPathNodeSelectable && shortestPathSelectedNodes.length < 2) {
        addToArray('shortestPathSelectedNodes', nodeId)
      }
    }
  })

  network?.on('click', () => {
    setStoreState('showContextMenu', false)
  })

  network?.on('doubleClick', (event) => {
    const {
      availableNodes,
    } = store.getState()

    if (event.nodes?.length === 1) {
      const nodeId = event.nodes[0]

      const { color } = availableNodes.get(nodeId)

      if (color?.border === SPIDERABLE_NODE_BORDER_COLOR) {
        addNodesEdgesToGraph({
          nodeId,
          setStoreState
        })
      }
    }
  })

  network?.on('oncontext', (event) => {
    event.event.preventDefault()

    if (event.nodes?.length === 1) {
      const nodeId = event.nodes[0]
      const {
        layerX,
        layerY,
      } = event.event

      setStoreState('contextMenuData', {
        nodeId,
        top: layerY,
        left: layerX
      })
      setStoreState('showContextMenu', true)
    } else {
      setStoreState('showContextMenu', false)
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
    const {
      nodesIdsToDisplay,
    } = store.getState()

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
