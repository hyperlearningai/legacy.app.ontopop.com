export default {
  /**
   * Add value to subkey object
   * @param  {Object} state     Store state
   * @param  {Array}  keys       Object keys in nested order
   * @param  {*}      value     new subkey value
   * @return {undefined}
   */
  addValueToSubkeyObject: (state, keys, value) => {
    const newObject = JSON.parse(JSON.stringify(state))

    if (keys.length < 2) {
      const key = keys[0]

      return {
        [key]: value
      }
    }

    const subValues = [newObject]

    keys.map((key, index) => {
      if (index > keys.length - 2) return false

      if (index > keys.length - 3) {
        const nextKey = keys[index + 1]

        subValues[index][key] = {
          ...subValues[index][key],
          [nextKey]: value
        }

        return subValues.push(subValues[index][key])
      }

      return subValues.push(subValues[index][key])
    })

    return newObject
  },
  /**
   * Add number to key
   * @param  {Object} state     Store state
   * @param  {Array} keys       Object keys in nested order
   * @param  {*} value          new subkey value
   * @return {undefined}
   */
  addOrAppendToObject: (state, keys, value) => {
    const newObject = JSON.parse(JSON.stringify(state))

    if (keys.length < 2) {
      const key = keys[0]

      return {
        [key]: state[key] + value
      }
    }

    const subValues = [newObject]

    keys.map((key, index) => {
      if (index > keys.length - 2) return false

      if (index > keys.length - 3) {
        const nextKey = keys[index + 1]

        subValues[index][key] = {
          ...subValues[index][key],
          [nextKey]: subValues[index][key][nextKey] + value
        }

        return subValues.push(subValues[index][key])
      }

      return subValues.push(subValues[index][key])
    })

    return newObject
  },

  /**
   * Add number to key
   * @param  {Object} state     Store state
   * @param  {String} stateKey  State key to update
   * @param  {Number} value     new subkey value
   * @return {undefined}
   */
  addNumber: (state, stateKey, value) => ({
    [stateKey]: state[stateKey] + value
  }),
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

    newArray.splice(newArray.indexOf(id), 1)

    return ({
      [stateKey]: newArray
    })
  },
  /**
   * Toggle item from subarray
   * @param  {Object} state     Store state
   * @param  {String} stateKey  State key to update
   * @param  {String} key       key to add/update
   * @param  {String} subkey    subkey to add/update
   * @param  {String} value     Value to add to array
   * @return {undefined}
   */
  toggleFromSubArray: (state, stateKey, key, subkey, value) => {
    const newArray = state[stateKey][key][subkey]

    const valueIndex = newArray.indexOf(value)

    if (valueIndex === -1) {
      newArray.push(value)
    } else {
      newArray.splice(valueIndex, 1)
    }

    return ({
      [stateKey]: {
        ...state[stateKey],
        [key]: {
          ...state[stateKey][key],
          [subkey]: newArray
        }
      }
    })
  },
  /**
   * Toggle item from subarray
   * @param  {Object} state     Store state
   * @param  {String} stateKey  State key to update
   * @param  {String} key       key to add/update
   * @param  {String} subkey    subkey to add/update
   * @param  {String} value     Value to add to array
   * @return {undefined}
   */
  toggleFromArrayInKey: (state, stateKey, key, value) => {
    const newArray = state[stateKey][key]

    if (!newArray) {
      return ({
        [stateKey]: {
          ...state[stateKey],
          [key]: [value]
        }
      })
    }

    const valueIndex = newArray.indexOf(value)

    if (valueIndex === -1) {
      newArray.push(value)
    } else {
      newArray.splice(valueIndex, 1)
    }

    return ({
      [stateKey]: {
        ...state[stateKey],
        [key]: newArray
      }
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
