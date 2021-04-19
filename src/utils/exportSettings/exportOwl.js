/* eslint no-param-reassign:0 */
/* eslint new-cap:0 */
import { API_ENDPOINT_ONTOLOGY_EXPORT } from '../../constants/api'
import {
  NOTIFY_SUCCESS, NOTIFY_WARNING,
} from '../../constants/notifications'
import store from '../../store'
import httpCall from '../apiCalls/httpCall'
import showNotification from '../notifications/showNotification'

/**
 * Export data as owl
 * @param  {Object}   params
 * @param  {String}   params.exportFileName             File name
 * @param  {Function} params.updateStoreValue           updateStoreValue action
 * @param  {Function} params.t                          i18n translation function
 * @return { undefined }
\ */
const exportOwl = async ({
  exportFileName,
  updateStoreValue,
  t
}) => {
  const {
    user
  } = store.getState()

  const withAuth = !!user.token

  const response = await httpCall({
    updateStoreValue,
    withAuth,
    route: API_ENDPOINT_ONTOLOGY_EXPORT,
    method: 'get',
    t
  })

  const {
    error,
    data
  } = response

  if (error || !data) {
    return showNotification({
      message: t('couldNotExportOwl'),
      type: NOTIFY_WARNING
    })
  }

  const element = document.createElement('a')
  const file = new Blob([data], { type: 'application/xml' })
  element.href = URL.createObjectURL(file)
  element.download = `${exportFileName || 'network-graph'}.owl`
  element.id = 'output'
  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)

  showNotification({
    message: t('fileCanBeDownloaded'),
    type: NOTIFY_SUCCESS,
  })
}

export default exportOwl
