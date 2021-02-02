import store from '../../store'
import clearNodesSelection from './clearNodesSelection'
import getNodesFromBoundingBox from './getNodesFromBoundingBox'

/**
 * Update X-Y position of bounding box on mouse down event listener
 * @param  {Object}   params
 * @param  {Object}   params.e                      Canvas DOM event
 * @param  {function} params.setStoreState          setStoreState action
 * @return { undefined }
\ */
const onMouseDown = ({
  e,
  setStoreState
}) => {
  const {
    boundingBoxGeometry,
    isBoundingBoxDrawable,
    isBoundingBoxSelectable
  } = store.getState()

  if (isBoundingBoxSelectable) {
    const isBoundingBoxDrawableNow = !isBoundingBoxDrawable

    setStoreState('isBoundingBoxDrawable', isBoundingBoxDrawableNow)

    const newBoundingBoxGeometry = JSON.parse(JSON.stringify(boundingBoxGeometry))

    if (isBoundingBoxDrawableNow) {
      clearNodesSelection()

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
}

export default onMouseDown
