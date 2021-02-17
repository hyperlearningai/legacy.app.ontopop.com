// import axios from 'axios'
// import { AUTH_SIGN_IN } from '../../constants/api'
// import { NOTIFY_WARNING } from '../../constants/notifications'
import { ROUTE_INDEX } from '../../constants/routes'
// import showNotification from '../notifications/showNotification'
import {
  AUTH_COOKIE,
  VALID_EMAIL,
  VALID_PASSWORD
} from '../../constants/auth'

const signIn = async ({
  router,
  addToObject,
  setStoreState,
  email,
  password,
  setShowError
}) => {
  setStoreState('loading', true)

  setTimeout(() => {
    const isEmailCorrect = email === VALID_EMAIL
    const isPasswordCorrect = password === VALID_PASSWORD

    setStoreState('loading', false)

    if (isEmailCorrect && isPasswordCorrect) {
      addToObject('user', 'email', email)
      localStorage.setItem(AUTH_COOKIE, JSON.stringify({ email }))
      return router.push(ROUTE_INDEX)
    }

    setShowError(true)
  }, 3000)

  // try {
  //   const response = await axios.post(AUTH_SIGN_IN, {
  //     email,
  //     password
  //   }, {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })

  //   const { data } = response

  //   if (!data) {
  //     setStoreState('loading', false)

  //     return showNotification({
  //       message: t(error.message),
  //       type: NOTIFY_WARNING
  //     })
  //   }

  //   addToObject('user', 'email', email)

  //   return router.push(ROUTE_INDEX)
  // } catch (error) {
  //   console.log(error)

  //   showNotification({
  //     message: t(error.message),
  //     type: NOTIFY_WARNING
  //   })

  //   setStoreState('loading', false)
  // }
}

export default signIn
