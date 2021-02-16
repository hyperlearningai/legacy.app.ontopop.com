import store from '../../store'
import updateEdges from '../nodesEdgesUtils/updateEdges'

/**
 * Reset selected node style
 * @param  {Object}   params
 * @param  {Function} params.setStoreState           setStoreState action
 * @return { undefined }
 */
const resetSelectedEdges = ({
  setStoreState
}) => {
  const {
    stylingEdgeWidth,
    stylingEdgeLineColor,
    prevSelectedEdges
  } = store.getState()

  if (!prevSelectedEdges || prevSelectedEdges.length === 0) return false

  prevSelectedEdges.map((prevSelectedEdge) => {
    const color = prevSelectedEdge.color || {
      color: stylingEdgeLineColor
    }
    const width = prevSelectedEdge.width || stylingEdgeWidth

    return updateEdges({
      id: prevSelectedEdge.id,
      color,
      width
    })
  })

  setStoreState('prevSelectedEdges', undefined)
}

export default resetSelectedEdges
