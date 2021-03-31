import { AUTH_COOKIE } from '../../constants/auth'
import {
  AUTH_ROUTES,
  ROUTE_SEARCH
} from '../../constants/routes'
import { OPERATION_TYPE_UPDATE } from '../../constants/store'
import { SIDEBAR_VIEW_ENTRY_SEARCH } from '../../constants/views'
import logout from './logout'

const checkTokenValidity = ({
  router,
  updateStoreValue
}) => {
  // check if local storage with cookie
  const authCookie = localStorage.getItem(AUTH_COOKIE)

  if (!authCookie) {
    const isBackToLogin = !AUTH_ROUTES.includes(router.pathname)

    if (isBackToLogin) {
      return logout({
        router,
        updateStoreValue
      })
    }

    return false
  }

  // // TODO: Add api endpoint to check cookie token validity
  const { email, token } = JSON.parse(authCookie)

  updateStoreValue(['user', 'email'], OPERATION_TYPE_UPDATE, email)
  updateStoreValue(['user', 'token'], OPERATION_TYPE_UPDATE, token)

  const { query } = router
  const { slug } = query

  if (!slug || (slug && slug[0] !== SIDEBAR_VIEW_ENTRY_SEARCH)) {
    router.push(ROUTE_SEARCH)
  }
}

export default checkTokenValidity
