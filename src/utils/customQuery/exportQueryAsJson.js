import {
  NOTIFY_SUCCESS,
} from '../../constants/notifications'
import showNotification from '../notifications/showNotification'
import store from '../../store'

/**
 * Export data as owl
 * @param  {Object}   params
 * @param  {String}   params.exportFileName             File name
 * @param  {Function} params.t                          i18n translation function
 * @return { undefined }
 */
const exportQueryAsJson = async ({
  exportFileName,
  t
}) => {
  const {
    customQueryFromLatestOutput,
    customQueryOutput
  } = store.getState()

  const element = document.createElement('a')
  const file = new Blob([JSON.stringify({
    query: customQueryFromLatestOutput,
    data: customQueryOutput
  }, null, 2)], { type: 'application/json' })
  element.href = URL.createObjectURL(file)
  element.download = `${exportFileName}.json`
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

export default exportQueryAsJson
