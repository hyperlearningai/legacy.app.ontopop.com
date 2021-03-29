import { AUTH_COOKIE } from '../../constants/auth'
import {
  AUTH_ROUTES,
  ROUTE_LOGIN,
  ROUTE_SEARCH
} from '../../constants/routes'
import { OPERATION_TYPE_UPDATE } from '../../constants/store'
import resetGraphData from '../graphVisualisation/resetGraphData'

const checkTokenValidity = ({
  router,
  updateStoreValue
}) => {
  // check if local storage with cookie
  const authCookie = localStorage.getItem(AUTH_COOKIE)

  if (!authCookie) {
    const isBackToLogin = !AUTH_ROUTES.includes(window.location.pathname)

    if (isBackToLogin) {
      resetGraphData({
        updateStoreValue
      })

      return router.push(ROUTE_LOGIN)
    }

    return false
  }

  // // TODO: Add api endpoint to check cookie token validity
  const { email, token } = JSON.parse(authCookie)

  updateStoreValue(['user', 'email'], OPERATION_TYPE_UPDATE, email)
  updateStoreValue(['user', 'token'], OPERATION_TYPE_UPDATE, token)

  router.push(ROUTE_SEARCH)
}

export default checkTokenValidity
