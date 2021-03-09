import httpCall from '../../../utils/apiCalls/httpCall'
import en from '../../../i18n/en'
import notesCreateNote from '../../../utils/notes/notesCreateNote'
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

    await notesCreateNote({
      type: 'graph',
      selectedElement: null,
      noteText: 'new note mock text',
      addNumber,
      setStoreState,
      t
    })

    expect(showNotification).toHaveBeenCalledWith(
      {
        message: 'Could not create a note!',
        type: 'warning'
      }
    )
  })

  it('should work correctly when no data', async () => {
    httpCall.mockImplementationOnce(() => ({ data: {} }))

    await notesCreateNote({
      type: 'graph',
      selectedElement: null,
      noteText: 'new note mock text',
      addNumber,
      setStoreState,
      t
    })
  })

  it('should work correctly', async () => {
    const createdMock = { ...noteMock, contents: 'new note mock text', id: 2 }
    const mockNotesBefore = [{ ...noteMock }]
    const mockNotesAfter = [{ ...noteMock }, createdMock]

    httpCall.mockImplementationOnce(() => ({
      data: createdMock
    }))

    store.getState = jest.fn().mockImplementation(() => ({
      notes: mockNotesBefore,
      user: { token: '123' }
    }))

    await notesCreateNote({
      type: 'graph',
      selectedElement: null,
      noteText: 'new note mock text',
      addNumber,
      setStoreState,
      t
    })

    expect(showNotification).toHaveBeenCalledWith(
      {
        message: 'Note Created!',
        type: 'success'
      }
    )

    expect(setStoreState.mock.calls).toEqual([['notes', mockNotesAfter]])
  })
})
