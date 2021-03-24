import httpCall from '../../../utils/apiCalls/httpCall'
import en from '../../../i18n/en'
import synonymsDeleteSynonym from '../../../utils/synonyms/synonymsDeleteSynonym'
import showNotification from '../../../utils/notifications/showNotification'
import store from '../../../store'
import { OPERATION_TYPE_UPDATE } from '../../../constants/store'

const updateStoreValue = jest.fn()
const t = (id) => en[id]

jest.mock('../../../utils/apiCalls/httpCall')
jest.mock('../../../utils/notifications/showNotification')

const synonymMock = {
  id: 1,
  userId: 'username@domain.tld',
  synonym: 'example text',
  dateCreated: '2021-12-12 10:10:10',
  dateLastUpdated: '2021-12-12 10:10:10'
}

describe('synonymsDeleteSynonym', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when error', async () => {
    httpCall.mockImplementationOnce(() => ({ error: true }))

    await synonymsDeleteSynonym({
      selectedElement: null,
      selectedSynonymID: 42,
      updateStoreValue,
      t
    })

    expect(showNotification).toHaveBeenCalledWith(
      {
        message: 'Could not delete a synonym!',
        type: 'warning'
      }
    )
  })

  it('should work correctly', async () => {
    const mockSynonymsBefore = [{ ...synonymMock }, { ...synonymMock, id: 2 }]
    const mockSynonymsAfter = [{ ...synonymMock, id: 2 }]

    httpCall.mockImplementationOnce(() => ({
      data: { message: 'Synonym Deleted' }
    }))

    store.getState = jest.fn().mockImplementation(() => ({
      nodesSynonyms: mockSynonymsBefore,
      user: { token: '123' }
    }))

    await synonymsDeleteSynonym({
      selectedElement: null,
      selectedSynonymID: 1,
      updateStoreValue,
      t
    })

    expect(showNotification).toHaveBeenCalledWith(
      { message: 'Synonym Deleted', type: 'success' }
    )
    expect(updateStoreValue).toHaveBeenCalledWith(['nodesSynonyms'], OPERATION_TYPE_UPDATE, mockSynonymsAfter)
  })
})
