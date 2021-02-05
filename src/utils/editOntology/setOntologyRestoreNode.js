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
const setOntologyRestoreNode = ({
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
  const newClassesFromApiBackup = JSON.parse(JSON.stringify(newGraphVersion.classesFromApiBackup))

  // Remove nodes from deletedNodes
  const newDeletedNodes = deletedNodes.slice().filter((nodeId) => !selectedElement.includes(nodeId))

  // restore node from backup to classesFromApi
  for (let index = 0; index < selectedElement.length; index++) {
    const nodeId = selectedElement[index]

    const nodeObjectBackup = newClassesFromApiBackup[nodeId]

    // add only connections with existing nodes
    const { rdfsSubClassOf } = nodeObjectBackup

    const newRdfsSubClassOf = rdfsSubClassOf ? rdfsSubClassOf.filter((subClassOf) => !newDeletedNodes.includes(subClassOf.classRdfAbout)) : []

    nodeObjectBackup.rdfsSubClassOf = newRdfsSubClassOf

    newClassesFromApi[nodeId] = nodeObjectBackup
  }

  const flatClassesFromApiBackup = flatten(newClassesFromApiBackup)

  // restore connections with deleted nodes
  for (let index = 0; index < Object.keys(flatClassesFromApiBackup).length; index++) {
    const flatKey = Object.keys(flatClassesFromApiBackup)[index]
    if (selectedElement.includes(flatClassesFromApiBackup[flatKey])
    && flatKey.includes('rdfsSubClassOf')
    && !flatKey.includes('owlRestriction')) {
      const [elementId] = flatKey.split('.rdfsSubClassOf')
      const { rdfsSubClassOf } = newClassesFromApiBackup[elementId]

      if (rdfsSubClassOf && rdfsSubClassOf.length > 0) {
        const newRdfsSubClassOf = rdfsSubClassOf.filter((nodeConnection) => !newDeletedNodes.includes(nodeConnection.classRdfAbout))

        if (newClassesFromApi[elementId]) {
          newClassesFromApi[elementId].rdfsSubClassOf = newRdfsSubClassOf
        }
      }
    }
  }

  newGraphVersion.classesFromApi = newClassesFromApi
  newGraphVersion.deletedNodes = newDeletedNodes

  addToObject('graphVersions', selectedGraphVersion, newGraphVersion)
  setStoreState('deletedNodes', newDeletedNodes)

  if (currentGraph !== 'graph-0') {
    return setStoreState('currentGraph', 'graph-0')
  }

  return setStoreState('isOntologyUpdated', true)
}

export default setOntologyRestoreNode
