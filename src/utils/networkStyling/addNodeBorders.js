import { ROUTE_NOTES } from '../../constants/routes'
import highlightCommentedNode from './highlightCommentedNode'
import highlightSpiderableNode from './highlightSpiderableNode'

/**
 * Highlight spiderable node borders
 * @param  {Object}   params
 * @param  {Object}   params.node           Node object
 * @return { undefined }
 */
const addNodeBorders = ({
  node,
}) => {
  if (window.location.pathname === ROUTE_NOTES) {
    highlightCommentedNode({
      node
    })
  } else {
    highlightSpiderableNode({
      node
    })
  }
}

export default addNodeBorders
