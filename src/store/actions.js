export default {
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
