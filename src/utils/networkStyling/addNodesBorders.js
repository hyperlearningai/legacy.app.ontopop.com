import { SIDEBAR_VIEW_NOTES } from '../../constants/views'
import store from '../../store'
import highlightCommentedNodes from './highlightCommentedNodes'
import highlightSpiderableNodes from './highlightSpiderableNodes'

/**
 * Highlight spiderable node borders
 * @param  {Object}   params
 * @param  {String}   params.node           Node object
 * @return { undefined }
 */
const addNodesBorders = () => {
  const {
    sidebarView,
  } = store.getState()

  if (sidebarView === SIDEBAR_VIEW_NOTES) {
    highlightCommentedNodes()
  } else {
    highlightSpiderableNodes()
  }
}

export default addNodesBorders
