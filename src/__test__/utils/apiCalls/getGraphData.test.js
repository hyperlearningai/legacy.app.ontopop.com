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
const setStoreState = jest.fn()
const addNumber = jest.fn()

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
      addNumber,
      setStoreState,
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
      addNumber,
      setStoreState,
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
      addNumber,
      setStoreState,
      t
    })

    expect(setAnnotationProperties).toHaveBeenCalledWith({
      setStoreState,
      nodes
    })
    expect(setClassesFromApi).toHaveBeenCalledWith({
      setStoreState,
      nodes
    })
    expect(setObjectPropertiesFromApi).toHaveBeenCalledWith({
      setStoreState,
      edges: {}
    })
    expect(getTriplesFromApi).toHaveBeenCalledWith({
      setStoreState,
      edges: {}
    })
  })
})
