import { AUTH_COOKIE } from '../../constants/auth'
import { AUTH_ROUTES, ROUTE_LOGIN } from '../../constants/routes'

const checkTokenValidity = ({
  router,
  addToObject
}) => {
  // check if local storage with cookie
  const authCookie = localStorage.getItem(AUTH_COOKIE)

  if (!authCookie) {
    return !AUTH_ROUTES.includes(window.location.pathname)
      ? router.push(ROUTE_LOGIN) : false
  }

  // // TODO: Add api endpoint to check cookie token validity
  const { email, token } = JSON.parse(authCookie)

  addToObject('user', 'email', email)
  addToObject('user', 'token', token)
}

export default checkTokenValidity
