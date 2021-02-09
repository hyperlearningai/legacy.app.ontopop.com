import flatten from 'flat'
import store from '../../store'
import { SUBCLASSOF_PROPERTY } from '../../constants/graph'
import { generatePredicateId } from '../../constants/functions'

/**
 * Delete ontology nodes
 * @param  {Object}         params
 * @param  {String|Array}   params.selectedElement            Selected node(s)/edge(s) IDs
 * @param  {Function}       params.setStoreState              setStoreState action
 * @param  {Function}       params.addToObject                Add to object action
 * @return {undefined}
 */
const setOntologyDeleteEdge = ({
  selectedElement,
  setStoreState,
  addToObject
}) => {
  const {
    graphVersions,
    objectPropertiesFromApi,
    deletedEdges,
    selectedGraphVersion,
    classesFromApi,
    availableEdges,
  } = store.getState()

  const newClassesFromApi = JSON.parse(JSON.stringify(classesFromApi))
  const newObjectPropertiesFromApi = JSON.parse(JSON.stringify(objectPropertiesFromApi))
  const newGraphVersion = JSON.parse(JSON.stringify(graphVersions[selectedGraphVersion]))
  const newDeletedEdges = deletedEdges.slice()

  if (selectedElement.length > 0) {
    // delete edges from object properties
    selectedElement.map((edgeId) => {
      if (!newDeletedEdges.includes(edgeId)) {
        newDeletedEdges.push(edgeId)
      }

      delete newObjectPropertiesFromApi[edgeId]
      return true
    })

    const flatClassesFromApi = flatten(newClassesFromApi)
    const flatPropertyKeys = Object.keys(flatClassesFromApi).filter((flatKey) => flatKey.includes('objectPropertyRdfAbout'))

    // remove all edges connection in nodes
    flatPropertyKeys.reverse().map((flatPropertyKey) => {
      if (selectedElement.includes(flatClassesFromApi[flatPropertyKey])) {
        const [from, subKeys] = flatPropertyKey.split('.rdfsSubClassOf.')
        const predicate = flatClassesFromApi[flatPropertyKey]
        const to = flatClassesFromApi[flatPropertyKey.replace('objectPropertyRdfAbout', 'classRdfAbout')]

        const predicateArrayIndex = subKeys.split('.owlRestriction')[0]

        // remove from node subclass
        newClassesFromApi[from][SUBCLASSOF_PROPERTY].splice(predicateArrayIndex, 1)

        // remove from graph
        const edgeId = generatePredicateId({
          from, predicate, to
        })

        if (availableEdges.get(edgeId)) {
          availableEdges.remove(edgeId)
        }
      }
      return true
    })
  }

  newGraphVersion.classesFromApi = newClassesFromApi
  newGraphVersion.objectPropertiesFromApi = newObjectPropertiesFromApi
  newGraphVersion.deletedEdges = newDeletedEdges

  addToObject('graphVersions', selectedGraphVersion, newGraphVersion)
  setStoreState('deletedEdges', newDeletedEdges)
  setStoreState('classesFromApi', newClassesFromApi)
  setStoreState('objectPropertiesFromApi', newObjectPropertiesFromApi)
}

export default setOntologyDeleteEdge
