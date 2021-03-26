import {
  NOTIFY_SUCCESS,
  NOTIFY_WARNING
} from '../../constants/notifications'
import showNotification from '../notifications/showNotification'
import {
  DELETE_EDGE_NOTE, DELETE_GRAPH_NOTE,
  DELETE_NODE_NOTE,
} from '../../constants/api'
import store from '../../store'
import httpCall from '../apiCalls/httpCall'
import { OPERATION_TYPE_UPDATE } from '../../constants/store'

/**
 * Get graph data from API
 * @param  {Object}   params
 * @param  {String}   params.type                       Element type
 * @param  {String}   params.selectedElement            Selected node/edge ID
 * @param  {String}   params.selectedNoteID             Selected note ID
 * @param  {Function} params.updateStoreValue              updateStoreValue action
 * @param  {Function} params.t                          i18n translation function
 * @return {undefined}
 */

const notesDeleteNote = async ({
  type,
  selectedElement,
  selectedNoteID,
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
    route = DELETE_NODE_NOTE.replace('{node_id}', selectedElement).replace('{id}', selectedNoteID)
    modifiedNotes = nodesNotes.slice()
    notesState = 'nodesNotes'
  } else if (type === 'edge') {
    route = DELETE_EDGE_NOTE.replace('{edge_id}', selectedElement).replace('{id}', selectedNoteID)
    modifiedNotes = edgesNotes.slice()
    notesState = 'edgesNotes'
  } else {
    route = DELETE_GRAPH_NOTE.replace('{id}', selectedNoteID)
    modifiedNotes = notes.slice()
    notesState = 'notes'
  }

  const response = await httpCall({
    updateStoreValue,
    withAuth,
    route,
    method: 'delete',
    t
  })

  const {
    error,
    data
  } = response

  const dataIndex = modifiedNotes.findIndex((note) => note.id.toString() === selectedNoteID.toString())

  modifiedNotes.splice(dataIndex, 1)

  updateStoreValue([notesState], OPERATION_TYPE_UPDATE, modifiedNotes)

  if (data && data.message) {
    return showNotification({
      message: data.message,
      type: NOTIFY_SUCCESS
    })
  }

  if (error) {
    showNotification({
      message: t('couldNotDeleteNote'),
      type: NOTIFY_WARNING
    })
  }
}

export default notesDeleteNote
