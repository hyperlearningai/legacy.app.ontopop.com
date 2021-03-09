import httpCall from "../../../utils/apiCalls/httpCall";
import en from "../../../i18n/en";
import notesGetNotes from '../../../utils/notes/notesGetNotes'
import {LABEL_PROPERTY, UNIQUE_PROPERTY} from "../../../constants/graph";


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

    notesGetNotes({
      type: 'graph',
      selectedElement: null,
      addNumber,
      setStoreState,
      t
    })
  })

  it('should work correctly when no data', async () => {
    httpCall.mockImplementationOnce(() => ({ data: {} }))

    notesGetNotes({
      type: 'graph',
      selectedElement: null,
      addNumber,
      setStoreState,
      t
    })
  })

  it('should work correctly', async () => {

    httpCall.mockImplementationOnce(() => ({
      data: [{
        "1": {
          "id": 1,
          "type": "graph",
          "userId": "username@domain.tld",
          "contents": "My first note",
          "dateCreated": "yyyy-MM-dd HH:mm:ss",
          "dateLastUpdated": "yyyy-MM-dd HH:mm:ss"
        }
      }]
    }))

    notesGetNotes({
      type: 'graph',
      selectedElement: null,
      addNumber,
      setStoreState,
      t
    })
  })



})

