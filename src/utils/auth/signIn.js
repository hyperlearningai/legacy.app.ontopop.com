import axios from 'axios'
import { ROUTE_INDEX } from '../../constants/routes'
import {
  AUTH_COOKIE,
} from '../../constants/auth'
import { AUTH_SIGN_IN } from '../../constants/api'
import { NOTIFY_WARNING } from '../../constants/notifications'
import showNotification from '../notifications/showNotification'

const signIn = async ({
  router,
  addToObject,
  setStoreState,
  email,
  password,
  setShowError,
  t
}) => {
  setStoreState('loading', true)

  try {
    const response = await axios.post(AUTH_SIGN_IN, {
      username: email,
      password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const { data } = response

    if (!data) {
      setStoreState('loading', false)

      return showNotification({
        message: t(response),
        type: NOTIFY_WARNING
      })
    }

    addToObject('user', 'email', email)
    localStorage.setItem(AUTH_COOKIE, JSON.stringify({ email, bearer: data.token }))
    return router.push(ROUTE_INDEX)
  } catch (error) {
    showNotification({
      message: t(error.message),
      type: NOTIFY_WARNING
    })

    setShowError(true)
    setStoreState('loading', false)
  }
}

export default signIn
