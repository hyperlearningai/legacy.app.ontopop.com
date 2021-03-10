import axios from 'axios'
import store from '../../store'

/**
 * Http call function
 * @param  {Object}   params
 * @param  {Function} params.addNumber                  addNumber action
 * @param  {String}   params.body                       Request body
 * @param  {String}   params.route                      Request URL
 * @param  {String}   params.method                     HTTP method
 * @param  {Boolean}  params.withAuth                   Authentication bearer flag
 * @param  {Function} params.t                          i18n translation function
 * @return {*}        response
 */
const httpCall = async ({
  addNumber,
  withAuth,
  body,
  route,
  method,
  t
}) => {
  const {
    user
  } = store.getState()

  addNumber('activeLoaders', 1)

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
      case 'patch':
        response = await axios.patch(route, body, config)
        break
      case 'delete':
        response = await axios.delete(route, config)
        break
      default:
        response = await axios.get(route, config)
        break
    }

    addNumber('activeLoaders', -1)

    const {
      data,
      status
    } = response

    if (status !== 200) {
      return { error: t('apiCallNotValid') }
    }

    return { data }
  } catch (error) {
    addNumber('activeLoaders', -1)

    return { error: t(error.message) }
  }
}

export default httpCall
