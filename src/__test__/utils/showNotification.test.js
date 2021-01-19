import { store } from 'react-notifications-component'
import showNotification from '../../utils/showNotification'
import { NOTIFY_SUCCESS } from '../../constants/notifications'

const addNotification = jest.fn()
store.addNotification = addNotification

describe('showNotification', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should work correctly', async () => {
    const message = 'test'
    const type = NOTIFY_SUCCESS

    await showNotification({
      message,
      type
    })

    expect(addNotification).toHaveBeenCalledWith({
      title: '',
      message,
      type,
      insert: 'top',
      container: 'bottom-left',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: {
        duration: 3000,
        onScreen: true
      }
    })
  })
})
