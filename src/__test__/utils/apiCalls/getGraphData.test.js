import axios from 'axios'
import store from '../../../store'
import getGraphData from '../../../utils/apiCalls/getGraphData'
import en from '../../../i18n/en'
import setClassesFromApi from '../../../utils/apiCalls/setClassesFromApi'
import setObjectPropertiesFromApi from '../../../utils/apiCalls/setObjectPropertiesFromApi'
import getTriplesFromApi from '../../../utils/apiCalls/getTriplesFromApi'
import setAnnotationProperties from '../../../utils/apiCalls/setAnnotationProperties'
import showNotification from '../../../utils/notifications/showNotification'

const t = (id) => en[id]
const setStoreState = jest.fn()

store.getState = jest.fn().mockImplementation(() => ({
  user: { token: 'ewj123' }
}))

jest.mock('../../../utils/apiCalls/setClassesFromApi')
jest.mock('../../../utils/apiCalls/setObjectPropertiesFromApi')
jest.mock('../../../utils/apiCalls/getTriplesFromApi')
jest.mock('../../../utils/apiCalls/setAnnotationProperties')
jest.mock('../../../utils/notifications/showNotification')

describe('getGraphData', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should catch error', async () => {
    axios.get = jest.fn().mockImplementationOnce(() => new Error('error'))

    await getGraphData({
      setStoreState,
      t
    })

    expect(showNotification).toHaveBeenCalledWith({
      message: 'Could not query graph!',
      type: 'warning'
    })
    expect(setStoreState.mock.calls).toEqual(
      [['loading', true], ['loading', false]]
    )
  })

  it('should return error if status 400 and no data', async () => {
    axios.get = jest.fn().mockImplementationOnce(() => ({
      status: 400,
    }))

    await getGraphData({
      setStoreState,
      t
    })

    expect(showNotification).toHaveBeenCalledWith({
      message: 'Could not query graph!',
      type: 'warning'
    })
    expect(setStoreState.mock.calls).toEqual(
      [['loading', true], ['loading', false]]
    )
  })

  it('should return error if missing nodes', async () => {
    axios.get = jest.fn().mockImplementationOnce(() => ({
      status: 200,
      data: {
        edges: []
      }
    }))

    await getGraphData({
      setStoreState,
      t
    })

    expect(showNotification).toHaveBeenCalledWith({
      message: 'Could not query graph!',
      type: 'warning'
    })
    expect(setStoreState.mock.calls).toEqual(
      [['loading', true], ['loading', false]]
    )
  })

  it('should return data', async () => {
    const nodes = {
      1: {
        id: 1
      }
    }

    axios.get = jest.fn().mockImplementationOnce(() => ({
      status: 200,
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
      setStoreState,
      t
    })

    expect(setStoreState.mock.calls).toEqual(
      [['loading', true], ['loading', false]]
    )
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
