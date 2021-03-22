import httpCall from '../../../utils/apiCalls/httpCall'
import en from '../../../i18n/en'
import synonymsGetSynonyms from '../../../utils/synonyms/synonymsGetSynonyms'
import showNotification from '../../../utils/notifications/showNotification'

const setStoreState = jest.fn()
const addNumber = jest.fn()
const t = (id) => en[id]
jest.mock('../../../utils/apiCalls/httpCall')
jest.mock('../../../utils/notifications/showNotification')

describe('synonymsGetSynonyms', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when error', async () => {
    httpCall.mockImplementationOnce(() => ({ error: true }))

    await synonymsGetSynonyms({
      selectedElement: null,
      addNumber,
      setStoreState,
      t
    })

    expect(showNotification).toHaveBeenCalledWith(
      { message: 'Could not query synonyms!', type: 'warning' }
    )
  })

  it('should work correctly', async () => {
    httpCall.mockImplementationOnce(() => ({
      data: [{
        id: 1,
        userId: 'username@domain.tld',
        synonym: 'My first synonym',
        dateCreated: 'yyyy-MM-dd HH:mm:ss',
        dateLastUpdated: 'yyyy-MM-dd HH:mm:ss'
      }]
    }))

    await synonymsGetSynonyms({
      selectedElement: null,
      addNumber,
      setStoreState,
      t
    })

    expect(setStoreState).toHaveBeenCalledWith(
      'nodesSynonyms', [{
        synonym: 'My first synonym',
        dateCreated: 'yyyy-MM-dd HH:mm:ss',
        dateLastUpdated: 'yyyy-MM-dd HH:mm:ss',
        id: 1,
        userId: 'username@domain.tld'
      }]
    )
  })
})
