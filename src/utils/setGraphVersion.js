import store from '../store'

/**
 * Set graph full data
 * @param  {Object}   params
 * @param  {String}   params.mode                     Operation mode [new or select]
 * @param  {String}   params.selectedVersion          Name of selected version
 * @param  {String}   params.versionName              Name of new version to add
 * @param  {Function} params.setStoreState            setStoreState action
 * @param  {Function} params.addToObject              Add to object action
 * @return {undefined}
 */
const setGraphVersion = async ({
  mode,
  selectedVersion,
  versionName,
  setStoreState,
  addToObject
}) => {
  const {
    graphVersions
  } = store.getState()

  if (mode === 'search') {
    return setStoreState('selectedGraphVersion', selectedVersion)
  }

  const {
    classesFromApi,
    objectPropertiesFromApi
  } = graphVersions[selectedVersion]

  addToObject('graphVersions', versionName, {
    classesFromApi,
    objectPropertiesFromApi,
    classesFromApiBackup: classesFromApi,
    objectPropertiesFromApiBackup: objectPropertiesFromApi,
    deletedNodes: [],
    addedNodes: [],
    updatedNodes: []
  })
  setStoreState('selectedGraphVersion', versionName)
}

export default setGraphVersion
