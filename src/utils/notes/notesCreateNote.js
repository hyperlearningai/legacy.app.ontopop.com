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

/**
 * Get graph data from API
 * @param  {Object}   params
 * @param  {String}   params.type                       Element type
 * @param  {String}   params.selectedElement            Selected node/edge ID
 * @param  {String}   params.noteText                   Note Text
 * @param  {Function} params.addNumber                  addNumber action
 * @param  {Function} params.setStoreState              setStoreState action
 * @param  {Function} params.t                          i18n translation function
 * @return {undefined}
 */
const notesCreateNote = async ({
  type,
  selectedElement,
  noteText,
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
    route = POST_CREATE_NODE_NOTE.replace('{node_id}', selectedElement)
  } else if (type === 'edge') {
    route = POST_CREATE_EDGE_NOTE.replace('{edge_id}', selectedElement)
  } else {
    route = POST_CREATE_GRAPH_NOTE
  }

  const response = await httpCall({
    addNumber,
    setStoreState,
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

  const modifiedNotes = notes.slice()
  modifiedNotes.push(data)

  setStoreState('notes', modifiedNotes)

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
