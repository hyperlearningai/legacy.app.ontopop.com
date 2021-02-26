import {
  SPIDERABLE_NODE_BORDER_COLOR,
} from '../../constants/graph'
import store from '../../store'
import expandNode from './expandNode'
import getNode from '../nodesEdgesUtils/getNode'
import setShortestPathNode from '../shortestPath/setShortestPathNode'

/**
 * Update VisJs network methods
 * @param  {Object}   params
 * @param  {Function} params.setStoreState             setStoreState action
 * @param  {Object}   params.network                   VisJs network object
 * @return { undefined }
 */
const setNetworkMethods = async ({
  setStoreState,
  network,
}) => {
  network?.on('selectNode', (event) => {
    const {
      isNodeSelectable,
      isNeighbourNodeSelectable,
      isShortestPathNode1Selectable,
      isShortestPathNode2Selectable,
    } = store.getState()

    if (event.nodes?.length === 1) {
      const nodeId = event.nodes[0]

      if (isNodeSelectable) {
        return setStoreState('selectedNode', nodeId)
      }

      if (isNeighbourNodeSelectable) {
        return setStoreState('selectedNeighbourNode', nodeId)
      }

      if (isShortestPathNode1Selectable) {
        return setShortestPathNode({
          setStoreState,
          state: 'shortestPathNode1',
          nodeId
        })
      }

      if (isShortestPathNode2Selectable) {
        return setShortestPathNode({
          setStoreState,
          state: 'shortestPathNode2',
          nodeId
        })
      }
    }
  })

  network?.on('click', () => setStoreState('showContextMenu', false))

  network?.on('doubleClick', (event) => {
    if (event.nodes?.length === 1) {
      const nodeId = event.nodes[0]

      const { color } = getNode(nodeId)

      if (color?.border === SPIDERABLE_NODE_BORDER_COLOR) {
        expandNode({
          nodeId,
          setStoreState
        })
      }
    }
  })

  network?.on('oncontext', (event) => {
    event.event.preventDefault()

    const {
      offsetX,
      offsetY,
    } = event.event

    setStoreState('contextMenuData', {
      nodeId: event.nodes?.length ? event.nodes[0] : undefined,
      top: offsetY,
      left: offsetX
    })
    setStoreState('showContextMenu', true)
  })

  network?.on('selectEdge', (event) => {
    const {
      isEdgeSelectable,
    } = store.getState()

    if (event.edges?.length === 1) {
      const edgeId = event.edges[0]

      if (isEdgeSelectable) {
        return setStoreState('selectedEdge', edgeId)
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
