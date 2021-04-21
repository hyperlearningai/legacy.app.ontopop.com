import { USERBACK_COOKIE } from '../../constants/analytics'
import { ANALYTICS_COOKIE, PREFERENCES_COOKIES } from '../../constants/localStorage'
import { OPERATION_TYPE_UPDATE } from '../../constants/store'
import checkLocalStorageAndUpdateStore from './checkLocalStorageAndUpdateStore'

/**
 * Check cookies and cookie bar visibility at startup
 * @param  {Object}   params
 * @param  {Function} params.updateStoreValue   updateStoreValue action
 * @return { undefined }
 */
const checkCookiesAtStartup = ({
  updateStoreValue,
}) => {
  const isAnalyticsCookieUndefined = checkLocalStorageAndUpdateStore({
    updateStoreValue,
    name: ANALYTICS_COOKIE,
    state: 'isAnalyticsCookie',
  })

  if (!isAnalyticsCookieUndefined) {
    localStorage.removeItem(USERBACK_COOKIE)
  }

  const isPreferencesCookieUndefined = checkLocalStorageAndUpdateStore({
    updateStoreValue,
    name: PREFERENCES_COOKIES,
    state: 'isPreferencesCookie',
  })

  const isCookieBarVisible = isAnalyticsCookieUndefined || isPreferencesCookieUndefined

  if (!isCookieBarVisible) {
    return false
  }

  updateStoreValue(['isCookieBarOpen'], OPERATION_TYPE_UPDATE, true)
}

export default checkCookiesAtStartup
