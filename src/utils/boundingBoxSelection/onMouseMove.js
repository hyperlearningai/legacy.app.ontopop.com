import { OPERATION_TYPE_UPDATE } from '../../constants/store'
import store from '../../store'

/**
 * Update bounding box on mouse move event listener
 * @param  {Object}   params
 * @param  {Object}   params.e                          Canvas DOM event
 * @param  {Function} params.updateStoreValue           updateStoreValue action
 * @return { undefined }
 */
const onMouseMove = ({
  e,
  updateStoreValue
}) => {
  const {
    boundingBoxGeometry,
    isBoundingBoxDrawable
  } = store.getState()

  if (isBoundingBoxDrawable) {
    const newBoundingBoxGeometry = JSON.parse(JSON.stringify(boundingBoxGeometry))

    const {
      fixedPointX,
      fixedPointY,
    } = newBoundingBoxGeometry

    const {
      offsetX,
      offsetY
    } = e

    const boundingBoxPosX = offsetX >= fixedPointX ? fixedPointX : offsetX
    const boundingBoxPosY = offsetY >= fixedPointY ? fixedPointY : offsetY
    const boundingBoxWidth = offsetX >= fixedPointX
      ? offsetX - fixedPointX
      : fixedPointX - offsetX
    const boundingBoxHeight = offsetY >= fixedPointY
      ? offsetY - fixedPointY
      : fixedPointY - offsetY

    newBoundingBoxGeometry.boundingBoxPosX = boundingBoxPosX
    newBoundingBoxGeometry.boundingBoxPosY = boundingBoxPosY
    newBoundingBoxGeometry.boundingBoxWidth = boundingBoxWidth
    newBoundingBoxGeometry.boundingBoxHeight = boundingBoxHeight

    updateStoreValue(['boundingBoxGeometry'], OPERATION_TYPE_UPDATE, newBoundingBoxGeometry)
  }
}

export default onMouseMove
