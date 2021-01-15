import { store } from 'react-notifications-component'

/**
 * Show notification
 * @param  {Object}   params
 * @param  {String}   params.message    message to display
 * @param  {String}   params.type       message type (warning|success|danger)
 * @return
 */
const showNotification = ({
  message,
  type
}) => store.addNotification({
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

export default showNotification
