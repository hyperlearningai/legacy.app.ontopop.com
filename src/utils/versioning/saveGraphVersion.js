import {
  NOTIFY_SUCCESS,
} from '../../constants/notifications'
import showNotification from '../showNotification'
import store from '../../store'
import { GRAPH_VERSIONS_LS } from '../../constants/localStorage'

/**
 * Export graph version data as json or save to server
 * @param  {Object}   params
 * @param  {String}   params.location          Download location ()
 * @param  {Object}   params.selectedVersion   Selected graph version name
 * @param  {Function} params.t                 i18n translation function
 * @return { undefined }
\ */
const saveGraphVersion = async ({
  location,
  selectedVersion,
  t
}) => {
  const {
    graphVersions
  } = store.getState()

  if (location === 'file') {
    const graphJsonData = JSON.stringify(graphVersions[selectedVersion])

    const element = document.createElement('a')
    const file = new Blob([graphJsonData], { type: 'application/json' })
    element.href = URL.createObjectURL(file)
    element.download = `${selectedVersion}.json`
    element.id = 'output'
    element.style.display = 'none'
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)

    return showNotification({
      message: t('fileCanBeDownloaded'),
      type: NOTIFY_SUCCESS,
    })
  }

  // TODO: replace local storage with API call once available
  const currentGraphVersions = localStorage.getItem(GRAPH_VERSIONS_LS)

  let currentGraphVersionsObject = {
    [selectedVersion]: graphVersions[selectedVersion]
  }

  if (currentGraphVersions) {
    const currentGraphAvailableVersions = JSON.parse(currentGraphVersions)

    currentGraphVersionsObject = {
      ...currentGraphAvailableVersions,
      [selectedVersion]: graphVersions[selectedVersion]
    }
  }

  localStorage.setItem(GRAPH_VERSIONS_LS, JSON.stringify(currentGraphVersionsObject))

  return showNotification({
    message: t('storedToServer'),
    type: NOTIFY_SUCCESS,
  })
}

export default saveGraphVersion
