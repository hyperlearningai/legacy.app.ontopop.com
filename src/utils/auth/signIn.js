import { ROUTE_INDEX } from '../../constants/routes'
import {
  AUTH_COOKIE,
} from '../../constants/auth'
import { AUTH_SIGN_IN } from '../../constants/api'
import { NOTIFY_WARNING } from '../../constants/notifications'
import showNotification from '../notifications/showNotification'
import httpCall from '../apiCalls/httpCall'

const signIn = async ({
  router,
  addToObject,
  setStoreState,
  email,
  password,
  setShowError,
  t
}) => {
  const withAuth = false

  const response = await httpCall({
    setStoreState,
    withAuth,
    body: {
      username: email,
      password
    },
    route: AUTH_SIGN_IN,
    method: 'post',
    t
  })

  const {
    error,
    data
  } = response

  if (error) {
    setShowError(true)
    return showNotification({
      message: error,
      type: NOTIFY_WARNING
    })
  }

  const { token } = data

  addToObject('user', 'email', email)
  addToObject('user', 'token', token)
  localStorage.setItem(AUTH_COOKIE, JSON.stringify({ email, token }))

  return router.push(ROUTE_INDEX)
}

export default signIn
