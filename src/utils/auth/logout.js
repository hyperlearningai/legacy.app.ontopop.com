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

  Object.keys(initialState).forEach((key) => {
    if (key === 'availableNodes') return false
    if (key === 'availableEdges') return false

    updateStoreValue([key], OPERATION_TYPE_UPDATE, initialState[key])
  })

  localStorage.removeItem(AUTH_COOKIE)

  router.push(ROUTE_LOGIN)
}

export default logout
