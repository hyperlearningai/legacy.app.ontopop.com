import httpCall from '../../../utils/apiCalls/httpCall'
import en from '../../../i18n/en'
import synonymsUpdateSynonym from '../../../utils/synonyms/synonymsUpdateSynonym'
import showNotification from '../../../utils/notifications/showNotification'
import store from '../../../store'

const setStoreState = jest.fn()
const addNumber = jest.fn()
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

describe('synonymsUpdateSynonym', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly when error', async () => {
    httpCall.mockImplementationOnce(() => ({ error: true }))

    await synonymsUpdateSynonym({
      selectedElement: null,
      selectedSynonymID: 42,
      synonymText: 'example text',
      addNumber,
      setStoreState,
      t
    })

    expect(showNotification).toHaveBeenCalledWith(
      {
        message: 'Could not update a synonym!',
        type: 'warning'
      }
    )
  })

  it('should work correctly when no data', async () => {
    httpCall.mockImplementationOnce(() => ({ data: {} }))

    await synonymsUpdateSynonym({
      selectedElement: null,
      selectedSynonymID: 42,
      synonymText: 'example text',
      addNumber,
      setStoreState,
      t
    })

    expect(showNotification).toHaveBeenCalledWith(
      {
        message: 'Could not update a synonym!',
        type: 'warning'
      }
    )
  })

  it('should work correctly', async () => {
    const mockSynonymsBefore = [{ ...synonymMock, synonym: 'before change' }, { ...synonymMock, id: 2 }]
    const mockSynonymsAfter = [{ ...synonymMock, synonym: 'after change' }, { ...synonymMock, id: 2 }]

    httpCall.mockImplementationOnce(() => ({
      data: { ...synonymMock, synonym: 'after change' }
    }))

    store.getState = jest.fn().mockImplementation(() => ({
      synonyms: mockSynonymsBefore,
      nodesSynonyms: mockSynonymsBefore,
      edgesSynonyms: mockSynonymsBefore,
      user: { token: '123' }
    }))

    await synonymsUpdateSynonym({
      selectedElement: null,
      selectedSynonymID: 1,
      synonymText: 'after change',
      addNumber,
      setStoreState,
      t
    })

    expect(setStoreState.mock.calls).toEqual([['nodesSynonyms', mockSynonymsAfter]])
  })
})
