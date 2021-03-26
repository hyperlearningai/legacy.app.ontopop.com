import httpCall from '../../../utils/apiCalls/httpCall'
import en from '../../../i18n/en'
import notesUpdateNote from '../../../utils/notes/notesUpdateNote'
import showNotification from '../../../utils/notifications/showNotification'
import store from '../../../store'
import { OPERATION_TYPE_UPDATE } from '../../../constants/store'

const updateStoreValue = jest.fn()
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

describe('notesUpdateNote', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when error', async () => {
    httpCall.mockImplementationOnce(() => ({ error: true }))

    await notesUpdateNote({
      type: 'graph',
      selectedElement: null,
      selectedNoteID: 42,
      noteText: 'example text',
      updateStoreValue,
      t
    })

    expect(showNotification).toHaveBeenCalledWith(
      {
        message: 'Could not update a note!',
        type: 'warning'
      }
    )
  })

  it('should work correctly when no data', async () => {
    httpCall.mockImplementationOnce(() => ({ data: {} }))

    await notesUpdateNote({
      type: 'graph',
      selectedElement: null,
      selectedNoteID: 42,
      noteText: 'example text',
      updateStoreValue,
      t
    })

    expect(showNotification).toHaveBeenCalledWith(
      {
        message: 'Could not update a note!',
        type: 'warning'
      }
    )
  })

  it('should work correctly', async () => {
    const mockNotesBefore = [{ ...noteMock, contents: 'before change' }, { ...noteMock, id: 2 }]
    const mockNotesAfter = [{ ...noteMock, contents: 'after change' }, { ...noteMock, id: 2 }]

    httpCall.mockImplementationOnce(() => ({
      data: { ...noteMock, contents: 'after change' }
    }))

    store.getState = jest.fn().mockImplementation(() => ({
      notes: mockNotesBefore,
      nodesNotes: mockNotesBefore,
      edgesNotes: mockNotesBefore,
      user: { token: '123' }
    }))

    await notesUpdateNote({
      type: 'graph',
      selectedElement: null,
      selectedNoteID: 1,
      noteText: 'after change',
      updateStoreValue,
      t
    })

    expect(updateStoreValue.mock.calls).toEqual([[['notes'], OPERATION_TYPE_UPDATE, mockNotesAfter]])
  })

  it('should work correctly when type node', async () => {
    const mockNotesBefore = [{ ...noteMock, contents: 'before change' }, { ...noteMock, id: 2 }]
    const mockNotesAfter = [{ ...noteMock, contents: 'after change' }, { ...noteMock, id: 2 }]

    httpCall.mockImplementationOnce(() => ({
      data: { ...noteMock, contents: 'after change' }
    }))

    store.getState = jest.fn().mockImplementation(() => ({
      notes: mockNotesBefore,
      nodesNotes: mockNotesBefore,
      edgesNotes: mockNotesBefore,
      user: { token: '123' }
    }))

    await notesUpdateNote({
      type: 'node',
      selectedElement: null,
      selectedNoteID: 1,
      noteText: 'after change',
      updateStoreValue,
      t
    })

    expect(updateStoreValue.mock.calls).toEqual([[['nodesNotes'], OPERATION_TYPE_UPDATE, mockNotesAfter]])
  })

  it('should work correctly when type edge', async () => {
    const mockNotesBefore = [{ ...noteMock, contents: 'before change' }, { ...noteMock, id: 2 }]
    const mockNotesAfter = [{ ...noteMock, contents: 'after change' }, { ...noteMock, id: 2 }]

    httpCall.mockImplementationOnce(() => ({
      data: { ...noteMock, contents: 'after change' }
    }))

    store.getState = jest.fn().mockImplementation(() => ({
      notes: mockNotesBefore,
      nodesNotes: mockNotesBefore,
      edgesNotes: mockNotesBefore,
      user: { token: '123' }
    }))

    await notesUpdateNote({
      type: 'edge',
      selectedElement: null,
      selectedNoteID: 1,
      noteText: 'after change',
      updateStoreValue,
      t
    })

    expect(updateStoreValue.mock.calls).toEqual([[['edgesNotes'], OPERATION_TYPE_UPDATE, mockNotesAfter]])
  })
})
