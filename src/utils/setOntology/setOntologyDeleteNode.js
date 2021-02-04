import flatten from 'flat'
import store from '../../store'

/**
 * Set graph full data
 * @param  {Object}         params
 * @param  {String|Array}   params.selectedElement            Selected node(s)/edge(s) IDs
 * @param  {Function}       params.setStoreState              setStoreState action
 * @param  {Function}       params.addToObject                Add to object action
 * @return {undefined}
 */
const setOntologyDeleteNode = ({
  selectedElement,
  setStoreState,
  addToObject
}) => {
  const {
    graphVersions,
    classesFromApi,
    deletedNodes,
    selectedGraphVersion,
    currentGraph
  } = store.getState()

  const newClassesFromApi = JSON.parse(JSON.stringify(classesFromApi))
  const newGraphVersion = JSON.parse(JSON.stringify(graphVersions[selectedGraphVersion]))

  // add deleted nodes to graph version and remove nodes from classes object
  if (selectedElement.length > 0) {
    newGraphVersion.deletedNodes = [
      ...newGraphVersion.deletedNodes,
      ...selectedElement
    ]

    selectedElement.map((element) => {
      delete newClassesFromApi[element]

      return true
    })
  }

  const flatClassesFromApi = flatten(newClassesFromApi)

  // removes connections with deleted nodes
  for (let index = 0; index < Object.keys(flatClassesFromApi).length; index++) {
    const flatKey = Object.keys(flatClassesFromApi)[index]

    if (selectedElement.includes(flatClassesFromApi[flatKey]) && !flatKey.includes('owlRestriction')) {
      const [elementId, subKey] = flatKey.split('.rdfsSubClassOf')
      const { rdfsSubClassOf } = newClassesFromApi[elementId]

      if (rdfsSubClassOf.length === 1) {
        delete newClassesFromApi[elementId].rdfsSubClassOf
      } else {
        const subClassIndex = subKey.split('.')[1]

        rdfsSubClassOf.splice(subClassIndex, 1)

        newClassesFromApi[elementId].rdfsSubClassOf = rdfsSubClassOf
      }

      delete flatClassesFromApi[flatKey.replace('.owlRestriction.classRdfAbout', '').replace('.classRdfAbout', '')]
    }
  }

  const newDeletedNodes = [
    ...deletedNodes,
    ...selectedElement
  ]

  newGraphVersion.classesFromApi = newClassesFromApi
  newGraphVersion.deletedNodes = newDeletedNodes

  addToObject('graphVersions', selectedGraphVersion, newGraphVersion)
  setStoreState('deletedNodes', newDeletedNodes)

  if (currentGraph !== 'graph-0') {
    return setStoreState('currentGraph', 'graph-0')
  }

  return setStoreState('isOntologyUpdated', true)
}

export default setOntologyDeleteNode
