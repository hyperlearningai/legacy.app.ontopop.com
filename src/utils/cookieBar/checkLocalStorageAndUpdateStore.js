import { OPERATION_TYPE_UPDATE } from '../../constants/store'

/**
 * check local storage value and update store
 * @param  {Object} params
 * @param  {Function} params.updateStoreValue   LocalStorage name
 * @param  {String} params.name   LocalStorage name
 * @param  {String}      params.state  LocalStorage value
 * @return {Boolean} isUndefined  Value is undefined flag
 */
const checkLocalStorageAndUpdateStore = ({
  updateStoreValue,
  name,
  state,
}) => {
  const value = localStorage.getItem(name)

  const isUndefined = value === null || value === undefined

  if (!isUndefined) {
    updateStoreValue([state], OPERATION_TYPE_UPDATE, value === 'true')
  }

  return isUndefined
}

export default checkLocalStorageAndUpdateStore
