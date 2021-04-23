import { parse, stringify } from 'flatted'
import {
  OPERATION_TYPE_UPDATE,
  OPERATION_TYPE_ADD,
  OPERATION_TYPE_PUSH,
  OPERATION_TYPE_PUSH_UNIQUE,
  OPERATION_TYPE_TOGGLE,
  OPERATION_TYPE_ARRAY_DELETE,
  OPERATION_TYPE_DELETE,
  OPERATION_TYPE_OBJECT_ADD,
  OPERATION_TYPE_ARRAY_DELETE_INDEX
} from '../constants/store'

export default {
  /**
   * Update store value
   * Add operation: Add/append value to existing
   * Push operation: Push value to array
   * Push unique operation: Push value to array if not existing
   * Toggle operation: Push value to array if not existing, remove from array if existing
   * Delete operation: Delete key
   * Array Delete operation: Delete item in array which matches the value
   * Array Delete Index operation: Delete item in array by index value
   * Object add operation: Add item to object
   * Update operation: Replace current value with new one
   * @param  {Object}  state            Store state
   * @param  {Array}   keys             Object keys in nested order
   * @param  {String}  type             operation type [add | delete | update | push | toggle]
   * @param  {*=}      value            new subkey value
   * @return {undefined}
   */
  updateStoreValue: (state, keys, type, value) => {
    const stateKey = keys[0]

    const newState = {
      [stateKey]: state[stateKey] ? parse(stringify(state[stateKey])) : undefined
    }

    const subValues = [newState]

    keys.map((currentKey, index) => {
      const isLastKey = index === keys.length - 1

      const nextSubvalue = subValues[index][currentKey]

      if (isLastKey) {
        if (type === OPERATION_TYPE_UPDATE) {
          subValues[index][currentKey] = value
        }

        if (type === OPERATION_TYPE_ADD) {
          if (typeof subValues[index][currentKey] === 'number') {
            subValues[index][currentKey] += value
          } else {
            subValues[index][currentKey] = value
          }
        }

        if (type === OPERATION_TYPE_PUSH) {
          if (
            !subValues[index][currentKey]
            || !Array.isArray(subValues[index][currentKey])
          ) {
            subValues[index][currentKey] = []
          }

          subValues[index][currentKey].push(value)
        }

        if (type === OPERATION_TYPE_PUSH_UNIQUE) {
          if (
            !subValues[index][currentKey]
            || !Array.isArray(subValues[index][currentKey])
          ) {
            subValues[index][currentKey] = []
          }

          if (!subValues[index][currentKey].includes(value)) {
            subValues[index][currentKey].push(value)
          }
        }

        if (type === OPERATION_TYPE_TOGGLE) {
          if (
            !subValues[index][currentKey]
            || !Array.isArray(subValues[index][currentKey])
          ) {
            subValues[index][currentKey] = []
          }

          const valueIndex = subValues[index][currentKey].indexOf(value)

          if (valueIndex > -1) {
            subValues[index][currentKey].splice(valueIndex, 1)
          } else {
            subValues[index][currentKey].push(value)
          }
        }

        if (type === OPERATION_TYPE_ARRAY_DELETE) {
          if (
            !Array.isArray(subValues[index][currentKey])
          ) {
            subValues[index][currentKey] = []
          }

          const valueIndex = subValues[index][currentKey].indexOf(value)

          if (valueIndex > -1) {
            subValues[index][currentKey].splice(valueIndex, 1)
          }
        }

        if (type === OPERATION_TYPE_ARRAY_DELETE_INDEX) {
          if (
            !subValues[index][currentKey]
            || !Array.isArray(subValues[index][currentKey])
          ) {
            subValues[index][currentKey] = []
          }

          if (value > -1) {
            subValues[index][currentKey].splice(value, 1)
          }
        }

        if (type === OPERATION_TYPE_DELETE) {
          if (
            subValues[index][currentKey]
          ) {
            delete subValues[index][currentKey]
          }
        }

        if (type === OPERATION_TYPE_OBJECT_ADD) {
          if (
            !subValues[index][currentKey]
          ) {
            subValues[index][currentKey] = {}
          }

          subValues[index][currentKey] = {
            ...subValues[index][currentKey],
            ...value
          }
        }
      }

      return subValues.push(nextSubvalue)
    })

    return { [stateKey]: subValues[0][stateKey] }
  },
}
