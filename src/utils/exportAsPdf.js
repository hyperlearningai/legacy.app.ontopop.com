/* eslint no-param-reassign:0 */
/* eslint new-cap:0 */
import { jsPDF } from 'jspdf'
import { NOTIFY_SUCCESS } from '../constants/notifications'
import showNotification from './showNotification'

/**
 * Export canvas as pdf
 * @param  {Object} params
 * @param  {String} params.exportFileName  File name
 * @param  {Node}   params.canvasElement   Canvas DOM element
 * @param  {Function} params.t             i18n translation function
 * @return
 */
const exportAsPdf = ({
  exportFileName,
  canvasElement,
  t
}) => {
  // generate pdf file and get aspect ratio
  const doc = new jsPDF()
  // const doc = new jsPDF('landscape')

  const { width, height } = doc.internal.pageSize

  // // Generate a canvas copy to add white background
  const destinationCanvas = document.createElement('canvas')
  destinationCanvas.width = canvasElement.width
  destinationCanvas.height = canvasElement.height

  const destCtx = destinationCanvas.getContext('2d')
  destCtx.fillStyle = '#FFFFFF'
  destCtx.fillRect(0, 0, destinationCanvas.width, destinationCanvas.height)
  destCtx.drawImage(canvasElement, 0, 0)

  const canvasQuality = 1.0
  const format = 'image/png'
  const imageData = destinationCanvas.toDataURL(format, canvasQuality)
  const imageDataUpdated = imageData.replace(format, 'image/octet-stream')

  const topMargin = 10
  const leftMargin = 10

  const widthRatio = width / destinationCanvas.width
  const heightRatio = height / destinationCanvas.height

  const ratio = widthRatio > heightRatio ? heightRatio : widthRatio

  const pdfWidth = (destinationCanvas.width * ratio) - (topMargin * 2)
  const pdfHeight = (destinationCanvas.height * ratio) - (leftMargin * 2)

  doc.addImage(imageDataUpdated,
    'PNG',
    leftMargin,
    topMargin,
    pdfWidth,
    pdfHeight,
    undefined,
    'FAST')
  // }
  doc.save(`${exportFileName}.pdf`)

  destinationCanvas.remove()

  return showNotification({
    message: t('fileCanBeDownloaded'),
    type: NOTIFY_SUCCESS,
    t
  })
}

export default exportAsPdf
