import { ROUTE_NOTES } from '../../constants/routes'
import highlightCommentedNodes from './highlightCommentedNodes'
import highlightSpiderableNodes from './highlightSpiderableNodes'

/**
 * Highlight spiderable node borders
 * @return { undefined }
 */
const addNodesBorders = () => {
  if (window.location.pathname === ROUTE_NOTES) {
    highlightCommentedNodes()
  } else {
    highlightSpiderableNodes()
  }
}

export default addNodesBorders
