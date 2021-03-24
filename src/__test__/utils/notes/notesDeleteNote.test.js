import httpCall from '../../../utils/apiCalls/httpCall'
import en from '../../../i18n/en'
import notesDeleteNote from '../../../utils/notes/notesDeleteNote'
import showNotification from '../../../utils/notifications/showNotification'
import store from '../../../store'
import { OPERATION_TYPE_UPDATE } from '../../../constants/store'

const updateStoreValue = jest.fn()
const addNumber = jest.fn()
const t = (id) => en[id]

jest.mock('../../../utils/apiCalls/httpCall')
jest.mock('../../../utils/notifications/showNotification')

const noteMock = {
  id: 1,
  type: 'graph',
  userId: 'username@domain.tld',
  contents: 'example text',
  dateCreated: '2021-12-12 10:10:10',
  dateLastUpdated: '2021-12-12 10:10:10'
}

describe('notesDeleteNote', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when error', async () => {
    httpCall.mockImplementationOnce(() => ({ error: true }))

    await notesDeleteNote({
      type: 'graph',
      selectedElement: null,
      selectedNoteID: 42,
      addNumber,
      updateStoreValue,
      t
    })

    expect(showNotification).toHaveBeenCalledWith(
      {
        message: 'Could not delete a note!',
        type: 'warning'
      }
    )
  })

  it('should work correctly when graph type', async () => {
    const mockNotesBefore = [{ ...noteMock }, { ...noteMock, id: 2 }]
    const mockNotesAfter = [{ ...noteMock, id: 2 }]

    httpCall.mockImplementationOnce(() => ({
      data: { message: 'Note Deleted' }
    }))

    store.getState = jest.fn().mockImplementation(() => ({
      notes: mockNotesBefore,
      user: { token: '123' }
    }))

    await notesDeleteNote({
      type: 'graph',
      selectedElement: null,
      selectedNoteID: 1,
      addNumber,
      updateStoreValue,
      t
    })

    expect(showNotification).toHaveBeenCalledWith(
      { message: 'Note Deleted', type: 'success' }
    )
    expect(updateStoreValue).toHaveBeenCalledWith(['notes'], OPERATION_TYPE_UPDATE, mockNotesAfter)
  })

  it('should work correctly when node type', async () => {
    const mockNotesBefore = [{ ...noteMock }, { ...noteMock, id: 2 }]
    const mockNotesAfter = [{ ...noteMock, id: 2 }]

    httpCall.mockImplementationOnce(() => ({
      data: { message: 'Note Deleted' }
    }))

    store.getState = jest.fn().mockImplementation(() => ({
      nodesNotes: mockNotesBefore,
      user: { token: '123' }
    }))

    await notesDeleteNote({
      type: 'node',
      selectedElement: null,
      selectedNoteID: 1,
      addNumber,
      updateStoreValue,
      t
    })

    expect(showNotification).toHaveBeenCalledWith(
      { message: 'Note Deleted', type: 'success' }
    )
    expect(updateStoreValue).toHaveBeenCalledWith(['nodesNotes'], OPERATION_TYPE_UPDATE, mockNotesAfter)
  })

  it('should work correctly when edge type', async () => {
    const mockNotesBefore = [{ ...noteMock }, { ...noteMock, id: 2 }]
    const mockNotesAfter = [{ ...noteMock, id: 2 }]

    httpCall.mockImplementationOnce(() => ({
      data: { message: 'Note Deleted' }
    }))

    store.getState = jest.fn().mockImplementation(() => ({
      edgesNotes: mockNotesBefore,
      user: { token: '123' }
    }))

    await notesDeleteNote({
      type: 'edge',
      selectedElement: null,
      selectedNoteID: 1,
      addNumber,
      updateStoreValue,
      t
    })

    expect(showNotification).toHaveBeenCalledWith(
      { message: 'Note Deleted', type: 'success' }
    )
    expect(updateStoreValue).toHaveBeenCalledWith(['edgesNotes'], OPERATION_TYPE_UPDATE, mockNotesAfter)
  })
})
