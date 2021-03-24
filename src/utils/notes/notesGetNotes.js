import {
  NOTIFY_WARNING
} from '../../constants/notifications'
import showNotification from '../notifications/showNotification'
import {
  GET_EDGE_NOTES,
  GET_EDGES_NOTES,
  GET_GRAPH_NOTES,
  GET_NODE_NOTES,
  GET_NODES_NOTES
} from '../../constants/api'
import store from '../../store'
import httpCall from '../apiCalls/httpCall'
import { OPERATION_TYPE_UPDATE } from '../../constants/store'

/**
 * Get graph data from API
 * @param  {Object}   params
 * @param  {String}   params.type                       Element type
 * @param  {String}   params.selectedElement            Selected node/edge ID
 * @param  {Function} params.updateStoreValue           updateStoreValue action
 * @param  {Function} params.t                          i18n translation function
 * @return {undefined}
 */
const notesGetNotes = async ({
  type,
  selectedElement,
  updateStoreValue,
  t
}) => {
  const {
    user
  } = store.getState()

  const withAuth = !!user.token

  let route
  let notesState

  if (type === 'node') {
    route = selectedElement ? GET_NODE_NOTES.replace('{node_id}', selectedElement) : GET_NODES_NOTES
    notesState = 'nodesNotes'
  } else if (type === 'edge') {
    route = selectedElement ? GET_EDGE_NOTES.replace('{edge_id}', selectedElement) : GET_EDGES_NOTES
    notesState = 'edgesNotes'
  } else {
    route = GET_GRAPH_NOTES
    notesState = 'notes'
  }

  const response = await httpCall({
    updateStoreValue,
    withAuth,
    route,
    method: 'get',
    t
  })

  const {
    error,
    data
  } = response

  if (error) {
    return showNotification({
      message: t('couldNotQueryNotes'),
      type: NOTIFY_WARNING
    })
  }

  updateStoreValue([notesState], OPERATION_TYPE_UPDATE, data)
}

export default notesGetNotes
