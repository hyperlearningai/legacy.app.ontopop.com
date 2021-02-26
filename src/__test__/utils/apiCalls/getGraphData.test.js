import axios from 'axios'
import { store } from 'react-notifications-component'
import getGraphData from '../../../utils/apiCalls/getGraphData'
import en from '../../../i18n/en'
import setClassesFromApi from '../../../utils/apiCalls/setClassesFromApi'
import setObjectPropertiesFromApi from '../../../utils/apiCalls/setObjectPropertiesFromApi'
import getTriplesFromApi from '../../../utils/apiCalls/getTriplesFromApi'
import setAnnotationProperties from '../../../utils/apiCalls/setAnnotationProperties'

const t = (id) => en[id]
const setStoreState = jest.fn()
const addNotification = jest.fn()
store.addNotification = addNotification

jest.mock('../../../utils/apiCalls/setClassesFromApi')
jest.mock('../../../utils/apiCalls/setObjectPropertiesFromApi')
jest.mock('../../../utils/apiCalls/getTriplesFromApi')
jest.mock('../../../utils/apiCalls/setAnnotationProperties')

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

    expect(addNotification).toHaveBeenCalledWith({
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      container: 'bottom-left',
      dismiss: { duration: 3000, onScreen: true },
      insert: 'top',
      message: 'Could not query graph!',
      title: '',
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

    expect(addNotification).toHaveBeenCalledWith({
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      container: 'bottom-left',
      dismiss: { duration: 3000, onScreen: true },
      insert: 'top',
      message: 'Could not query graph!',
      title: '',
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

    expect(addNotification).toHaveBeenCalledWith({
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      container: 'bottom-left',
      dismiss: { duration: 3000, onScreen: true },
      insert: 'top',
      message: 'Could not query graph!',
      title: '',
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
