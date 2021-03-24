import {
  NOTIFY_SUCCESS,
  NOTIFY_WARNING
} from '../../constants/notifications'
import showNotification from '../notifications/showNotification'
import {
  POST_CREATE_EDGE_NOTE, POST_CREATE_GRAPH_NOTE, POST_CREATE_NODE_NOTE
} from '../../constants/api'
import store from '../../store'
import httpCall from '../apiCalls/httpCall'
import { OPERATION_TYPE_UPDATE } from '../../constants/store'

/**
 * Get graph data from API
 * @param  {Object}   params
 * @param  {String}   params.type                       Element type
 * @param  {String}   params.selectedElement            Selected node/edge ID
 * @param  {String}   params.noteText                   Note Text
 * @param  {Function} params.updateStoreValue           updateStoreValue action
 * @param  {Function} params.t                          i18n translation function
 * @return {undefined}
 */
const notesCreateNote = async ({
  type,
  selectedElement,
  noteText,
  updateStoreValue,
  t
}) => {
  const {
    user,
    notes,
    nodesNotes,
    edgesNotes
  } = store.getState()

  const withAuth = !!user.token

  let route
  let modifiedNotes
  let notesState

  if (type === 'node') {
    route = POST_CREATE_NODE_NOTE.replace('{node_id}', selectedElement)
    modifiedNotes = nodesNotes.slice()
    notesState = 'nodesNotes'
  } else if (type === 'edge') {
    route = POST_CREATE_EDGE_NOTE.replace('{edge_id}', selectedElement)
    modifiedNotes = edgesNotes.slice()
    notesState = 'edgesNotes'
  } else {
    route = POST_CREATE_GRAPH_NOTE
    modifiedNotes = notes.slice()
    notesState = 'notes'
  }

  const response = await httpCall({
    updateStoreValue,
    withAuth,
    route,
    method: 'post',
    body: {
      contents: noteText
    },
    t
  })

  const {
    error,
    data
  } = response

  modifiedNotes.push(data)

  updateStoreValue([notesState], OPERATION_TYPE_UPDATE, modifiedNotes)

  if (error) {
    return showNotification({
      message: t('couldNotCreateNote'),
      type: NOTIFY_WARNING
    })
  }

  if (data) {
    return showNotification({
      message: t('noteCreated'),
      type: NOTIFY_SUCCESS
    })
  }
}

export default notesCreateNote
