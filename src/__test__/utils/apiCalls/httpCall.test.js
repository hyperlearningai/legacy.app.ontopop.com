import axios from 'axios'
import store from '../../../store'
import httpCall from '../../../utils/apiCalls/httpCall'
import en from '../../../i18n/en'

const t = (id) => en[id]
const addNumber = jest.fn()

store.getState = jest.fn().mockImplementation(() => ({
  user: { token: 'ewj123' }
}))

jest.mock('../../../utils/apiCalls/setClassesFromApi')
jest.mock('../../../utils/apiCalls/setObjectPropertiesFromApi')
jest.mock('../../../utils/apiCalls/getTriplesFromApi')
jest.mock('../../../utils/apiCalls/setAnnotationProperties')
jest.mock('../../../utils/notifications/showNotification')

describe('httpCall', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should catch error', async () => {
    axios.get = jest.fn().mockImplementationOnce(() => new Error('error'))

    const body = undefined
    const route = 'http://test.test'
    const method = 'get'
    const withAuth = false

    const response = await httpCall({
      addNumber,
      withAuth,
      body,
      route,
      method,
      t
    })

    expect(addNumber.mock.calls).toEqual(
      [['activeLoaders', 1], ['activeLoaders', -1]]
    )
    expect(response).toEqual(
      { error: 'Invalid http request' }
    )
  })

  it('should return error if status 400 and no data', async () => {
    axios.get = jest.fn().mockImplementationOnce(() => ({
      status: 400,
    }))

    const body = undefined
    const route = 'http://test.test'
    const method = 'get'
    const withAuth = false

    const response = await httpCall({
      addNumber,
      withAuth,
      body,
      route,
      method,
      t
    })

    expect(addNumber.mock.calls).toEqual(
      [['activeLoaders', 1], ['activeLoaders', -1]]
    )
    expect(response).toEqual(
      { error: 'Invalid http request' }
    )
  })

  it('should return data when get request', async () => {
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

    const body = undefined
    const route = 'http://test.test'
    const method = 'get'
    const withAuth = false

    const response = await httpCall({
      addNumber,
      withAuth,
      body,
      route,
      method,
      t
    })

    expect(addNumber.mock.calls).toEqual(
      [['activeLoaders', 1], ['activeLoaders', -1]]
    )
    expect(response).toEqual(
      { data: { edges: '{}', nodes: '{"1":{"id":1}}' } }
    )
  })

  it('should return data when post request', async () => {
    axios.post = jest.fn().mockImplementationOnce(() => ({
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

    const body = { email: 'test@test.com' }
    const route = 'http://test.test'
    const method = 'post'
    const withAuth = true

    const response = await httpCall({
      addNumber,
      withAuth,
      body,
      route,
      method,
      t
    })

    expect(addNumber.mock.calls).toEqual(
      [['activeLoaders', 1], ['activeLoaders', -1]]
    )
    expect(response).toEqual(
      { data: { edges: '{}', nodes: '{"1":{"id":1}}' } }
    )
  })
})
