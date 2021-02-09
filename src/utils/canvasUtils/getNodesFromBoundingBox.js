import { HIGHLIGHT_NODE_BACKGROUND } from '../../constants/graph'
import store from '../../store'
import clearNodesSelection from './clearNodesSelection'

/**
 * Get nodes inside/outside bounding box
 * @param  {Object}   params
 * @param  {function} params.setStoreState          setStoreState action
 * @return { undefined }
\ */
const getNodesFromBoundingBox = ({
  setStoreState
}) => {
  const {
    boundingBoxGeometry,
    isBoundingBoxSelectionInternal,
    availableNodes,
    network,
  } = store.getState()

  clearNodesSelection()

  const availableNodesIds = availableNodes.getIds()

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

        const isHighlighted = isBoundingBoxSelectionInternal ? isInsideBox : !isInsideBox

        if (isHighlighted) {
          availableNodes.update(
            [{ id: nodeId, color: { background: HIGHLIGHT_NODE_BACKGROUND } }]
          )
        }

        return isHighlighted
      }))
  }
}

export default getNodesFromBoundingBox
