import {
  NODE_BACKGROUND,
  EDGE_COLOR
} from '../constants/graph'

export default {
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
  updateGraphData: (state, graphId, value) => {
    const newGraphData = JSON.parse(JSON.stringify(state.graphData))

    newGraphData[graphId] = value

    return ({
      graphData: newGraphData
    })
  },
  removeFromObject: (state, stateKey, id) => {
    const newObject = JSON.parse(JSON.stringify(state[stateKey]))

    delete newObject[id]

    return ({
      [stateKey]: newObject
    })
  },
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
  addToArray: (state, stateKey, id) => {
    const newArray = state[stateKey].slice()

    if (!newArray.includes(id)) newArray.push(id)

    return ({
      [stateKey]: newArray
    })
  },
  setStoreState: (state, field, value) => ({
    [field]: value
  })
}
