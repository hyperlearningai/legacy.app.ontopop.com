// if (drag) {
//   rect.w = (e.pageX - this.offsetLeft) - rect.startX
//   rect.h = (e.pageY - this.offsetTop) - rect.startY
//   ctx.clearRect(0, 0, canvas.width, canvas.height)
//   draw()
// }

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
  } = store.getState()

  const newBoundingBoxGeometry = JSON.parse(JSON.stringify(boundingBoxGeometry))

  const {
    layerX,
    layerY,
    // movementX,
    // movementY,
    // offsetX,
    // offsetY,
    // x,
    // y,
  } = e
  console.log({
    layerX,
    layerY,
    boundingBoxPosX: newBoundingBoxGeometry.boundingBoxPosX,
    boundingBoxPosY: newBoundingBoxGeometry.boundingBoxPosY
  })

  newBoundingBoxGeometry.boundingBoxWidth = e.layerX - newBoundingBoxGeometry.boundingBoxPosX
  newBoundingBoxGeometry.boundingBoxHeight = e.layerY // - newBoundingBoxGeometry.boundingBoxPosY

  setStoreState('boundingBoxGeometry', newBoundingBoxGeometry)
}

export default onMouseMove
