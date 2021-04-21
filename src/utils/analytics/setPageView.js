import { GA_ID } from '../../constants/analytics'
import store from '../../store'
import getVisitorId from './getVisitorId'

const setPageView = ({
  url,
  updateStoreValue
}) => {
  const {
    uniqueFingerprint
  } = store.getState()

  // eslint-disable-next-line
  if (!gtag) return false

  if (!uniqueFingerprint) {
    return getVisitorId({ updateStoreValue })
  }

  // eslint-disable-next-line
    gtag('config', GA_ID, {
    page_path: url,
    client_storage: 'none',
    client_id: uniqueFingerprint,
    anonymize_ip: true
  })
}

export default setPageView
