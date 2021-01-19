import {
  NODE_BACKGROUND,
  EDGE_COLOR
} from '../constants/graph'

export default {
  /**
   * Reset selected edges and edge selectability
   * @param  {Object} state  Store state
   * @return
   */
  resetSelectedEdges: (state) => {
    const newSelectedEdges = state.selectedEdges.slice()

    newSelectedEdges.map((id) => state.availableEdges.update(
      [{ id, color: { background: EDGE_COLOR } }]
    ))

    newSelectedEdges.length = 0

    return ({
      selectedEdges: newSelectedEdges,
      isEdgeSelectable: false
    })
  },
  /**
   * Reset selected nodes and nodes selectability
   * @param  {Object} state  Store state
   * @return
   */
  resetSelectedNodes: (state) => {
    const newSelectedNodes = state.selectedNodes.slice()

    newSelectedNodes.map((id) => state.availableNodes.update(
      [{ id, color: { background: NODE_BACKGROUND } }]
    ))

    newSelectedNodes.length = 0

    return ({
      selectedNodes: newSelectedNodes,
      isNodeSelectable: false
    })
  },
  /**
   * Update cached graph data
   * @param  {Object} state     Store state
   * @param  {String} graphId   Graph ID
   * @param  {Object} value     Graph ID udpated data object
   * @return
   */
  updateGraphData: (state, graphId, value) => {
    const newGraphData = JSON.parse(JSON.stringify(state.graphData))

    newGraphData[graphId] = value

    return ({
      graphData: newGraphData
    })
  },
  /**
   * Remove key from object
   * @param  {Object} state     Store state
   * @param  {String} stateKey  State key to update
   * @param  {String} id        key to remove from object
   * @return
   */
  removeFromObject: (state, stateKey, id) => {
    const newObject = JSON.parse(JSON.stringify(state[stateKey]))

    delete newObject[id]

    return ({
      [stateKey]: newObject
    })
  },
  /**
   * Remove ID from array
   * @param  {Object} state     Store state
   * @param  {String} stateKey  State key to update
   * @param  {String} id        ID to remove from array
   * @return
   */
  removeFromArray: (state, stateKey, id) => {
    const newArray = state[stateKey].slice()

    if (stateKey === 'selectedNodes') {
      state.availableNodes.update(
        [{ id, color: { background: NODE_BACKGROUND } }]
      )
    }

    if (stateKey === 'selectedEdges') {
      state.availableEdges.update(
        [{ id, color: { background: EDGE_COLOR } }]
      )
    }

    newArray.splice(newArray.indexOf(id), 1)

    return ({
      [stateKey]: newArray
    })
  },
  /**
   * Add ID to array
   * @param  {Object} state     Store state
   * @param  {String} stateKey  State key to update
   * @param  {String} id        ID to add to array
   * @return
   */
  addToArray: (state, stateKey, id) => {
    const newArray = state[stateKey].slice()

    if (!newArray.includes(id)) newArray.push(id)

    return ({
      [stateKey]: newArray
    })
  },
  /**
   * Generic method to update any store key with any value
   * @param  {Object} state     Store state
   * @param  {String} field     State key to update
   * @param  {*}      value     ID to add to array
   * @return
   */
  setStoreState: (state, field, value) => ({
    [field]: value
  })
}
