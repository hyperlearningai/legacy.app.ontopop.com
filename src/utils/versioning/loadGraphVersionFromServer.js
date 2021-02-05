import { GRAPH_VERSION_STRUCTURE } from '../../constants/graph'

// TODO: Replace localstorage with API call when available
const loadGraphVersionFromServer = ({
  setStoreState,
  addToObject,
  classes,
  objectProperties
}) => {
  const currentGraphVersions = localStorage.getItem('graphVersions')

  if (currentGraphVersions) {
    setStoreState('graphVersions', JSON.parse(currentGraphVersions))
  } else {
    addToObject('graphVersions', 'original', {
      ...GRAPH_VERSION_STRUCTURE,
      classesFromApi: classes,
      objectPropertiesFromApi: objectProperties,
      classesFromApiBackup: classes,
      objectPropertiesFromApiBackup: objectProperties,
    })
  }
}

export default loadGraphVersionFromServer
