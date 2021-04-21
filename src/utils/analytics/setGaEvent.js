import store from '../../store'

const setGaEvent = ({ action, params }) => {
  const {
    uniqueFingerprint
  } = store.getState()

  if (!uniqueFingerprint) return false

  // eslint-disable-next-line
  gtag('event', action, params)
}

export default setGaEvent
