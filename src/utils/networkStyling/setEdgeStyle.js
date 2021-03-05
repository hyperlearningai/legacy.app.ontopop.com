import setUserDefinedEdgeStyle from './setUserDefinedEdgeStyle'
import setEdgeStyleByProperty from './setEdgeStyleByProperty'
import setHighlightedEdge from './setHighlightedEdge'

/**
 * Update edge style
 * @param  {Object}   params
 * @param  {String}   params.edgeId           Edge Id
 * @return { undefined }
 */
const setEdgeStyle = ({
  edgeId
}) => {
  setUserDefinedEdgeStyle({
    edgeId
  })

  setEdgeStyleByProperty({
    edgeId
  })

  setHighlightedEdge({
    edgeId
  })
}

export default setEdgeStyle
