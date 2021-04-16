import { ROUTE_LISTING } from '../../constants/routes'
import {
  AUTH_COOKIE,
} from '../../constants/auth'
import { API_ENDPOINT_AUTH_SIGN_IN } from '../../constants/api'
import { NOTIFY_WARNING } from '../../constants/notifications'
import showNotification from '../notifications/showNotification'
import httpCall from '../apiCalls/httpCall'
import { OPERATION_TYPE_UPDATE } from '../../constants/store'

/**
 * Http call function
 * @param  {Object}   params
 * @param  {Class}    params.router                     NextJs router class
 * @param  {Function} params.updateStoreValue                updateStoreValue action
 * @param  {String}   params.email                      Email
 * @param  {String}   params.password                   Password
 * @param  {Function} params.setShowError               setShowError state function
 * @param  {Function} params.t                          i18n translation function
 * @return {*}        response
 */
const signIn = async ({
  router,
  updateStoreValue,
  email,
  password,
  setShowError,
  t
}) => {
  const withAuth = false

  const response = await httpCall({
    updateStoreValue,
    withAuth,
    body: {
      username: email,
      password
    },
    route: API_ENDPOINT_AUTH_SIGN_IN,
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

  updateStoreValue(['user', 'email'], OPERATION_TYPE_UPDATE, email)
  updateStoreValue(['user', 'token'], OPERATION_TYPE_UPDATE, token)
  localStorage.setItem(AUTH_COOKIE, JSON.stringify({ email, token }))

  return router.push(ROUTE_LISTING)
}

export default signIn
