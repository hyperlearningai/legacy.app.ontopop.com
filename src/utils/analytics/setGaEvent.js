import store from '../../store'

const setGaEvent = ({ action, params }) => {
  const {
    uniqueFingerprint
  } = store.getState()

  if (!uniqueFingerprint) return false

  // eslint-disable-next-line
  if (!window.gtag) return false

  // eslint-disable-next-line
  window.gtag('event', action, params)
}

export default setGaEvent
