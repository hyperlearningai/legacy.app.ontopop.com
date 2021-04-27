import { AUTH_COOKIE } from '../../constants/auth'
import {
  AUTH_ROUTES,
  ROUTE_INDEX,
  ROUTE_LISTING,
  VALID_ROUTES
} from '../../constants/routes'
import { OPERATION_TYPE_UPDATE } from '../../constants/store'
import { SIDEBAR_VIEW_ENTRY_SEARCH } from '../../constants/views'
import store from '../../store'
import logout from './logout'

const checkTokenValidity = ({
  router,
  updateStoreValue
}) => {
  const {
    sidebarView
  } = store.getState()

  const { pathname } = router

  // if homepage, do nothing
  const isIndex = pathname === ROUTE_INDEX
  if (isIndex) return false

  // redirect to homepage if not valid route
  const isNotValid = !VALID_ROUTES.includes(pathname)
  if (isNotValid) return router.push(ROUTE_INDEX)

  // check if local storage with cookie
  const authCookie = localStorage.getItem(AUTH_COOKIE)

  if (!authCookie) {
    const isBackToLogin = !AUTH_ROUTES.includes(pathname)

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

  if (sidebarView !== SIDEBAR_VIEW_ENTRY_SEARCH) {
    updateStoreValue(['sidebarView'], OPERATION_TYPE_UPDATE, SIDEBAR_VIEW_ENTRY_SEARCH)
  }

  if (pathname !== ROUTE_LISTING) {
    router.push(ROUTE_LISTING)
  }
}

export default checkTokenValidity
