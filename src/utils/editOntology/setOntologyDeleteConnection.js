import store from '../../store'
import {
  SUBCLASSOF_PROPERTY,
  SUB_CLASS_OF_ID,
  OWL_RESTRICTION
} from '../../constants/graph'
import {
  getEdgeAndNodes
} from '../../constants/functions'

/**
 * ADd ontology edge
 * @param  {Object}         params
 * @param  {Function}       params.setStoreState              setStoreState action
 * @param  {Function}       params.addToObject                Add to object action
 * @param  {Object}         params.selectedElement            Array of edge IDs
 * @return {undefined}
 */
const setOntologyDeleteConnection = ({
  setStoreState,
  selectedElement,
  addToObject
}) => {
  const {
    graphVersions,
    classesFromApi,
    selectedGraphVersion,
    availableEdges,
    deletedConnections,
  } = store.getState()

  const newClassesFromApi = JSON.parse(JSON.stringify(classesFromApi))
  const newGraphVersion = JSON.parse(JSON.stringify(graphVersions[selectedGraphVersion]))
  const newDeletedConnections = deletedConnections.slice()

  // delete connections from graph and remove from graph
  if (selectedElement.length > 0) {
    selectedElement.map((element) => {
      if (!newDeletedConnections.includes(element)) {
        newDeletedConnections.push(element)
      }

      const [predicate, from, to] = getEdgeAndNodes(element)

      const nodeConnections = newClassesFromApi[from][SUBCLASSOF_PROPERTY]
      const initialNodeConnectionsLength = nodeConnections.length

      nodeConnections.reverse().map((connection, index) => {
        if (connection.classRdfAbout === to) {
          const isSubClassOf = predicate === SUB_CLASS_OF_ID
          const isSamePredicate = connection[OWL_RESTRICTION]
            ? predicate === connection[OWL_RESTRICTION].objectPropertyRdfAbout
            : false

          if (isSubClassOf || isSamePredicate) {
            newClassesFromApi[from][SUBCLASSOF_PROPERTY]
              .splice((initialNodeConnectionsLength - 1) - index, 1)

            availableEdges.remove(element)
          }
        }

        return true
      })

      return true
    })
  }

  // add data
  newGraphVersion.classesFromApi = newClassesFromApi
  newGraphVersion.deletedConnections = newDeletedConnections

  addToObject('graphVersions', selectedGraphVersion, newGraphVersion)
  setStoreState('classesFromApi', newClassesFromApi)
  setStoreState('deletedConnections', newDeletedConnections)
}

export default setOntologyDeleteConnection
