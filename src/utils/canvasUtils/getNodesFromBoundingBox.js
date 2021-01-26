import store from '../../store'

/**
 * Get nodes inside/outside bounding box
 * @param  {Object}   params
 * @param  {function} params.setStoreState          setStoreState action
 * @return
 */
const getNodesFromBoundingBox = async ({
  setStoreState
}) => {
  const {
    boundingBoxGeometry,
    isBoundingBoxSelectionInternal,
    availableNodesNormalised,
    network
  } = store.getState()

  const availableNodesIds = Object.keys(availableNodesNormalised)

  if (availableNodesIds.length > 0) {
    const {
      boundingBoxPosX,
      boundingBoxPosY,
      boundingBoxWidth,
      boundingBoxHeight,
    } = boundingBoxGeometry

    const boundingBoxPosX2 = boundingBoxWidth + boundingBoxPosX
    const boundingBoxPosY2 = boundingBoxHeight + boundingBoxPosY

    setStoreState('selectedBoundingBoxNodes',
      availableNodesIds.filter((nodeId) => {
        const nodeXyCoordinates = network.getPosition(nodeId)
        const nodeXyCoordinatesCanvas = network.canvasToDOM({
          x: nodeXyCoordinates.x,
          y: nodeXyCoordinates.y
        })
        const isInsideBox = nodeXyCoordinatesCanvas.x <= boundingBoxPosX2
          && nodeXyCoordinatesCanvas.x >= boundingBoxPosX
          && nodeXyCoordinatesCanvas.y <= boundingBoxPosY2
          && nodeXyCoordinatesCanvas.y >= boundingBoxPosY

        return isBoundingBoxSelectionInternal ? isInsideBox : !isInsideBox
      }))
  }
}

export default getNodesFromBoundingBox
