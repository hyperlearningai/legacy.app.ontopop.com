import store from '../../store'

/**
 * Update X-Y position of bounding box on mouse down event listener
 * @param  {Object}   params
 * @param  {Object}   params.e                      Canvas DOM event
 * @param  {function} params.setStoreState          setStoreState action
 * @return
 */
const onMouseDown = ({
  e,
  setStoreState
}) => {
  const {
    boundingBoxGeometry,
    isBoundingBoxDraggable
  } = store.getState()

  const newDraggingState = !isBoundingBoxDraggable
  setStoreState('boundingBoxGeometry', isBoundingBoxDraggable)

  if (newDraggingState) {
    const newBoundingBoxGeometry = JSON.parse(JSON.stringify(boundingBoxGeometry))

    const {
      layerX,
      layerY,
      movementX,
      movementY,
      offsetX,
      offsetY,
      x,
      y,
    } = e
    console.log({
      layerX,
      layerY,
      movementX,
      movementY,
      offsetX,
      offsetY,
      x,
      y,
    })

    newBoundingBoxGeometry.boundingBoxPosX = e.offsetX
    newBoundingBoxGeometry.boundingBoxPosY = e.offsetY + 70
    newBoundingBoxGeometry.boundingBoxWidth = 0
    newBoundingBoxGeometry.boundingBoxHeight = 0

    setStoreState('boundingBoxGeometry', newBoundingBoxGeometry)
  }
}

export default onMouseDown
