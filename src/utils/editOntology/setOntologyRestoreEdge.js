import flatten from 'flat'
import store from '../../store'
import addEdge from '../nodesEdgesUtils/addEdge'
import getNode from '../nodesEdgesUtils/getNode'
import getEdgeObject from '../serialiseNodesEdges/getEdgeObject'

/**
 * Restore ontology nodes
 * @param  {Object}         params
 * @param  {String|Array}   params.selectedElement            Selected node(s)/edge(s) IDs
 * @param  {Function}       params.setStoreState              setStoreState action
 * @param  {Function}       params.addToObject                Add to object action
 * @return {undefined}
 */
const setOntologyRestoreEdge = ({
  selectedElement,
  setStoreState,
  addToObject
}) => {
  const {
    graphVersions,
    classesFromApi,
    objectPropertiesFromApi,
    deletedEdges,
    selectedGraphVersion,
  } = store.getState()

  const newClassesFromApi = JSON.parse(JSON.stringify(classesFromApi))
  const newGraphVersion = JSON.parse(JSON.stringify(graphVersions[selectedGraphVersion]))
  const newObjectPropertiesFromApiBackup = JSON.parse(JSON.stringify(newGraphVersion.objectPropertiesFromApiBackup))
  const newObjectPropertiesFromApi = JSON.parse(JSON.stringify(objectPropertiesFromApi))

  // remove selected elements from deleted connection
  const newDeletedEdges = deletedEdges.filter((edge) => !selectedElement.includes(edge))
  setStoreState('deletedEdges', newDeletedEdges)

  if (selectedElement.length > 0) {
    // restore edge from backup to objectPropertiesFromApi
    selectedElement.map((edgeId) => {
      const edgeObjectBackup = newObjectPropertiesFromApiBackup[edgeId]

      newObjectPropertiesFromApi[edgeId] = edgeObjectBackup
      return true
    })
  }

  const flatClassesFromApiBackup = flatten(newGraphVersion.classesFromApiBackup)
  const flatObjectPropertiesKeys = Object.keys(flatClassesFromApiBackup).filter((flatKey) => flatKey.includes('objectPropertyRdfAbout') && selectedElement.includes(
    flatClassesFromApiBackup[flatKey]
  ))

  flatObjectPropertiesKeys.map((flatObjectPropertiesKey) => {
    const [from] = flatObjectPropertiesKey.split('.rdfsSubClassOf.')
    const to = flatClassesFromApiBackup[flatObjectPropertiesKey.replace('objectPropertyRdfAbout', 'classRdfAbout')]
    const predicate = flatClassesFromApiBackup[flatObjectPropertiesKey]

    if (getNode(from) !== null
      && getNode(to) !== null) {
      const { edge } = getEdgeObject({
        classesFromApi,
        from,
        objectPropertiesFromApi: newObjectPropertiesFromApiBackup,
        predicate,
        to,
      })

      addEdge(edge)
    }

    return true
  })

  newGraphVersion.classesFromApi = newClassesFromApi
  newGraphVersion.objectPropertiesFromApi = newObjectPropertiesFromApi
  newGraphVersion.deletedEdges = newDeletedEdges

  addToObject('graphVersions', selectedGraphVersion, newGraphVersion)
  setStoreState('classesFromApi', newClassesFromApi)
  setStoreState('objectPropertiesFromApi', newObjectPropertiesFromApi)
}

export default setOntologyRestoreEdge
