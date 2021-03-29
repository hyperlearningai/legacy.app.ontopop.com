import axios from 'axios'
import { OPERATION_TYPE_ADD } from '../../constants/store'
import store from '../../store'

/**
 * Http call function
 * @param  {Object}   params
 * @param  {Function} params.updateStoreValue           updateStoreValue action
 * @param  {Object}   [params.body]                     Request body
 * @param  {String}   params.route                      Request URL
 * @param  {String}   params.method                     HTTP method
 * @param  {Boolean}  params.withAuth                   Authentication bearer flag
 * @param  {Object}  [params.additionalHeaders]         AdditionalHeaders
 * @param  {Function} params.t                          i18n translation function
 * @return {*}        response
 */
const httpCall = async ({
  updateStoreValue,
  withAuth,
  body,
  route,
  method,
  additionalHeaders,
  t,
}) => {
  const {
    user
  } = store.getState()

  updateStoreValue(['activeLoaders'], OPERATION_TYPE_ADD, 1)

  const contentTypeHeader = {
    'Content-Type': 'application/json',
  }

  const headers = additionalHeaders ? {
    ...contentTypeHeader,
    ...additionalHeaders
  } : contentTypeHeader

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

    updateStoreValue(['activeLoaders'], OPERATION_TYPE_ADD, -1)

    const {
      data,
      status
    } = response

    if (status !== 200) {
      return { error: t('apiCallNotValid') }
    }

    return { data }
  } catch (error) {
    updateStoreValue(['activeLoaders'], OPERATION_TYPE_ADD, -1)

    return { error: t(error.message) }
  }
}

export default httpCall
