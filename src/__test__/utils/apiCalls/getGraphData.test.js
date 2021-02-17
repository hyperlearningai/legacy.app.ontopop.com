import axios from 'axios'
import { store } from 'react-notifications-component'
import getGraphData from '../../../utils/apiCalls/getGraphData'
import en from '../../../i18n/en'

const t = (id) => en[id]
const setStoreState = jest.fn()
const addNotification = jest.fn()
store.addNotification = addNotification

describe('getGraphData', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should catch error', async () => {
    axios.get = jest.fn().mockImplementationOnce(() => new Error('error'))

    const output = await getGraphData({
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
    expect(output).toEqual({ classes: [], objectProperties: [] })
  })

  it('should return error if status 400 and no data', async () => {
    axios.get = jest.fn().mockImplementationOnce(() => ({
      status: 400,
    }))

    const output = await getGraphData({
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
    expect(output).toEqual({ classes: [], objectProperties: [] })
  })

  it('should return data', async () => {
    axios.get = jest.fn().mockImplementationOnce(() => ({
      status: 200,
      data: {
        owlClassMap: [],
        owlObjectPropertyMap: []
      }
    }))

    const output = await getGraphData({
      setStoreState,
      t
    })

    expect(setStoreState.mock.calls).toEqual(
      [['loading', true], ['loading', false]]
    )
    expect(output).toEqual({ classes: [], objectProperties: [] })
  })
})
