import { AUTH_COOKIE } from '../../constants/auth'
import { ROUTE_LOGIN } from '../../constants/routes'

const logout = ({
  router,
  setStoreState
}) => {
  setStoreState('user', {
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    isGuest: false
  })

  localStorage.removeItem(AUTH_COOKIE)

  router.push(ROUTE_LOGIN)
}

export default logout
