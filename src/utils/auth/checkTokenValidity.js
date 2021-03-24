import { AUTH_COOKIE } from '../../constants/auth'
import { AUTH_ROUTES, ROUTE_INDEX, ROUTE_LOGIN } from '../../constants/routes'
import { OPERATION_TYPE_UPDATE } from '../../constants/store'

const checkTokenValidity = ({
  router,
  updateStoreValue
}) => {
  // check if local storage with cookie
  const authCookie = localStorage.getItem(AUTH_COOKIE)

  if (!authCookie) {
    return !AUTH_ROUTES.includes(window.location.pathname)
      ? router.push(ROUTE_LOGIN) : false
  }

  // // TODO: Add api endpoint to check cookie token validity
  const { email, token } = JSON.parse(authCookie)

  updateStoreValue(['user', 'email'], OPERATION_TYPE_UPDATE, email)
  updateStoreValue(['user', 'token'], OPERATION_TYPE_UPDATE, token)

  router.push(ROUTE_INDEX)
}

export default checkTokenValidity
