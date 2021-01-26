import {
  HIGHLIGHT_NODE_BACKGROUND,
  EDGE_COLOR_SELECTED,
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
    if (event.nodes?.length === 1) {
      const nodeId = event.nodes[0]
      addNodesEdgesToGraph({
        nodeId,
        setStoreState
      })
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

  // network?.on('afterDrawing', (ctx) => {
  //   // const rect = {},
  //   // const drag = false;

  //   const nodeId = 1
  //   const nodePosition = network.getPositions([nodeId])
  //   ctx.strokeStyle = '#294475'
  //   ctx.lineWidth = 4
  //   ctx.fillStyle = '#A6D5F7'

  //   ctx.beginPath()
  //   ctx.arc(
  //     nodePosition[nodeId].x,
  //     nodePosition[nodeId].y,
  //     20,
  //     0,
  //     2 * Math.PI,
  //     false
  //   )
  //   ctx.closePath()

  //   ctx.fill()
  //   ctx.stroke()
  // })

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
