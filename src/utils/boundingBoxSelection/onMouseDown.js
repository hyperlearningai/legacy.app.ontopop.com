import { OPERATION_TYPE_UPDATE } from '../../constants/store'
import store from '../../store'
import getNodesFromBoundingBox from './getNodesFromBoundingBox'
import resetBoundingBoxNodes from './resetBoundingBoxNodes'

/**
 * Update X-Y position of bounding box on mouse down event listener
 * @param  {Object}   params
 * @param  {Object}   params.e                        Canvas DOM event
 * @param  {Function} params.updateStoreValue         updateStoreValue action
 * @return { undefined }
\ */
const onMouseDown = ({
  e,
  updateStoreValue
}) => {
  const {
    boundingBoxGeometry,
    isBoundingBoxDrawable,
    isBoundingBoxSelectable
  } = store.getState()

  if (isBoundingBoxSelectable) {
    const isBoundingBoxDrawableNow = !isBoundingBoxDrawable

    updateStoreValue(['isBoundingBoxDrawable'], OPERATION_TYPE_UPDATE, isBoundingBoxDrawableNow)

    const newBoundingBoxGeometry = JSON.parse(JSON.stringify(boundingBoxGeometry))

    if (isBoundingBoxDrawableNow) {
      const {
        offsetX,
        offsetY,
      } = e

      newBoundingBoxGeometry.fixedPointX = offsetX
      newBoundingBoxGeometry.fixedPointY = offsetY
      newBoundingBoxGeometry.boundingBoxPosX = offsetX
      newBoundingBoxGeometry.boundingBoxPosY = offsetY
      newBoundingBoxGeometry.boundingBoxWidth = 0
      newBoundingBoxGeometry.boundingBoxHeight = 0

      updateStoreValue(['boundingBoxGeometry'], OPERATION_TYPE_UPDATE, newBoundingBoxGeometry)
    } else {
      resetBoundingBoxNodes()

      getNodesFromBoundingBox({
        updateStoreValue
      })
    }
  }
}

export default onMouseDown
