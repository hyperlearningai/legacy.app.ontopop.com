import flatten from 'flat'
import { generatePredicateId } from '../../constants/functions'
import { SUBCLASSOF_PROPERTY, SUB_CLASS_OF_ID } from '../../constants/graph'
import store from '../../store'
import getEdge from '../serialiseNodesEdges/getEdge'

/**
 * Restore ontology nodes
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
    objectPropertiesFromApi,
    selectedGraphVersion,
    availableNodes,
    availableEdges
  } = store.getState()

  const newClassesFromApi = JSON.parse(JSON.stringify(classesFromApi))
  const newGraphVersion = JSON.parse(JSON.stringify(graphVersions[selectedGraphVersion]))
  const newClassesFromApiBackup = JSON.parse(JSON.stringify(newGraphVersion.classesFromApiBackup))

  // Remove nodes from deletedNodes
  const newDeletedNodes = deletedNodes.slice().filter((nodeId) => !selectedElement.includes(nodeId))

  if (selectedElement.length > 0) {
    // add node and related connections back
    selectedElement.map((nodeId) => {
      const nodeObject = newClassesFromApiBackup[nodeId]
      nodeObject.id = nodeId
      nodeObject.label = nodeObject.rdfsLabel

      if (availableNodes.get(nodeId) === null) {
        availableNodes.add(nodeObject)
      }

      const { rdfsSubClassOf } = nodeObject

      if (rdfsSubClassOf && rdfsSubClassOf.length > 0) {
        rdfsSubClassOf.map((subClassOf) => {
          const to = subClassOf.classRdfAbout

          if (!newDeletedNodes.includes(to)) {
            if (availableNodes.get(to) === null) {
              const toObject = newClassesFromApiBackup[to]
              toObject.id = to
              toObject.label = toObject.rdfsLabel

              availableNodes.add(toObject)
            }

            const { owlRestriction } = subClassOf
            const predicate = owlRestriction ? owlRestriction.objectPropertyRdfAbout : SUB_CLASS_OF_ID

            // add to graph
            const edgeId = generatePredicateId({
              from: nodeId, predicate, to
            })

            if (availableEdges.get(edgeId) === null) {
              const { edge } = getEdge({
                classesFromApi,
                from: nodeId,
                objectPropertiesFromApi,
                predicate,
                to,
              })

              availableEdges.add(edge)
            }
          }

          return true
        })
      }

      return true
    })

    // add related connections back
    const flatClassesFromApi = flatten(newClassesFromApiBackup)
    const flatClassKeys = Object.keys(flatClassesFromApi).filter((flatKey) => flatKey.includes('classRdfAbout')
      && !flatKey.includes('owlRestriction') && selectedElement.includes(
      flatClassesFromApi[flatKey]
    ))

    // remove all edges connection in nodes
    flatClassKeys.reverse().map((flatClassKey) => {
      if (selectedElement.includes(flatClassesFromApi[flatClassKey])) {
        const [from] = flatClassKey.split('.rdfsSubClassOf.')
        const to = flatClassesFromApi[flatClassKey]

        if (availableNodes.get(from)) {
          const owlRestriction = flatClassesFromApi[flatClassKey.replace('classRdfAbout', 'owlRestriction')]
          const predicate = owlRestriction ? owlRestriction.objectPropertyRdfAbout : SUB_CLASS_OF_ID

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

          // remove from node subclass
          newClassesFromApi[from][SUBCLASSOF_PROPERTY].push(connectionOwlObject)

          // add to graph
          const edgeId = generatePredicateId({
            from, predicate, to
          })

          if (availableEdges.get(edgeId) === null) {
            const { edge } = getEdge({
              classesFromApi,
              from,
              objectPropertiesFromApi,
              predicate,
              to,
            })

            availableEdges.add(edge)
          }
        }
      }
      return true
    })
  }

  newGraphVersion.classesFromApi = newClassesFromApi
  newGraphVersion.deletedNodes = newDeletedNodes

  addToObject('graphVersions', selectedGraphVersion, newGraphVersion)
  setStoreState('classesFromApi', newClassesFromApi)
  setStoreState('deletedNodes', newDeletedNodes)
}

export default setOntologyRestoreNode
