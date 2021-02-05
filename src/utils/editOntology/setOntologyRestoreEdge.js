import flatten from 'flat'
import store from '../../store'

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
    deletedNodes,
    deletedEdges,
    selectedGraphVersion,
    currentGraph
  } = store.getState()

  const newClassesFromApi = JSON.parse(JSON.stringify(classesFromApi))
  const newGraphVersion = JSON.parse(JSON.stringify(graphVersions[selectedGraphVersion]))
  const newObjectPropertiesFromApiBackup = JSON.parse(JSON.stringify(newGraphVersion.objectPropertiesFromApiBackup))
  const newObjectPropertiesFromApi = JSON.parse(JSON.stringify(objectPropertiesFromApi))

  // restore edge from backup to objectPropertiesFromApi
  for (let index = 0; index < selectedElement.length; index++) {
    const edgeId = selectedElement[index]

    const edgeObjectBackup = newObjectPropertiesFromApiBackup[edgeId]

    newObjectPropertiesFromApi[edgeId] = edgeObjectBackup
  }

  const flatClassesFromApiBackup = flatten(newGraphVersion.classesFromApiBackup)

  // Remove nodes from deletedNodes
  const newDeletedEdges = deletedEdges.slice().filter((edgeId) => !selectedElement.includes(edgeId))

  // restore connections with deleted edges
  for (let index = 0; index < Object.keys(flatClassesFromApiBackup).length; index++) {
    const flatKey = Object.keys(flatClassesFromApiBackup)[index]
    if (selectedElement.includes(flatClassesFromApiBackup[flatKey])
    && flatKey.includes('rdfsSubClassOf')) {
      const [elementId] = flatKey.split('.rdfsSubClassOf')
      const { rdfsSubClassOf } = newGraphVersion.classesFromApiBackup[elementId]

      if (rdfsSubClassOf && rdfsSubClassOf.length > 0) {
        const newRdfsSubClassOf = rdfsSubClassOf.filter((nodeConnection) => {
          const isInDeletedNodes = deletedNodes.includes(nodeConnection.classRdfAbout)
          if (!rdfsSubClassOf.owlRestriction) return !isInDeletedNodes

          const isInDeletedEdges = newDeletedEdges.includes(nodeConnection.owlRestriction.objectPropertyRdfAbout)

          return !isInDeletedNodes && !isInDeletedEdges
        })

        if (newClassesFromApi[elementId]) {
          newClassesFromApi[elementId].rdfsSubClassOf = newRdfsSubClassOf
        }
      }
    }
  }

  newGraphVersion.classesFromApi = newClassesFromApi
  newGraphVersion.deletedEdges = newDeletedEdges

  addToObject('graphVersions', selectedGraphVersion, newGraphVersion)
  setStoreState('deletedEdges', newDeletedEdges)

  if (currentGraph !== 'graph-0') {
    return setStoreState('currentGraph', 'graph-0')
  }

  return setStoreState('isOntologyUpdated', true)
}

export default setOntologyRestoreEdge
