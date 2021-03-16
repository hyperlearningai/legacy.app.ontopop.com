import store from '../../store'
import getStylingProperty from '../networkStyling/getStylingProperty'
import getNode from '../nodesEdgesUtils/getNode'
import updateNodes from '../nodesEdgesUtils/updateNodes'

/**
 * Get nodes inside/outside bounding box
 * @param  {Object}   params
 * @param  {function} params.setStoreState          setStoreState action
 * @return { undefined }
\ */
const getNodesFromBoundingBox = async ({
  setStoreState
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

  if (availableNodes.length === 0) setStoreState('selectedBoundingBoxNodes', [])

  availableNodes.map((node) => {
    const color = node.color || {}

    color.background = getStylingProperty({
      type: 'node',
      property: 'stylingNodeHighlightBackgroundColor',
      element: node
    })

    return updateNodes(
      { id: node.id, color }
    )
  })

  return setStoreState('selectedBoundingBoxNodes', availableNodes)
}

export default getNodesFromBoundingBox
