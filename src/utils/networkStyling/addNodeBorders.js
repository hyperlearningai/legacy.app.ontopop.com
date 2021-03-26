import { SIDEBAR_VIEW_NOTES } from '../../constants/views'
import store from '../../store'
import highlightCommentedNode from './highlightCommentedNode'
import highlightSpiderableNode from './highlightSpiderableNode'

/**
 * Highlight spiderable node borders
 * @param  {Object}   params
 * @param  {Object}   params.node           Node object
 * @return { undefined }
 */
const addNodeBorders = ({
  node
}) => {
  const {
    sidebarView,
  } = store.getState()

  if (sidebarView === SIDEBAR_VIEW_NOTES) {
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
