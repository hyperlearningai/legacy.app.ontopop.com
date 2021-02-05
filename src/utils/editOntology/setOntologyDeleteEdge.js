import flatten from 'flat'
import store from '../../store'

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
    currentGraph
  } = store.getState()

  const newClassesFromApi = JSON.parse(JSON.stringify(classesFromApi))
  const newObjectPropertiesFromApi = JSON.parse(JSON.stringify(objectPropertiesFromApi))
  const newGraphVersion = JSON.parse(JSON.stringify(graphVersions[selectedGraphVersion]))

  // add deleted nodes to graph version and remove nodes from classes object
  if (selectedElement.length > 0) {
    newGraphVersion.deletedEdges = [
      ...newGraphVersion.deletedEdges,
      ...selectedElement
    ]

    selectedElement.map((element) => {
      delete newObjectPropertiesFromApi[element]

      return true
    })
  }

  const flatClassesFromApi = flatten(newClassesFromApi)

  // removes connections with deleted nodes
  for (let index = 0; index < Object.keys(flatClassesFromApi).length; index++) {
    const flatKey = Object.keys(flatClassesFromApi)[index]

    if (selectedElement.includes(flatClassesFromApi[flatKey])) {
      const [elementId, subKey] = flatKey.split('.rdfsSubClassOf')
      const { rdfsSubClassOf } = newClassesFromApi[elementId]

      const subClassIndex = subKey.split('.')[1]

      rdfsSubClassOf.splice(subClassIndex, 1)

      newClassesFromApi[elementId].rdfsSubClassOf = rdfsSubClassOf
    }
  }

  const newDeletedEdges = [
    ...deletedEdges,
    ...selectedElement
  ]

  newGraphVersion.classesFromApi = newClassesFromApi
  newGraphVersion.objectPropertiesFromApi = newObjectPropertiesFromApi
  newGraphVersion.deletedEdges = newDeletedEdges

  addToObject('graphVersions', selectedGraphVersion, newGraphVersion)
  setStoreState('deletedEdges', newDeletedEdges)

  if (currentGraph !== 'graph-0') {
    return setStoreState('currentGraph', 'graph-0')
  }

  return setStoreState('isOntologyUpdated', true)
}

export default setOntologyDeleteEdge
