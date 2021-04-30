import { AUTH_COOKIE } from '../../constants/auth'
import { ROUTE_LOGIN } from '../../constants/routes'
import { OPERATION_TYPE_UPDATE } from '../../constants/store'
import store from '../../store'
import initialState from '../../store/initialState'

/**
 * Set nodes inside bounding box
 * @param  {Object}   params
 * @param  {Function} params.updateStoreValue             updateStoreValue action
 * @param  {Class} params.router                       Router class
 * @return { undefined }
 */
const logout = ({
  router,
  updateStoreValue
}) => {
  const {
    availableNodes,
    availableEdges
  } = store.getState()

  availableNodes.clear()
  availableEdges.clear()

  const initialStateKeys = Object.keys(initialState)
  const initialStateKeysLength = initialStateKeys.length - 1

  for (let index = initialStateKeysLength; index >= 0; index--) {
    const key = initialStateKeys[initialStateKeysLength - index]

    if (key === 'availableNodes') continue
    if (key === 'availableEdges') continue

    updateStoreValue([key], OPERATION_TYPE_UPDATE, initialState[key])
  }

  localStorage.removeItem(AUTH_COOKIE)

  router.push(ROUTE_LOGIN)
}

export default logout
