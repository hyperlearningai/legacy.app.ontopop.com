/* eslint no-console:0 */
import { NOTIFY_SUCCESS } from '../../constants/notifications'
import { ROUTE_LOGIN } from '../../constants/routes'
import showNotification from '../notifications/showNotification'

const getPasswordReset = ({
  email,
  router,
  setStoreState,
  t
}) => {
  setStoreState('loading', true)

  setTimeout(() => {
    setStoreState('loading', false)
    const message = `${t('resetPasswordAtEmail')}: ${email}`

    showNotification({
      message,
      type: NOTIFY_SUCCESS
    })

    return router.push(ROUTE_LOGIN)
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

export default getPasswordReset
