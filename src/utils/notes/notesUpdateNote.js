import {
  NOTIFY_WARNING
} from '../../constants/notifications'
import showNotification from '../notifications/showNotification'
import {
  PATCH_UPDATE_EDGE_NOTE, PATCH_UPDATE_GRAPH_NOTE, PATCH_UPDATE_NODE_NOTE
} from '../../constants/api'
import store from '../../store'
import httpCall from '../apiCalls/httpCall'

/**
 * Get graph data from API
 * @param  {Object}   params
 * @param  {String}   params.type                       Element type
 * @param  {String}   params.selectedElement            Selected node/edge ID
 * @param  {String}   params.selectedNoteID             Selected note ID
 * @param  {Function} params.addNumber                  addNumber action
 * @param  {Function} params.setStoreState              setStoreState action
 * @param  {Function} params.t                          i18n translation function
 * @return {undefined}
 */
const notesUpdateNote = async ({
  type,
  selectedElement,
  selectedNoteID,
  noteText,
  addNumber,
  setStoreState,
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
    route = PATCH_UPDATE_NODE_NOTE.replace('{node_id}', selectedElement).replace('{id}', selectedNoteID)
    modifiedNotes = nodesNotes.slice()
    notesState = 'nodesNotes'
  } else if (type === 'edge') {
    route = PATCH_UPDATE_EDGE_NOTE.replace('{edge_id}', selectedElement).replace('{id}', selectedNoteID)
    modifiedNotes = edgesNotes.slice()
    notesState = 'edgesNotes'
  } else {
    route = PATCH_UPDATE_GRAPH_NOTE.replace('{id}', selectedNoteID)
    modifiedNotes = notes.slice()
    notesState = 'notes'
  }

  const response = await httpCall({
    addNumber,
    setStoreState,
    withAuth,
    route,
    method: 'patch',
    body: {
      contents: noteText
    },
    t
  })

  const {
    error,
    data
  } = response

  if (error || !data.id) {
    return showNotification({
      message: t('couldNotUpdateNote'),
      type: NOTIFY_WARNING
    })
  }

  const updatedNotes = modifiedNotes.map((note) => (note.id === data.id ? data : note))
  setStoreState(notesState, updatedNotes)
}

export default notesUpdateNote
