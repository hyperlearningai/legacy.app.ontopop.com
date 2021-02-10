import store from '../../store'
import {
  SUBCLASSOF_PROPERTY,
  SUB_CLASS_OF_ID
} from '../../constants/graph'
import getEdgeObject from '../serialiseNodesEdges/getEdgeObject'
import addEdge from '../nodesEdgesUtils/addEdge'

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
  const { edge } = getEdgeObject({
    classesFromApi,
    from,
    objectPropertiesFromApi,
    predicate,
    to,
  })

  addEdge(edge)

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
