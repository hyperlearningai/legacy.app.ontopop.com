import { OPERATION_TYPE_UPDATE } from '../../constants/store'
import store from '../../store'
import getStylingProperty from '../networkStyling/getStylingProperty'
import getNode from '../nodesEdgesUtils/getNode'
import updateNodes from '../nodesEdgesUtils/updateNodes'

/**
 * Get nodes inside/outside bounding box
 * @param  {Object}   params
 * @param  {Function} params.updateStoreValue          updateStoreValue action
 * @return { undefined }
\ */
const getNodesFromBoundingBox = async ({
  updateStoreValue
}) => {
  const {
    boundingBoxGeometry,
    isBoundingBoxSelectionInternal,
    network,
  } = store.getState()

  const {
    boundingBoxPosX,
    boundingBoxPosY,
    boundingBoxWidth,
    boundingBoxHeight,
  } = boundingBoxGeometry

  const boundingBoxPosX2 = boundingBoxWidth + boundingBoxPosX
  const boundingBoxPosY2 = boundingBoxHeight + boundingBoxPosY

  const availableNodes = await getNode({
    filter: (node) => {
      const nodeXyCoordinates = network.getPosition(node.id)
      const nodeXyCoordinatesCanvas = network.canvasToDOM({
        x: nodeXyCoordinates.x,
        y: nodeXyCoordinates.y
      })
      const isInsideBox = nodeXyCoordinatesCanvas.x <= boundingBoxPosX2
        && nodeXyCoordinatesCanvas.x >= boundingBoxPosX
        && nodeXyCoordinatesCanvas.y <= boundingBoxPosY2
        && nodeXyCoordinatesCanvas.y >= boundingBoxPosY

      const isHighlighted = isBoundingBoxSelectionInternal ? isInsideBox : !isInsideBox
      return isHighlighted
    }
  })

  if (availableNodes.length === 0) updateStoreValue(['selectedBoundingBoxNodes'], OPERATION_TYPE_UPDATE, [])

  const availableNodesLength = availableNodes.length - 1

  for (let index = availableNodesLength; index >= 0; index--) {
    const node = availableNodes[availableNodesLength - index]

    const color = node.color || {}

    color.background = getStylingProperty({
      type: 'node',
      property: 'stylingNodeHighlightBackgroundColor',
      element: node
    })

    updateNodes(
      { id: node.id, color }
    )
  }

  return updateStoreValue(['selectedBoundingBoxNodes'], OPERATION_TYPE_UPDATE, availableNodes)
}

export default getNodesFromBoundingBox
