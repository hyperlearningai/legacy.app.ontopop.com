import { GRAPH_VERSION_STRUCTURE, SUB_CLASS_OF_ID, SUB_CLASS_OF_LABEL } from '../../constants/graph'
import { GRAPH_VERSIONS_LS } from '../../constants/localStorage'

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
  const currentGraphVersions = localStorage.getItem(GRAPH_VERSIONS_LS)

  // add subClassOf to avoid missing links between nodes
  const newObjectProperties = {
    ...objectProperties,
    [SUB_CLASS_OF_ID]: {
      rdfAbout: SUB_CLASS_OF_ID,
      rdfsLabel: SUB_CLASS_OF_LABEL
    }
  }

  // TODO: Replace localstorage with API call when available
  if (currentGraphVersions) {
    setStoreState('graphVersions', JSON.parse(currentGraphVersions))

    if (!currentGraphVersions.original) {
      addToObject('graphVersions', 'original', {
        ...GRAPH_VERSION_STRUCTURE,
        classesFromApi: classes,
        objectPropertiesFromApi: newObjectProperties,
        classesFromApiBackup: classes,
        objectPropertiesFromApiBackup: newObjectProperties,
      })
    }
  } else {
    addToObject('graphVersions', 'original', {
      ...GRAPH_VERSION_STRUCTURE,
      classesFromApi: classes,
      objectPropertiesFromApi: newObjectProperties,
      classesFromApiBackup: classes,
      objectPropertiesFromApiBackup: newObjectProperties,
    })
  }
}

export default loadGraphVersionFromServer
