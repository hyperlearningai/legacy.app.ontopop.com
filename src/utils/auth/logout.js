import { AUTH_COOKIE } from '../../constants/auth'
import { ROUTE_LOGIN } from '../../constants/routes'
import { OPERATION_TYPE_UPDATE } from '../../constants/store'

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
  updateStoreValue(['user'], OPERATION_TYPE_UPDATE, {
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    isGuest: false,
    token: ''
  })

  localStorage.removeItem(AUTH_COOKIE)

  router.push(ROUTE_LOGIN)
}

export default logout
