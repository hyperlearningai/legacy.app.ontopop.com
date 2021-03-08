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

const notesDeleteNote = async ({
  type,
  selectedElement,
  selectedNoteID,
  addNumber,
  setStoreState,
  t
}) => {
  const {
    user,
    notes
  } = store.getState()

  const withAuth = !!user.token

  let route

  if (type === 'node') {
    route = DELETE_NODE_NOTE.replace('{node_id}', selectedElement).replace('{id}', selectedNoteID)
  } else if (type === 'edge') {
    route = DELETE_EDGE_NOTE.replace('{edge_id}', selectedElement).replace('{id}', selectedNoteID)
  } else {
    route = DELETE_GRAPH_NOTE.replace('{id}', selectedNoteID)
  }

  const response = await httpCall({
    addNumber,
    setStoreState,
    withAuth,
    route,
    method: 'delete',
    t
  })

  const {
    error,
    data
  } = response

  const dataIndex = notes.findIndex((note) => note.id === selectedNoteID)
  const modifiedNotes = notes.slice()

  modifiedNotes.splice(dataIndex, 1)

  setStoreState('notes', modifiedNotes)

  if (data.message) {
    return showNotification({
      message: data.message,
      type: NOTIFY_SUCCESS
    })
  }

  if (error) {
    return showNotification({
      message: t('couldNotQueryNotes'),
      type: NOTIFY_WARNING
    })
  }
}

export default notesDeleteNote
