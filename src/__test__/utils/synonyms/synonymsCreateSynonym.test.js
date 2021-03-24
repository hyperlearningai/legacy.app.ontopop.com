import httpCall from '../../../utils/apiCalls/httpCall'
import en from '../../../i18n/en'
import synonymsCreateSynonym from '../../../utils/synonyms/synonymsCreateSynonym'
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

describe('synonymsCreateSynonym', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when error', async () => {
    httpCall.mockImplementationOnce(() => ({ error: true }))

    await synonymsCreateSynonym({
      selectedElement: null,
      synonymText: 'new synonym mock text',
      updateStoreValue,
      t
    })

    expect(showNotification).toHaveBeenCalledWith(
      {
        message: 'Could not create a synonym!',
        type: 'warning'
      }
    )
  })

  it('should work correctly', async () => {
    const createdMock = { ...synonymMock, synonym: 'new synonym mock text', id: 2 }
    const mockSynonymsBefore = [{ ...synonymMock }]
    const mockSynonymsAfter = [{ ...synonymMock }, createdMock]

    httpCall.mockImplementationOnce(() => ({
      data: createdMock
    }))

    store.getState = jest.fn().mockImplementation(() => ({
      nodesSynonyms: mockSynonymsBefore,
      user: { token: '123' }
    }))

    await synonymsCreateSynonym({
      selectedElement: null,
      synonymText: 'new synonym mock text',
      updateStoreValue,
      t
    })

    expect(showNotification).toHaveBeenCalledWith(
      {
        message: 'Synonym Created!',
        type: 'success'
      }
    )

    expect(updateStoreValue).toHaveBeenCalledWith(['nodesSynonyms'], OPERATION_TYPE_UPDATE, mockSynonymsAfter)
  })
})
