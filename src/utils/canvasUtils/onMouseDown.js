import store from '../../store'
import getNodesFromBoundingBox from './getNodesFromBoundingBox'

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
    isBoundingBoxDrawable,
  } = store.getState()

  const isBoundingBoxDrawableNow = !isBoundingBoxDrawable

  setStoreState('isBoundingBoxDrawable', isBoundingBoxDrawableNow)

  const newBoundingBoxGeometry = JSON.parse(JSON.stringify(boundingBoxGeometry))

  if (isBoundingBoxDrawableNow) {
    setStoreState('selectedBoundingBoxNodes', [])

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

    setStoreState('boundingBoxGeometry', newBoundingBoxGeometry)
  } else {
    getNodesFromBoundingBox({
      setStoreState
    })
  }
}

export default onMouseDown
