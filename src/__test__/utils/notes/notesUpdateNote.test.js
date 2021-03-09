import httpCall from '../../../utils/apiCalls/httpCall'
import en from '../../../i18n/en'
import notesUpdateNote from '../../../utils/notes/notesUpdateNote'
import showNotification from '../../../utils/notifications/showNotification'
import store from '../../../store'

const setStoreState = jest.fn()
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
      addNumber,
      setStoreState,
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
      addNumber,
      setStoreState,
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
      user: { token: '123' }
    }))

    await notesUpdateNote({
      type: 'graph',
      selectedElement: null,
      selectedNoteID: 1,
      noteText: 'after change',
      addNumber,
      setStoreState,
      t
    })

    expect(setStoreState.mock.calls).toEqual([['notes', mockNotesAfter]])
  })
})
