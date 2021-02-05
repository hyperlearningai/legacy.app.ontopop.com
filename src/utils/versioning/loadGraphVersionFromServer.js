import { GRAPH_VERSION_STRUCTURE } from '../../constants/graph'

/**
 * Export graph version data as json or save to server
 * @param  {Object}     params
 * @param  {Function}   params.addToObject        AddToObject action
 * @param  {Object}     params.classes            Ontology classes
 * @param  {Function}   params.setStoreState      setStoreState action
 * @param  {Object}     params.objectProperties   Ontology object properties
 * @return { undefined }
\ */
const loadGraphVersionFromServer = ({
  setStoreState,
  addToObject,
  classes,
  objectProperties
}) => {
  const currentGraphVersions = localStorage.getItem('graphVersions')

  // TODO: Replace localstorage with API call when available
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
