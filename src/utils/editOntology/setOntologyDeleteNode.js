import flatten from 'flat'
import { generatePredicateId } from '../../constants/functions'
import { SUBCLASSOF_PROPERTY, SUB_CLASS_OF_ID } from '../../constants/graph'
import store from '../../store'
import setElementsStyle from '../networkStyling/setElementsStyle'
import removeEdge from '../nodesEdgesUtils/removeEdge'
import removeNode from '../nodesEdgesUtils/removeNode'

/**
 * Delete ontology nodes
 * @param  {Object}         params
 * @param  {String|Array}   params.selectedElement            Selected node(s)/edge(s) IDs
 * @param  {Function}       params.setStoreState              setStoreState action
 * @param  {Function}       params.addToObject                Add to object action
 * @return {undefined}
 */
const setOntologyDeleteNode = ({
  selectedElement,
  setStoreState,
}) => {
  const {
    classesFromApi,
    deletedNodes,
    nodesConnections,
    triplesPerNode,
    edgesConnections
  } = store.getState()

  const newClassesFromApi = JSON.parse(JSON.stringify(classesFromApi))
  const newNodesConnections = JSON.parse(JSON.stringify(nodesConnections))
  const newTriplesPerNode = JSON.parse(JSON.stringify(triplesPerNode))
  const newEdgesConnections = JSON.parse(JSON.stringify(edgesConnections))
  const newDeletedNodes = deletedNodes.slice()

  if (selectedElement.length > 0) {
    const flatClassesFromApi = flatten(newClassesFromApi)
    const flatClassKeys = Object.keys(flatClassesFromApi).filter((flatKey) => flatKey.includes('classRdfAbout')
      && !flatKey.includes('owlRestriction'))

    // remove all edges connection in nodes
    flatClassKeys.reverse().map((flatClassKey) => {
      if (selectedElement.includes(flatClassesFromApi[flatClassKey])) {
        const [from, subKeys] = flatClassKey.split('.rdfsSubClassOf.')
        const to = flatClassesFromApi[flatClassKey]

        const owlRestriction = flatClassesFromApi[flatClassKey.replace('classRdfAbout', 'owlRestriction')]
        const predicate = owlRestriction ? owlRestriction.objectPropertyRdfAbout : SUB_CLASS_OF_ID

        const predicateArrayIndex = subKeys.split('.classRdfAbout')[0]

        // remove from node subclass
        newClassesFromApi[from][SUBCLASSOF_PROPERTY].splice(predicateArrayIndex, 1)

        // remove from graph
        const edgeId = generatePredicateId({
          from, predicate, to
        })

        removeEdge(edgeId)
      }

      return true
    })

    // on each selected node, first remove connection then remove node
    selectedElement.map((nodeId) => {
      if (!newDeletedNodes.includes(nodeId)) {
        newDeletedNodes.push(nodeId)
      }

      // remove connection with node
      if (newNodesConnections[nodeId]) {
        const connections = newNodesConnections[nodeId]

        connections.map((connection) => {
          const {
            from,
            predicate,
            to
          } = connection

          const isFrom = from === nodeId
          const nodeIdToCheck = isFrom ? to : from

          if (newNodesConnections[nodeIdToCheck]) {
            const updatedConnections = newNodesConnections[nodeIdToCheck].filter((triple) => (isFrom ? triple.from !== nodeId : triple.to !== nodeId))

            newNodesConnections[nodeIdToCheck] = updatedConnections
          }

          if (newTriplesPerNode[nodeIdToCheck]) {
            const updatedConnections = newTriplesPerNode[nodeIdToCheck].filter((triple) => (isFrom ? triple.from !== nodeId : triple.to !== nodeId))

            newTriplesPerNode[nodeIdToCheck] = updatedConnections
          }

          if (newEdgesConnections[predicate]) {
            const updatedConnections = newEdgesConnections[predicate].filter((triple) => (triple.from !== nodeId && triple.to !== nodeId))

            newEdgesConnections[predicate] = updatedConnections
          }

          return true
        })

        delete newNodesConnections[nodeId]
      }

      if (newTriplesPerNode[nodeId]) {
        delete newTriplesPerNode[nodeId]
      }

      if (newClassesFromApi[selectedElement]) {
        const { rdfsSubClassOf } = newClassesFromApi[selectedElement]

        if (rdfsSubClassOf && rdfsSubClassOf.length > 0) {
          rdfsSubClassOf.map((subClassOf) => {
            const to = subClassOf.classRdfAbout
            const { owlRestriction } = subClassOf
            const predicate = owlRestriction ? owlRestriction.objectPropertyRdfAbout : SUB_CLASS_OF_ID

            const connection = {
              from: nodeId,
              predicate,
              to
            }

            // remove from graph
            const edgeId = generatePredicateId({
              connection
            })

            removeEdge(edgeId)

            return true
          })
        }

        removeNode(nodeId)

        delete newClassesFromApi[selectedElement]
      }

      return true
    })
  }

  setStoreState('nodesConnections', newNodesConnections)
  setStoreState('edgesConnections', newEdgesConnections)
  setStoreState('triplesPerNode', newTriplesPerNode)
  setStoreState('deletedNodes', newDeletedNodes)
  setStoreState('classesFromApi', newClassesFromApi)
  setElementsStyle()
}

export default setOntologyDeleteNode
