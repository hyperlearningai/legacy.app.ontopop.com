export default {
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
