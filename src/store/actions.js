import {
  NODE_BACKGROUND,
  EDGE_COLOR
} from '../constants/graph'

export default {
  /**
   * Reset selected edges and edge selectability
   * @param  {Object} state  Store state
   * @return {undefined}
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
   * @return {undefined}
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
   * Add subkey to object
   * @param  {Object} state     Store state
   * @param  {String} stateKey  State key to update
   * @param  {String} key       key to add/update
   * @param  {String} subkey    subkey to add/update
   * @param  {*}      value     new subkey value
   * @return {undefined}
   */
  addSubValueToObject: (state, stateKey, key, subkey, value) => ({
    [stateKey]: {
      ...state[stateKey],
      [key]: {
        ...state[stateKey][key],
        [subkey]: value
      }
    }
  }),
  /**
   * Add key from object
   * @param  {Object} state     Store state
   * @param  {String} stateKey  State key to update
   * @param  {String} key       key to add/update
   * @param  {*}      value     new key value
   * @return {undefined}
   */
  addToObject: (state, stateKey, key, value) => ({
    [stateKey]: {
      ...state[stateKey],
      [key]: value
    }
  }),
  /**
   * Remove key from object
   * @param  {Object} state     Store state
   * @param  {String} stateKey  State key to update
   * @param  {String} id        key to remove from object
   * @return {undefined}
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
   * @return {undefined}
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
   * @param  {String} value     Value to add to array
   * @param  {Object} [options] Additional options
   * @return {undefined}
   */
  addToArray: (state, stateKey, value, options) => {
    if ((!options || !options.alwaysAdd) && state[stateKey].includes(value)) {
      return ({
        [stateKey]: state[stateKey]
      })
    }

    if (Array.isArray(value)) {
      return ({
        [stateKey]: [
          ...state[stateKey],
          ...value
        ]
      })
    }

    return ({
      [stateKey]: [
        ...state[stateKey],
        value
      ]
    })
  },
  /**
   * Generic method to update any store key with any value
   * @param  {Object} state     Store state
   * @param  {String} field     State key to update
   * @param  {*}      value     ID to add to array
   * @return {undefined}
   */
  setStoreState: (state, field, value) => ({
    [field]: value
  })
}
