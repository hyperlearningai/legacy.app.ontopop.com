import store from '../../store'

/**
 * Update bounding box on mouse move event listener
 * @param  {Object}   params
 * @param  {Object}   params.e                      Canvas DOM event
 * @param  {function} params.setStoreState          setStoreState action
 * @return
 */
const onMouseMove = ({
  e,
  setStoreState
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

    setStoreState('boundingBoxGeometry', newBoundingBoxGeometry)
  }
}

export default onMouseMove
