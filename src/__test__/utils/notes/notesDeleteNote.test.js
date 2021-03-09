import httpCall from '../../../utils/apiCalls/httpCall'
import en from '../../../i18n/en'
import notesDeleteNote from '../../../utils/notes/notesDeleteNote'
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

    await notesDeleteNote({
      type: 'graph',
      selectedElement: null,
      selectedNoteID: 42,
      addNumber,
      setStoreState,
      t
    })

    expect(showNotification).toHaveBeenCalledWith(
      {
        message: 'Could not delete a note!',
        type: 'warning'
      }
    )
  })

  it('should work correctly when no data', async () => {
    httpCall.mockImplementationOnce(() => ({ data: {} }))

    await notesDeleteNote({
      type: 'graph',
      selectedElement: null,
      selectedNoteID: 2,
      addNumber,
      setStoreState,
      t
    })
  })

  it('should work correctly', async () => {
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
      setStoreState,
      t
    })

    expect(setStoreState.mock.calls).toEqual([['notes', mockNotesAfter]])
  })
})
