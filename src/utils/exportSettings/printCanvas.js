/* eslint no-param-reassign:0 */
/* eslint new-cap:0 */
import { NOTIFY_SUCCESS } from '../../constants/notifications'
import showNotification from '../notifications/showNotification'

/**
 * Print canvas as pdf
 * @param  {Object} params
 * @param  {Node}   params.canvasElement   Canvas DOM element
 * @param  {Function} params.t             i18n translation function
 * @param  {Function} params.printFunction i18n translation function
 * @return { undefined }
 \ */
const printCanvas = ({
  canvasElement,
  printFunction,
  t
}) => {
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

  printFunction(imageDataUpdated)

  // let windowContent = '<!DOCTYPE html>'
  // windowContent += '<html>'
  // windowContent += '<head><title>Print canvas</title></head>'
  // windowContent += '<body>'
  // windowContent += `<img width="700" src="${imageDataUpdated}">`
  // windowContent += '</body>'
  // windowContent += '</html>'
  // const printWin = window.open('', '')
  // printWin.document.open()
  // printWin.document.write(windowContent)

  // setTimeout(
  //   () => printWin.print(),
  //   1000
  // )
  // window.close()

  showNotification({
    message: t('fileCanBePrinted'),
    type: NOTIFY_SUCCESS,
  })
}

export default printCanvas
