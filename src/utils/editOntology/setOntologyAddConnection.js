import store from '../../store'
import {
  SUBCLASSOF_PROPERTY,
  SUB_CLASS_OF_ID
} from '../../constants/graph'
import getEdge from '../serialiseNodesEdges/getEdge'
/**
 * ADd ontology edge
 * @param  {Object}         params
 * @param  {Function}       params.setStoreState              setStoreState action
 * @param  {Function}       params.addToObject                Add to object action
 * @param  {Object}         params.selectedElementProperties  Element properties with from,to,predicate keys
 * @return {undefined}
 */
const setOntologyAddConnection = ({
  setStoreState,
  selectedElementProperties,
  addToObject
}) => {
  const {
    graphVersions,
    classesFromApi,
    objectPropertiesFromApi,
    selectedGraphVersion,
    availableEdges,
    addedConnections,
  } = store.getState()

  const newClassesFromApi = JSON.parse(JSON.stringify(classesFromApi))
  const newGraphVersion = JSON.parse(JSON.stringify(graphVersions[selectedGraphVersion]))

  const {
    from, to, predicate
  } = selectedElementProperties

  // add connection to newClassesFromApi
  if (!newClassesFromApi[from][SUBCLASSOF_PROPERTY]) {
    newClassesFromApi[from][SUBCLASSOF_PROPERTY] = []
  }

  const connectionOwlObject = {
    classRdfAbout: to,
    owlRestriction: null
  }

  if (predicate !== SUB_CLASS_OF_ID) {
    connectionOwlObject.owlRestriction = {
      objectPropertyRdfAbout: predicate,
      classRdfAbout: to
    }
  }

  newClassesFromApi[from][SUBCLASSOF_PROPERTY].push(connectionOwlObject)

  // get edge object from objectPropertiesFromApi and add to graph
  const { edge } = getEdge({
    classesFromApi,
    from,
    objectPropertiesFromApi,
    predicate,
    to,
  })

  availableEdges.add(edge)

  // add data
  const newAddedConnections = [
    ...addedConnections,
    ...[edge.id]
  ]

  newGraphVersion.classesFromApi = newClassesFromApi
  newGraphVersion.addedConnections = newAddedConnections

  addToObject('graphVersions', selectedGraphVersion, newGraphVersion)
  setStoreState('classesFromApi', newClassesFromApi)
  setStoreState('addedConnections', newAddedConnections)
}

export default setOntologyAddConnection
