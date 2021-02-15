// import jsonClasses from '../../assets/json/test-ontology-classes.json'
// import jsonObjectProperties from '../../assets/json/test-ontology-object-properties.json'
import loadGraphVersionFromServer from '../versioning/loadGraphVersionFromServer'
import getEdgeProperties from '../getEdgeProperties'
import loadStyling from '../networkStyling/loadStyling'
import getGraphData from '../getGraphData'
import getNodeProperties from '../getNodeProperties'
import setGraphData from '../setGraphData'

/**
 * Export graph version data as json or save to server
 * @param  {Object}     params
 * @param  {Function}   params.addToObject        AddToObject action
 * @param  {Function}   params.t                  Internationalisation function
 * @param  {Function}   params.setStoreState      setStoreState action
 * @return { undefined }
\ */
const startupActions = async ({
  setStoreState,
  addToObject,
  t
}) => {
  // load saved styling options
  loadStyling({
    setStoreState
  })

  // get graph data
  const { classes, objectProperties } = await getGraphData({
    setStoreState,
    t
  })

  // If debugging, comment out getGraphData and set data from local file
  // const classesFromApi = jsonClasses.OwlClasses
  // const objectPropertiesFromApi = jsonObjectProperties.OwlObjectProperties

  // get and set annotation properties
  const annotationProperties = await getNodeProperties({
    setStoreState,
    t
  })

  setStoreState('annotationProperties', annotationProperties)

  // get edges properties for editing ontology connections
  const edgesProperties = await getEdgeProperties({
    setStoreState,
    t
  })

  setStoreState('edgesProperties', edgesProperties)

  // TODO: Should become async when API call instead of localstorage
  loadGraphVersionFromServer({
    setStoreState,
    addToObject,
    classes,
    objectProperties
  })

  setGraphData({
    setStoreState,
  })
}

export default startupActions
