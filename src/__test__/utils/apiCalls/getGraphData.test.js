import store from '../../../store'
import getGraphData from '../../../utils/apiCalls/getGraphData'
import en from '../../../i18n/en'
import setClassesFromApi from '../../../utils/apiCalls/setClassesFromApi'
import setObjectPropertiesFromApi from '../../../utils/apiCalls/setObjectPropertiesFromApi'
import getTriplesFromApi from '../../../utils/apiCalls/getTriplesFromApi'
import setAnnotationProperties from '../../../utils/apiCalls/setAnnotationProperties'
import showNotification from '../../../utils/notifications/showNotification'
import httpCall from '../../../utils/apiCalls/httpCall'

const t = (id) => en[id]
const updateStoreValue = jest.fn()

store.getState = jest.fn().mockImplementation(() => ({
  user: { token: 'ewj123' }
}))

jest.mock('../../../utils/apiCalls/setClassesFromApi')
jest.mock('../../../utils/apiCalls/setObjectPropertiesFromApi')
jest.mock('../../../utils/apiCalls/getTriplesFromApi')
jest.mock('../../../utils/apiCalls/setAnnotationProperties')
jest.mock('../../../utils/notifications/showNotification')
jest.mock('../../../utils/apiCalls/httpCall')

describe('getGraphData', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should catch error', async () => {
    httpCall.mockImplementationOnce(() => (
      { error: 'apiRequestError' }
    ))

    await getGraphData({
      updateStoreValue,
      t
    })

    expect(showNotification).toHaveBeenCalledWith({
      message: 'Could not query graph!',
      type: 'warning'
    })
  })

  it('should return error if missing nodes', async () => {
    httpCall.mockImplementationOnce(() => ({
      data: {
        edges: []
      }
    }))

    await getGraphData({
      updateStoreValue,
      t
    })

    expect(showNotification).toHaveBeenCalledWith({
      message: 'Could not query graph!',
      type: 'warning'
    })
  })

  it('should return data', async () => {
    const nodes = {
      1: {
        id: 1
      }
    }

    httpCall.mockImplementationOnce(() => ({
      data: {
        nodes: JSON.stringify({
          1: {
            id: 1
          }
        }),
        edges: JSON.stringify({})
      }
    }))

    const getItem = jest.fn().mockImplementationOnce(() => JSON.stringify({
      bearer: '12345'
    }))
    Storage.prototype.getItem = getItem

    await getGraphData({
      updateStoreValue,
      t
    })

    expect(setAnnotationProperties).toHaveBeenCalledWith({
      updateStoreValue,
      nodes
    })
    expect(setClassesFromApi).toHaveBeenCalledWith({
      updateStoreValue,
      nodes
    })
    expect(setObjectPropertiesFromApi).toHaveBeenCalledWith({
      updateStoreValue,
      edges: {}
    })
    expect(getTriplesFromApi).toHaveBeenCalledWith({
      updateStoreValue,
      edges: {}
    })
  })
})
