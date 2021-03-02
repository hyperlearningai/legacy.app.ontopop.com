import axios from 'axios'
import store from '../../store'

/**
 * Http call function
 * @param  {Object}   params
 * @param  {Function} params.setStoreState              setStoreState action
 * @param  {String}   params.body                       Request body
 * @param  {String}   params.route                      Request URL
 * @param  {String}   params.method                     HTTP method
 * @param  {Boolean}  params.withAuth                   Authentication bearer flag
 * @param  {Function} params.t                          i18n translation function
 * @return {*}        response
 */
const httpCall = async ({
  setStoreState,
  withAuth,
  body,
  route,
  method,
  t
}) => {
  const {
    user
  } = store.getState()

  setStoreState('loading', true)

  const headers = {
    'Content-Type': 'application/json'
  }

  if (withAuth) {
    headers.Authorization = user.token
  }

  const config = {
    headers
  }

  let response

  try {
    switch (method) {
      case 'post':
        response = await axios.post(route, body, config)
        break
      default:
        response = await axios.get(route, config)
        break
    }

    setStoreState('loading', false)

    const {
      data,
      status
    } = response

    if (status !== 200) {
      return { error: t('apiCallNotValid') }
    }

    return { data }
  } catch (error) {
    setStoreState('loading', false)

    return { error: t(error.message) }
  }
}

export default httpCall
