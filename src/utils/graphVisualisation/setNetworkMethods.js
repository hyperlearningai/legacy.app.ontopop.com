import {
  SPIDERABLE_NODE_BORDER_COLOR,
} from '../../constants/graph'
import store from '../../store'
import expandNode from './expandNode'
import getNode from '../nodesEdgesUtils/getNode'
import setShortestPathNode from '../shortestPath/setShortestPathNode'
import { OPERATION_TYPE_UPDATE } from '../../constants/store'
import updateHighlightedElement from '../networkStyling/updateHighlightedElement'

/**
 * Update VisJs network methods
 * @param  {Object}   params
 * @param  {Function} params.updateStoreValue                 updateStoreValue action
 * @param  {Object}   params.network                          VisJs network object
 * @return { undefined }
 */
const setNetworkMethods = async ({
  network,
  updateStoreValue
}) => {
  network?.on('selectNode', (event) => {
    const {
      isElementSelectable,
      isShortestPathNode1Selectable,
      isShortestPathNode2Selectable,
    } = store.getState()

    if (event.nodes?.length === 1) {
      const nodeId = event.nodes[0]

      if (isElementSelectable) {
        return updateHighlightedElement({
          updateStoreValue,
          id: nodeId,
          type: 'node'
        })
      }

      if (isShortestPathNode1Selectable) {
        return setShortestPathNode({
          updateStoreValue,
          state: 'shortestPathNode1',
          nodeId
        })
      }

      if (isShortestPathNode2Selectable) {
        return setShortestPathNode({
          updateStoreValue,
          state: 'shortestPathNode2',
          nodeId
        })
      }
    }
  })

  network?.on('click', () => updateStoreValue(['showContextMenu'], OPERATION_TYPE_UPDATE, false))

  network?.on('doubleClick', (event) => {
    if (event.nodes?.length === 1) {
      const nodeId = event.nodes[0]

      const { color } = getNode(nodeId)

      if (color?.border === SPIDERABLE_NODE_BORDER_COLOR) {
        expandNode({
          nodeId,
          updateStoreValue,
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

    updateStoreValue(['contextMenuData'], OPERATION_TYPE_UPDATE, {
      nodeId: event.nodes?.length ? event.nodes[0] : undefined,
      edgeId: event.edges?.length ? event.edges[0] : undefined,
      top: offsetY,
      left: offsetX
    })
    updateStoreValue(['showContextMenu'], OPERATION_TYPE_UPDATE, true)
  })

  network?.on('selectEdge', (event) => {
    const {
      isElementSelectable
    } = store.getState()

    if (event.edges?.length === 1 && event.nodes?.length === 0) {
      const edgeId = event.edges[0]

      if (isElementSelectable) {
        return updateHighlightedElement({
          updateStoreValue,
          id: edgeId,
          type: 'edge'
        })
      }
    }
  })

  await network?.stabilize(2000)

  network?.fit({
    animation: true
  })
}

export default setNetworkMethods
