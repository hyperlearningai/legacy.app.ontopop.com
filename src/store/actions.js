import {
  OPERATION_TYPE_ADD,
  OPERATION_TYPE_PUSH,
  OPERATION_TYPE_TOGGLE,
  OPERATION_TYPE_UPDATE,
  OPERATION_TYPE_DELETE
} from '../constants/store'

export default {
  /**
   * Update store value
   * Add operation: Add/append value to existing
   * Delete operation: Delete key (only avaiable for multi-keys as cannot remove key from store)
   * Update operation: Replace current value with new one
   * Push operation: Push value to array
   * Toggle operation: Push value to array if not existing, remove from array if existing
   * @param  {Object}  state            Store state
   * @param  {Array}   keys             Object keys in nested order
   * @param  {String}  type             operation type [add | delete | update | push | toggle]
   * @param  {*=}      value            new subkey value
   * @return {undefined}
   */
  updateStoreValue: (state, keys, type, value) => {
    const newObject = state
    const key = keys[0]

    if (keys.length < 2) {
      if (type === OPERATION_TYPE_ADD) {
        return {
          [key]: newObject[key] + value
        }
      }

      if (type === OPERATION_TYPE_PUSH) {
        const newArray = state[key].slice()
        newArray.push(value)

        return {
          [key]: newArray
        }
      }

      if (type === OPERATION_TYPE_TOGGLE) {
        const newArray = state[key].slice()

        const valueIndex = newArray.indexOf(value)

        if (valueIndex > -1) {
          newArray.splice(valueIndex, 1)
        } else {
          newArray.push(value)
        }

        return {
          [key]: newArray
        }
      }

      return {
        [key]: value
      }
    }

    const subValues = [newObject]

    keys.map((currentKey, index) => {
      if (index > keys.length - 2) return false

      if (index > keys.length - 3) {
        const nextKey = keys[index + 1]

        if (type === OPERATION_TYPE_UPDATE) {
          subValues[index][currentKey][nextKey] = value
        }

        if (type === OPERATION_TYPE_ADD) {
          subValues[index][currentKey][nextKey] += value
        }

        if (type === OPERATION_TYPE_DELETE) {
          delete subValues[index][currentKey][nextKey]
        }

        if (type === OPERATION_TYPE_PUSH) {
          if (
            !subValues[index][currentKey][nextKey]
          ) {
            subValues[index][currentKey][nextKey] = []
          }

          subValues[index][currentKey][nextKey].push(value)
        }

        if (type === OPERATION_TYPE_TOGGLE) {
          if (
            !subValues[index][currentKey][nextKey]
          ) {
            subValues[index][currentKey][nextKey] = []
          }

          const valueIndex = subValues[index][currentKey][nextKey].indexOf(value)

          if (valueIndex > -1) {
            subValues[index][currentKey][nextKey].splice(valueIndex, 1)
          } else {
            subValues[index][currentKey][nextKey].push(value)
          }
        }

        return subValues.push(subValues[index][currentKey])
      }

      return subValues.push(subValues[index][currentKey])
    })

    return { [key]: JSON.parse(JSON.stringify(newObject[key])) }
  },
}
