import setUserDefinedEdgeStyle from './setUserDefinedEdgeStyle'
import setEdgeStyleByProperty from './setEdgeStyleByProperty'
import setHighlightedEdge from './setHighlightedEdge'
import resetEdgeStyle from './resetEdgeStyle'

/**
 * Update edge style
 * @param  {Object}   params
 * @param  {String}   params.edge           Edge object
 * @return { undefined }
 */
const setEdgeStyle = ({
  edge
}) => {
  if (!edge) return false

  const { id, userDefined } = edge

  if (userDefined) {
    setUserDefinedEdgeStyle({
      edge
    })
  } else {
    resetEdgeStyle({
      edge
    })
  }

  setEdgeStyleByProperty({
    edgeId: id
  })

  setHighlightedEdge({
    edge
  })
}

export default setEdgeStyle
