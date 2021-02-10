import store from '../../store'
import {
  SUBCLASSOF_PROPERTY,
  SUB_CLASS_OF_ID
} from '../../constants/graph'
import getEdgeObject from '../serialiseNodesEdges/getEdgeObject'
import { getEdgeAndNodes } from '../../constants/functions'
import addEdge from '../nodesEdgesUtils/addEdge'
/**
 * ADd ontology edge
 * @param  {Object}         params
 * @param  {Function}       params.setStoreState              setStoreState action
 * @param  {Function}       params.addToObject                Add to object action
 * @param  {Object}         params.selectedElementProperties  Element properties with from,to,predicate keys
 * @return {undefined}
 */
const setOntologyRestoreConnection = ({
  setStoreState,
  selectedElement,
  addToObject
}) => {
  const {
    graphVersions,
    classesFromApi,
    objectPropertiesFromApi,
    selectedGraphVersion,
    deletedConnections,
  } = store.getState()

  const newClassesFromApi = JSON.parse(JSON.stringify(classesFromApi))
  const newGraphVersion = JSON.parse(JSON.stringify(graphVersions[selectedGraphVersion]))

  // remove selected elements from deleted connection
  const newDeletedConnections = deletedConnections.filter((connection) => !selectedElement.includes(connection))
  setStoreState('deletedConnections', newDeletedConnections)

  // restore connections from graph
  if (selectedElement.length > 0) {
    selectedElement.map((element) => {
      const [predicate, from, to] = getEdgeAndNodes(element)

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

      return true
    })
  }

  // add data
  newGraphVersion.classesFromApi = newClassesFromApi
  newGraphVersion.deletedConnections = newDeletedConnections

  addToObject('graphVersions', selectedGraphVersion, newGraphVersion)
  setStoreState('classesFromApi', newClassesFromApi)
}

export default setOntologyRestoreConnection
