import httpCall from '../../../utils/apiCalls/httpCall'
import en from '../../../i18n/en'
import notesGetNotes from '../../../utils/notes/notesGetNotes'
import showNotification from '../../../utils/notifications/showNotification'

const setStoreState = jest.fn()
const addNumber = jest.fn()
const t = (id) => en[id]
jest.mock('../../../utils/apiCalls/httpCall')
jest.mock('../../../utils/notifications/showNotification')

describe('notesGetNotes', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when error', async () => {
    httpCall.mockImplementationOnce(() => ({ error: true }))

    await notesGetNotes({
      type: 'graph',
      selectedElement: null,
      addNumber,
      setStoreState,
      t
    })

    expect(showNotification).toHaveBeenCalledWith(
      { message: 'Could not query notes!', type: 'warning' }
    )
  })

  it('should work correctly when graph type', async () => {
    httpCall.mockImplementationOnce(() => ({
      data: [{
        id: 1,
        type: 'graph',
        userId: 'username@domain.tld',
        contents: 'My first note',
        dateCreated: 'yyyy-MM-dd HH:mm:ss',
        dateLastUpdated: 'yyyy-MM-dd HH:mm:ss'
      }]
    }))

    await notesGetNotes({
      type: 'graph',
      selectedElement: null,
      addNumber,
      setStoreState,
      t
    })

    expect(setStoreState).toHaveBeenCalledWith(
      'notes', [{
        contents: 'My first note',
        dateCreated: 'yyyy-MM-dd HH:mm:ss',
        dateLastUpdated: 'yyyy-MM-dd HH:mm:ss',
        id: 1,
        type: 'graph',
        userId: 'username@domain.tld'
      }]
    )
  })

  it('should work correctly when edge type', async () => {
    httpCall.mockImplementationOnce(() => ({
      data: [{
        id: 1,
        type: 'edge',
        userId: 'username@domain.tld',
        contents: 'My first note',
        dateCreated: 'yyyy-MM-dd HH:mm:ss',
        dateLastUpdated: 'yyyy-MM-dd HH:mm:ss'
      }]
    }))

    await notesGetNotes({
      type: 'edge',
      selectedElement: null,
      addNumber,
      setStoreState,
      t
    })

    expect(setStoreState).toHaveBeenCalledWith(
      'edgesNotes', [{
        contents: 'My first note',
        dateCreated: 'yyyy-MM-dd HH:mm:ss',
        dateLastUpdated: 'yyyy-MM-dd HH:mm:ss',
        id: 1,
        type: 'edge',
        userId: 'username@domain.tld'
      }]
    )
  })

  it('should work correctly when node type', async () => {
    httpCall.mockImplementationOnce(() => ({
      data: [{
        id: 1,
        type: 'node',
        userId: 'username@domain.tld',
        contents: 'My first note',
        dateCreated: 'yyyy-MM-dd HH:mm:ss',
        dateLastUpdated: 'yyyy-MM-dd HH:mm:ss'
      }]
    }))

    await notesGetNotes({
      type: 'node',
      selectedElement: null,
      addNumber,
      setStoreState,
      t
    })

    expect(setStoreState).toHaveBeenCalledWith(
      'nodesNotes', [{
        contents: 'My first note',
        dateCreated: 'yyyy-MM-dd HH:mm:ss',
        dateLastUpdated: 'yyyy-MM-dd HH:mm:ss',
        id: 1,
        type: 'node',
        userId: 'username@domain.tld'
      }]
    )
  })
})
