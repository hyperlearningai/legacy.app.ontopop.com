// import jsonClasses from '../../assets/json/test-ontology-classes.json'
// import jsonObjectProperties from '../../assets/json/test-ontology-object-properties.json'
import getEdgeProperties from '../getEdgeProperties'
import loadStyling from '../networkStyling/loadStyling'
import getGraphData from '../getGraphData'
import getNodeProperties from '../getNodeProperties'
import setGraphData from '../setGraphData'
import { SUB_CLASS_OF_ID, SUB_CLASS_OF_LABEL } from '../../constants/graph'

/**
 * Graph data loading at startup
 * @param  {Object}     params
 * @param  {Function}   params.t                  Internationalisation function
 * @param  {Function}   params.setStoreState      setStoreState action
 * @return { undefined }
\ */
const startupActions = async ({
  setStoreState,
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

  // TODO: this should be loaded at start once auth in place
  // set all initial graph data

  const newObjectProperties = {
    ...objectProperties,
    [SUB_CLASS_OF_ID]: {
      rdfAbout: SUB_CLASS_OF_ID,
      rdfsLabel: SUB_CLASS_OF_LABEL
    }
  }

  setStoreState('classesFromApi', classes)
  setStoreState('objectPropertiesFromApi', newObjectProperties)
  setStoreState('classesFromApiBackup', classes)
  setStoreState('objectPropertiesFromApiBackup', newObjectProperties)
  // setStoreState('deletedNodes', deletedNodes)
  // setStoreState('addedNodes', addedNodes)
  // setStoreState('updatedNodes', updatedNodes)
  // setStoreState('deletedEdges', deletedEdges)
  // setStoreState('addedEdges', addedEdges)
  // setStoreState('updatedEdges', updatedEdges)
  // setStoreState('addedConnections', addedConnections)
  // setStoreState('deletedConnections', deletedConnections)

  setGraphData({
    setStoreState,
  })
}

export default startupActions
