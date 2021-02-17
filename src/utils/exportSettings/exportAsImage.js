/* eslint no-param-reassign:0 */
import { NOTIFY_SUCCESS } from '../../constants/notifications'
import showNotification from '../notifications/showNotification'

/**
 * Export canvas as image
 * @param  {Object} params
 * @param  {String} params.exportFileName  File name
 * @param  {String} params.type            Export file type (jpeg|png)
 * @param  {Node}   params.canvasElement   Canvas DOM element
 * @param  {Function} params.t             i18n translation function
 * @return { undefined }
 */
const exportAsImage = ({
  exportFileName,
  type,
  canvasElement,
  t
}) => {
  // Generate a canvas copy to add white background
  const destinationCanvas = document.createElement('canvas')
  destinationCanvas.width = canvasElement.width
  destinationCanvas.height = canvasElement.height
  const destCtx = destinationCanvas.getContext('2d')
  destCtx.fillStyle = '#FFFFFF'
  destCtx.fillRect(0, 0, destinationCanvas.width, destinationCanvas.height)

  destCtx.drawImage(canvasElement, 0, 0)

  const canvasQuality = 1.0

  const format = `image/${type}`
  const imageData = destinationCanvas.toDataURL(format, canvasQuality)
  const imageDataUpdated = imageData.replace(format, 'image/octet-stream')

  const element = document.createElement('a')
  element.href = imageDataUpdated
  element.download = `${exportFileName || 'network-graph'}.${type}`
  element.id = 'output'
  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
  destinationCanvas.remove()

  return showNotification({
    message: t('fileCanBeDownloaded'),
    type: NOTIFY_SUCCESS,
  })
}

export default exportAsImage
