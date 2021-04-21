/* eslint no-restricted-globals : 0 */
import murmur from 'murmurhash-js'
import { OPERATION_TYPE_UPDATE } from '../../constants/store'

/**
 * Get visitor unique id
 * @param  {Object}   params
 * @param  {Function} params.updateStoreValue             updateStoreValue action
 * @return { undefined }
 */
const getVisitorId = ({
  updateStoreValue
}) => {
  if (window.doNotTrack || navigator.doNotTrack || navigator.msDoNotTrack || (
    window && window.external && window.external.msTrackingProtectionEnabled)) {
    if (
      window.doNotTrack === '1'
      || (
        navigator.doNotTrack && (
          navigator.doNotTrack === 'yes'
          || navigator.doNotTrack === '1'
        )
      )
      || (navigator.msDoNotTrack && navigator.msDoNotTrack === '1')
      || (window.external && window.external.msTrackingProtectionEnabled())
    ) {
      return false// Do Not Track is enabled!
    }
  }

  let uuid = ''

  const {
    userAgent,
    plugins,
    connection,
    userAgentData
  } = navigator

  uuid += userAgent // .replace(/\D+/g, '')
  uuid += plugins.length || ''

  if (connection) {
    uuid += connection.downlink || ''
    uuid += connection.effectiveType || ''
    uuid += connection.rtt || ''
  }

  if (userAgentData && userAgentData.brands && userAgentData.brands.length) {
    userAgentData.brands.forEach((data) => {
      uuid += data.brand || ''
      uuid += data.version || ''
    })
  }

  if (screen) {
    uuid += screen.height || ''
    uuid += screen.width || ''
    uuid += screen.pixelDepth || ''
  }

  if (platform) {  //eslint-disable-line
    uuid += platform.layout || '' //eslint-disable-line
  }

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  uuid += timezone

  const seed = 256
  const id = murmur.murmur3(uuid, seed)
  updateStoreValue(['uniqueFingerprint'], OPERATION_TYPE_UPDATE, id)
}

export default getVisitorId
